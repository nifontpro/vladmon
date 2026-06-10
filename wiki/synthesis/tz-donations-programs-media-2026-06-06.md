---
type: synthesis
title: ТЗ — пожертвования, целевые программы и медиа-пайплайн (HD-изображения)
aliases: [ТЗ пожертвования, ТЗ целевые программы, ТЗ загрузка фото, donations spec, media pipeline spec]
tags: [synthesis, spec, tz, donations, programs, media, images, roadmap]
created: 2026-06-06
updated: 2026-06-06
source_count: 1
based_on: [[synthesis/digital-product-market-research-2026-06-06]]
---

> **Что это.** Полное техническое задание + пошаговый план реализации трёх связанных модулей сайта Большевьясского монастыря: **«Пожертвования»**, **«Целевые программы»** (с прогресс-баром и фотоотчётами — кейс «Котельная») и **«Медиа-пайплайн»** (загрузка, обработка, хранение и отдача HD-изображений). Опирается на выводы [[synthesis/digital-product-market-research-2026-06-06]] и реальную структуру кода ([[synthesis/project-snapshot-2026-05-14]]). Существующий стек: Vite 8 + React 19 + TS 6 + Tailwind v4 + React Router 7 + Zustand + TanStack Query + RHF/Zod. Бэкенд — Kotlin (как зафиксировано в `CLAUDE.md`).

---

# Часть 0. Архитектурные решения (что выбираем и почему)

Решения приняты как архитектор на основе исследования рынка. Помечено, где нужно подтверждение/реквизиты от настоятеля.

| Область | Решение | Обоснование | Нужно от заказчика |
|---|---|---|---|
| Платёжный шлюз (разовые) | **ЮKassa** (СБП + карты + SberPay) | 54-ФЗ-чеки из коробки, СБП дёшево, виджет встраивается в React | Договор ЮKassa на расчётный счёт религиозной организации |
| Рекуррентные платежи | **CloudPayments** (категория «Благотворительность», без лимита 3 попытки) ИЛИ автоплатежи ЮKassa | Лучший рекуррент-движок (см. исследование) | Решение: 1 провайдер или 2 |
| Объектное хранилище | **Yandex Object Storage** (S3-совместимое) | РФ-юрисдикция, S3 API, есть CDN | Аккаунт Yandex Cloud |
| Обработка изображений | **imgproxy** (on-the-fly ресайз + AVIF/WebP), за Yandex Cloud CDN | Не храним десятки вариантов, srcset «бесплатно», добавление брейкпоинтов без переобработки | — |
| Загрузка крупных файлов | **Presigned PUT прямо в S3** (+ multipart/tus для очень больших) | HD-фото 5–50 МБ не грузим через бэкенд, разгружаем Kotlin | — |
| Бэкенд | **Kotlin** (Ktor или Spring Boot) | Зафиксировано в `CLAUDE.md`; здесь только контракт API | Выбор фреймворка |
| Платёж = | **«Добровольное пожертвование на уставные цели»** | Нет ККТ по 54-ФЗ, льгота ст.251 НК — см. правовой чек-лист исследования | Оферта + политика ПДн |
| Подача записок/донатов | **Анонимно по умолчанию**, email опционально | 152-ФЗ: имена в записках — спец. категория ПДн | Юрист подтверждает оферту |

**Принцип медиа:** оригинал HD кладём в приватный бакет (архив, неизменяемый), на сайт отдаём оптимизированные деривативы через imgproxy+CDN. Ключи — контентно-адресуемые (по sha256) → дедупликация и идемпотентность.

---

# Часть 1. Модель данных

## 1.1. Frontend-типы (entities)

Новые сущности в `src/entities/`. Стиль — как в существующих `note/types.ts`, `service/types.ts`.

```ts
// src/entities/media/types.ts
export type MediaRef = {
  id: string;
  key: string;          // ключ в S3: original/<sha256>.<ext>
  width: number;        // натуральные размеры оригинала
  height: number;
  blurhash: string;     // LQIP-заглушка (плавная загрузка HD)
  alt: string;
  status: 'processing' | 'ready' | 'failed';
};
```

```ts
// src/entities/program/types.ts
export type ProgramStatus = 'active' | 'completed' | 'paused';

export type ProgramUpdate = {
  id: string;
  date: string;         // ISO
  title: string;
  body: string;
  photos: MediaRef[];   // фотоотчёт
};

export type Program = {
  id: string;
  slug: string;             // 'kotelnaya'
  title: string;            // 'Новая котельная для обители'
  summary: string;          // 1–2 предложения для карточки
  description: string;      // markdown/rich — зачем, что даёт
  goalKopecks: number;      // цель сбора, в копейках
  raisedKopecks: number;    // собрано
  status: ProgramStatus;
  cover: MediaRef;          // обложка
  gallery: MediaRef[];      // фотогалерея «как есть сейчас»
  updates: ProgramUpdate[]; // лента фотоотчётов
  startedAt: string;
  completedAt?: string;
};
```

```ts
// src/entities/donation/types.ts
export type DonationPurpose = 'general' | 'program';
export type DonationPeriod = 'once' | 'month';

export type Donation = {
  id: string;
  amountKopecks: number;
  purpose: DonationPurpose;
  programId?: string;       // если purpose === 'program'
  period: DonationPeriod;   // 'month' = рекуррент
  coverFee: boolean;        // донор покрывает комиссию
  donorName?: string;
  donorEmail?: string;
  message?: string;
  status: 'pending' | 'succeeded' | 'canceled';
  createdAt: string;
};
```

Записку (`note/types.ts`) расширяем под оплату: добавляем `amountKopecks`, `status`, `programId?` (можно жертвовать «на требу»), но это после боевого подключения формы (см. Часть 6).

## 1.2. Backend-модель (Kotlin / БД)

Таблицы (PostgreSQL):

- `media` — `id, key, width, height, blurhash, alt, status, created_at`. Уникальный индекс по `key` (контентный sha256 → дедуп).
- `programs` — `id, slug (unique), title, summary, description, goal_kopecks, raised_kopecks, status, cover_media_id, started_at, completed_at`.
- `program_gallery` — `program_id, media_id, sort_order` (M:N).
- `program_updates` — `id, program_id, date, title, body`.
- `program_update_photos` — `update_id, media_id, sort_order`.
- `donations` — `id, amount_kopecks, purpose, program_id, period, cover_fee, donor_name, donor_email, message, status, payment_id (ЮKassa), created_at`.
- `recurring_subscriptions` — `id, donation_template_json, provider, provider_subscription_id, status, next_charge_at`.

**Важно:** `raised_kopecks` обновляется **только** по факту вебхука об успешной оплате (не на создании доната) — иначе прогресс-бар врёт.

---

# Часть 2. API-контракт (REST)

Базовый префикс `/api` (уже в `client.ts:43`, `VITE_API_BASE_URL`). Публичные `GET` — без токена; админские — под JWT с ролью `admin`.

**Публичные:**
```
GET  /api/programs                 → Program[] (status=active по умолчанию)
GET  /api/programs/:slug           → Program (с updates и gallery)
POST /api/donations                → { donationId, confirmationToken }   // создаёт платёж в ЮKassa
GET  /api/donations/:id            → { status }                          // поллинг статуса
POST /api/notes                    → { noteId, confirmationToken }       // боевая отправка записки (Часть 6)
```

**Вебхуки:**
```
POST /api/webhooks/yookassa        → подтверждение оплаты (idempotent, проверка подписи/IP)
```

**Админские (роль admin, JWT):**
```
POST  /api/admin/media/presign     → { uploadUrl, key, mediaId }   // presigned PUT в S3
POST  /api/admin/media/:id/commit  → MediaRef                       // после загрузки: метаданные, blurhash, status=ready
POST  /api/admin/programs          → Program
PATCH /api/admin/programs/:id      → Program
POST  /api/admin/programs/:id/updates → ProgramUpdate               // публикация фотоотчёта
```

**Поток создания пожертвования (ЮKassa, embedded-виджет):**
1. Frontend `POST /api/donations` с суммой/целью → бэкенд создаёт платёж в ЮKassa (`save_payment_method=true` для рекуррента), возвращает `confirmationToken`.
2. Frontend открывает виджет ЮKassa (`@yookassa/checkout-widget`) по токену → пользователь платит (СБП/карта).
3. ЮKassa шлёт `POST /api/webhooks/yookassa` → бэкенд проверяет, ставит `donation.status=succeeded`, **атомарно** `program.raised_kopecks += amount`, шлёт email-квитанцию.
4. Frontend после виджета поллит `GET /api/donations/:id` → показывает «Спасибо».

---

# Часть 3. Модуль «Целевые программы» (кейс «Котельная»)

Это ключевая просьба заказчика. Конверсионная связка из исследования: **история объекта → эмоция → целевой сбор с прогресс-баром и фотоотчётом**.

## 3.1. Страницы и роуты

Добавляем в `src/app/router.tsx` (паттерн lazy-роутов уже есть):
```
/programs              → ProgramsListPage   (список активных сборов)
/programs/:slug        → ProgramPage        (страница одной программы)
/donate                → DonatePage         (общее пожертвование + выбор программы)
```
И пункт в `NAV_ITEMS` (`src/shared/config/routes.ts`): «Помощь обители».

## 3.2. Страница программы `/programs/kotelnaya` — структура экрана

1. **Hero**: обложка (HD через `<ResponsiveImage>`), заголовок «Новая котельная для обители», краткий тезис.
2. **Прогресс-бар**: `raisedKopecks / goalKopecks`, проценты, «собрано X ₽ из Y ₽», число жертвователей. Кнопка **«Помочь»** (открывает виджет с предзаполненной `programId`).
3. **Зачем это нужно** (`description`): человеческая история — почему котельная, что без неё, что даст. Это «топливо для пожертвований».
4. **Как сейчас** (`gallery`): фото текущего состояния.
5. **Фотоотчёты** (`updates`, лента сверху вниз): каждый — дата, заголовок, текст, фото. Показывает прозрачность → доверие → повторные пожертвования. Прямой ответ на «делаем котельную и фотоотчёт».
6. **Пресет-суммы** (300 / 500 / 1000 / 3000 ₽ + своё) с тумблером «ежемесячно» и чекбоксом «добавить комиссию, чтобы обитель получила всю сумму» (cover-fee, не по умолчанию).
7. **Шаринг** (кнопка «поделиться сбором»).

## 3.3. Компонент прогресс-бара (референс)

```tsx
// src/widgets/program-progress/program-progress.tsx
export function ProgramProgress({ program }: { program: Program }) {
  const pct = Math.min(100, Math.round((program.raisedKopecks / program.goalKopecks) * 100));
  return (
    <div>
      <div className="cerk-progress-track" aria-hidden>
        <div className="cerk-progress-fill" style={{ width: `${pct}%` }} />
      </div>
      <p>
        Собрано <strong>{rub(program.raisedKopecks)}</strong> из {rub(program.goalKopecks)} ({pct}%)
      </p>
    </div>
  );
}
// rub() — хелпер форматирования копеек → "12 500 ₽" в src/shared/lib/money
```
Стили `.cerk-progress-*` — в `src/shared/styles/components.css`, цвета через токены `--cerk-*` (сусаль/изумруд для заполнения).

## 3.4. Фотоотчёт = ProgramUpdate

Публикуется из админки (Часть 7): дата + заголовок + текст + N фото. На странице рендерится лентой; фото — через `<ResponsiveImage>` с lightbox по клику (виджет `gallery` уже есть, расширяем).

---

# Часть 4. Модуль «Пожертвования»

## 4.1. Форма (паттерн как `notes-form`)

`src/features/donation-form/` (RHF + Zod, как существующая `notes-form/lib/schema.ts`):

```ts
// src/features/donation-form/lib/schema.ts
export const donationSchema = z.object({
  amountRub: z.number().int().min(10).max(1_000_000),
  purpose: z.enum(['general', 'program']),
  programId: z.string().optional(),
  period: z.enum(['once', 'month']),
  coverFee: z.boolean().default(false),
  donorName: z.string().max(80).optional(),
  donorEmail: z.string().email().optional().or(z.literal('')),
  message: z.string().max(280).optional(),
});
```

## 4.2. Оплата (TanStack Query mutation)

```ts
// src/features/donation-form/lib/use-create-donation.ts
export function useCreateDonation() {
  return useMutation({
    mutationFn: (dto: DonationDto) =>
      apiRequest<{ donationId: string; confirmationToken: string }>('/donations', {
        method: 'POST', body: dto,
      }),
  });
}
```
После успеха — открыть виджет ЮKassa с `confirmationToken`, по завершении поллить статус.

## 4.3. Рекуррент

`period: 'month'` → бэкенд при создании платежа ставит `save_payment_method=true`, сохраняет `payment_method_id`, создаёт `recurring_subscription`, далее списывает по расписанию. Напоминания об истекших картах + ретраи (см. исследование — involuntary churn ~13%/год).

## 4.4. Доверие (из исследования)

На странице донатов: статус «официальный сайт обители», реквизиты (`MONASTERY.bank` в `meta.ts` — заполнить), блок «на что идут пожертвования», ссылки на активные программы с прогрессом.

---

# Часть 5. Медиа-пайплайн: загрузка HD-изображений (детально)

Это вторая ключевая просьба. Цель: **загружать фото высокого разрешения, хранить оригинал, отдавать оптимизированное, держать всё синхронным.**

## 5.1. Общая схема потока

```
[Админ/фотограф] --(1 presign)--> [Kotlin API] --> выдаёт presigned PUT
       |
       |--(2 PUT оригинал HD)--> [S3 приватный бакет: original/<sha256>.<ext>]
       |
       |--(3 commit)--> [Kotlin API]: читает размеры, генерит blurhash, status=ready
                                   |
[Браузер сайта] <--(4 srcset)-- [Yandex CDN] <--(on-the-fly)-- [imgproxy] <-- [S3 оригинал]
```

**Почему так:**
- Оригинал HD грузится **напрямую в S3** (presigned PUT) — не через бэкенд, не упираемся в лимиты Kotlin/таймауты на 30-мегабайтных фото.
- Оригинал **неизменяем** (контентный ключ по sha256) → повторная загрузка того же файла не плодит дубли (идемпотентность = «синхронизация» без рассинхрона).
- Деривативы (размеры/форматы) **не храним** — imgproxy режет на лету, CDN кэширует. Новый брейкпоинт → не нужно переобрабатывать архив.

## 5.2. Хранилище (Yandex Object Storage)

- Бакет `monastery-media` (приватный). Структура ключей: `original/<sha256>.<ext>`.
- Доступ imgproxy к бакету — по сервисному аккаунту (IAM), не публично.
- Lifecycle-правило: версионирование вкл. (защита от случайной перезаписи).

## 5.3. Загрузка (3 шага)

**Шаг 1 — presign.** Frontend считает sha256 файла (Web Crypto `crypto.subtle.digest`), шлёт `POST /api/admin/media/presign {sha256, ext, contentType, size}`. Бэкенд:
- проверяет роль admin, лимиты (тип image/jpeg|png|webp|heic, размер ≤ 60 МБ);
- если `media` с таким ключом уже есть и `ready` → возвращает существующий `mediaId` (дедуп, загрузка не нужна);
- иначе создаёт запись `status=processing`, возвращает presigned PUT-URL + key + mediaId.

**Шаг 2 — upload.** Frontend `PUT` файла по presigned URL прямо в S3. Прогресс — через `XMLHttpRequest.upload.onprogress` (fetch не даёт upload-progress).

**Шаг 3 — commit.** Frontend `POST /api/admin/media/:id/commit`. Бэкенд:
- скачивает оригинал (или читает stream), определяет `width/height` (metadata-extractor / imageio), генерит `blurhash` (библиотека blurhash-kotlin), **стрипает EXIF/гео и применяет ориентацию** при отдаче (imgproxy `strip_metadata` + auto-rotate);
- ставит `status=ready`, сохраняет размеры и blurhash.

## 5.4. Очень большие файлы / нестабильная сеть

Для архивных сканов и фото 50+ МБ или плохого мобильного интернета — **S3 multipart upload** (presigned-парты) или протокол **tus** (`tus-js-client` + `tusd`/совместимый эндпоинт) с возобновлением. Для типичных телефонных фото (5–30 МБ) хватает обычного presigned PUT.

## 5.5. Отдача (imgproxy + CDN + srcset)

URL imgproxy (подписанный HMAC, чтобы нельзя было перебирать произвольные трансформации):
```
https://cdn.monastery.ru/<signature>/rs:fit:800:0/f:avif/q:75/plain/s3://monastery-media/original/<sha256>.jpg
```
Параметры: `rs:fit:<w>:0` (ресайз по ширине), `f:avif|webp` (формат), `q` (качество). Подпись считает бэкенд/edge.

**Frontend-компонент `<ResponsiveImage>`** (единая точка для всех HD-картинок):

```tsx
// src/shared/ui/responsive-image.tsx
const WIDTHS = [400, 640, 800, 1200, 1600, 2000];

function buildSrcSet(media: MediaRef, fmt: 'avif' | 'webp' | 'jpg') {
  return WIDTHS
    .filter((w) => w <= media.width)            // не апскейлим
    .map((w) => `${imgUrl(media.key, { w, fmt })} ${w}w`)
    .join(', ');
}

export function ResponsiveImage({ media, sizes, priority, className }: {
  media: MediaRef; sizes: string; priority?: boolean; className?: string;
}) {
  return (
    <picture>
      <source type="image/avif" srcSet={buildSrcSet(media, 'avif')} sizes={sizes} />
      <source type="image/webp" srcSet={buildSrcSet(media, 'webp')} sizes={sizes} />
      <img
        src={imgUrl(media.key, { w: 800, fmt: 'jpg' })}
        srcSet={buildSrcSet(media, 'jpg')}
        sizes={sizes}
        width={media.width}
        height={media.height}
        alt={media.alt}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        className={className}
        style={{ backgroundImage: `url(${blurhashToDataUri(media.blurhash)})`, backgroundSize: 'cover' }}
      />
    </picture>
  );
}
```
- `sizes` задаёт вызывающий («(max-width: 768px) 100vw, 800px» для hero, узкий — для галереи).
- `width/height` из метаданных → нет layout shift (CLS).
- `blurhash` → размытая заглушка проявляется в HD плавно.
- AVIF→WebP→JPEG каскад: браузер берёт лучший поддерживаемый.

Заменяем «сырые» `<img src="/photos/...">` (сейчас в `gallery.tsx:37-49`, `icon-page.tsx:17`, `meta.ts` `MONASTERY_TIMELINE.photo`) на `<ResponsiveImage>`. Исторические фото из `public/photos/` можно либо оставить статикой (они уже маленькие), либо тоже завести в пайплайн (загрузить оригиналы в S3) — рекомендую завести, чтобы всё было единообразно.

## 5.6. «Синхронизация» — три уровня

1. **Идемпотентность загрузки** (главное): контентный ключ по sha256 → один и тот же файл = один объект, повторная отправка не плодит дублей и не требует ручной чистки. Это и есть «синхронизация» без рассинхронизации.
2. **Кэш CDN**: URL зависят от трансформации и (через ключ) от содержимого → **иммутабельны**, инвалидация не нужна. Заменили фото — это новый объект с новым ключом, старый URL остаётся валидным до удаления записи.
3. **Массовый импорт архива** (сотни старых HD-сканов): не через браузер, а утилитой **rclone** — `rclone sync ./local-hd-photos ya:monastery-media/original` синхронизирует локальную папку фотографа с бакетом (по контрольным суммам, только изменённое). Затем разовый Kotlin-джоб «просканировать бакет → создать недостающие записи `media` (размеры+blurhash)». Так фотограф просто кладёт файлы в папку, а `rclone sync` поддерживает зеркало.

## 5.7. Фоновая обработка

`commit` ставит задачу в очередь (если blurhash/метаданные считать долго на больших файлах) — статус `processing` → `ready`. Frontend в админке показывает спиннер, на публичной странице фото появляется только при `status=ready`.

---

# Часть 6. Модуль «Записки» (доведение до боевого режима)

Сейчас `notes-form` валиден локально, submit отключён (`awaitingBackend=true`, `notes-form.tsx:37`). Доводим:
1. `POST /api/notes` (контракт как у донатов: создаёт платёж-пожертвование за требу).
2. Снять `awaitingBackend`, подключить mutation + виджет ЮKassa.
3. Email-уведомление «записка принята/передана для поминовения».
4. UX-доработки из исследования: подсказка «в родительном падеже», лимит имён (сейчас max 20 в схеме — снизить до 10–12 по канону), маркеры (младенец/болящий/воин), гостевой режим (уже анонимно — ок для 152-ФЗ).
5. Опционально: сохранённые списки поминаемых + «повторить заказ» (после auth-бэкенда).

---

# Часть 7. Админка

Отдельный защищённый раздел `/admin` (JWT, роль admin; auth-каркас уже есть в `features/auth`). Минимум:
- **Медиатека**: drag-drop загрузка (Часть 5), сетка с превью, alt-тексты.
- **Программы**: CRUD, редактор `description`, обложка/галерея, изменение цели/статуса.
- **Фотоотчёты**: форма публикации `ProgramUpdate` (дата, заголовок, текст, выбор фото из медиатеки).
- **Пожертвования/записки**: реестр, статусы, экспорт реестра записок для печати (как у «Таинства.ру»).
Можно начать как SPA-раздел того же React-приложения (быстрее), позже вынести.

---

# Часть 8. Как ложится на текущий код

| Что добавляем | Куда (по факту структуры) |
|---|---|
| Типы `media/program/donation` | `src/entities/{media,program,donation}/types.ts` |
| Форма доната | `src/features/donation-form/` (как `notes-form/`) |
| Хуки запросов | `src/features/*/lib/use-*.ts` (TanStack Query, как настроено в `providers.tsx`) |
| `<ResponsiveImage>`, прогресс | `src/shared/ui/responsive-image.tsx`, `src/widgets/program-progress/` |
| Хелперы `rub()`, `imgUrl()`, `blurhash` | `src/shared/lib/{money,img}/` |
| Страницы | `src/pages/{programs,program,donate,admin}/` + роуты в `router.tsx` |
| Навигация | `NAV_ITEMS`/`ROUTES` в `src/shared/config/routes.ts` |
| Реквизиты, тексты | заполнить заглушки в `src/shared/config/meta.ts` (`MONASTERY.bank`, контакты) |
| Стили прогресс/картинки | `src/shared/styles/components.css` (токены `--cerk-*`) |
| Env | `VITE_API_BASE_URL`, `VITE_CDN_BASE_URL`, `VITE_YOOKASSA_SHOP_ID` |

Зависимости к добавлению (согласовать — правило проекта «не добавлять без согласования»): `@yookassa/checkout-widget` (или скрипт виджета), `blurhash` (декод на фронте). Бэкенд-зависимости — на стороне Kotlin.

---

# Часть 9. Пошаговый план (по дням)

Оценка для 1 fullstack-разработчика (или фронт+бэкенд параллельно — тогда быстрее). День = ~рабочий день. Чекбоксы — можно идти строго по порядку.

## Неделя 0 — Подготовка (до кода)

> **Зафиксировано 2026-06-07 (пользователь):** БД — **PostgreSQL** (YDB как продакшн-базу не используем; MCP `ydb` остаётся инструментом для экспериментов). Бэкенд хостим на **арендном VPS** (терминология пользователя — «PES сайт»). Бэкенд — Kotlin (фреймворк Ktor/Spring Boot пока не выбран). **Важно про порядок:** аренда VPS — это шаг Дня 2, а не первый шаг; сначала юр-блок и платежи (День 1), иначе сервер простаивает (нечего деплоить, нельзя принимать деньги).

- [ ] **День 1.** Юр-блок: оферта, политика ПДн, согласие; квалификация «пожертвование». Решение по провайдерам (ЮKassa / CloudPayments). Заполнить `MONASTERY.bank` в `meta.ts`.
- [ ] **День 2.** Завести аккаунты и инфраструктуру: ЮKassa (на счёт религиозной организации), Yandex Cloud (Object Storage + CDN), **арендный VPS под Kotlin-бэкенд + imgproxy**, **PostgreSQL** (рекомендация — Yandex Managed PostgreSQL, т.к. денежное ядро; либо PG прямо на VPS). Создать бакет `monastery-media`, сервисный аккаунт, поднять imgproxy (Docker) за CDN, проверить подписанные URL на тестовой картинке.

## Неделя 1 — Медиа-пайплайн (фундамент для всего)
- [ ] **День 3.** Бэкенд: таблица `media`, эндпоинты `presign` + `commit`, дедуп по sha256, лимиты, blurhash, размеры.
- [ ] **День 4.** Frontend: `src/shared/lib/img` (`imgUrl` с подписью), `<ResponsiveImage>` (picture/srcset/blurhash), хелпер `rub()`.
- [ ] **День 5.** Frontend: компонент загрузки (sha256 на клиенте, presigned PUT с прогрессом, commit). Мини-медиатека (сетка + alt).
- [ ] **День 6.** Перевести существующие фото (`gallery`, `icon-page`, timeline) на `<ResponsiveImage>`; (опц.) `rclone sync` исторических оригиналов в бакет + джоб индексации. Проверить AVIF/WebP, CLS, lazy.

## Неделя 2 — Целевые программы
- [ ] **День 7.** Бэкенд: таблицы `programs`/`gallery`/`updates`, публичные `GET /programs`, `GET /programs/:slug`.
- [ ] **День 8.** Frontend: роуты `/programs`, `/programs/:slug`; `ProgramsListPage` (карточки с прогрессом); пункт меню.
- [ ] **День 9.** Frontend: `ProgramPage` (hero, описание, галерея «как сейчас», лента фотоотчётов через `<ResponsiveImage>` + lightbox).
- [ ] **День 10.** `ProgramProgress` (бар, проценты, суммы), стили `--cerk-*`. Завести программу-пилот **«Котельная»** (контент + фото).

## Неделя 3 — Пожертвования и оплата
- [ ] **День 11.** Бэкенд: таблица `donations`, `POST /donations` (создание платежа ЮKassa, `confirmationToken`), `GET /donations/:id`.
- [ ] **День 12.** Бэкенд: вебхук `POST /webhooks/yookassa` (idempotent, проверка подписи) → `succeeded` + атомарный инкремент `raised_kopecks` + email-квитанция.
- [ ] **День 13.** Frontend: `donation-form` (RHF/Zod), пресет-суммы, cover-fee, тумблер «ежемесячно»; mutation `useCreateDonation`.
- [ ] **День 14.** Frontend: виджет ЮKassa по токену, экран «Спасибо» с поллингом статуса; кнопка «Помочь» на `ProgramPage` (предзаполнение `programId`). **E2E-тест разового доната на котельную.**

## Неделя 4 — Рекуррент, фотоотчёты, админка
- [ ] **День 15.** Бэкенд: рекуррент (CloudPayments или автоплатежи ЮKassa): `save_payment_method`, `recurring_subscriptions`, планировщик списаний, ретраи.
- [ ] **День 16.** Бэкенд: админ-эндпоинты программ/обновлений; роль admin в JWT.
- [ ] **День 17.** Frontend: админка — CRUD программ + публикация фотоотчёта (выбор фото из медиатеки). **Сценарий «сделали этап котельной → опубликовали фотоотчёт» от начала до конца.**
- [ ] **День 18.** Email-уведомления (квитанции, «спасибо», напоминания об истекших картах). Шаблоны.

## Неделя 5 — Записки (боевой режим) и доверие
- [ ] **День 19.** Бэкенд: `POST /notes` (оплата как пожертвование за требу), реестр для печати.
- [ ] **День 20.** Frontend: снять `awaitingBackend` в `notes-form`, подключить оплату; UX-правки (родительный падеж, лимит 10–12, маркеры).
- [ ] **День 21.** Блок доверия на `/donate` и в футере: реквизиты, «на что идут пожертвования», ссылки на активные сборы. Раздел «официальный сайт обители».

## Неделя 6 — PWA, удержание, релиз
- [ ] **День 22.** PWA: manifest + service worker (offline-оболочка, установка на экран), web push (iOS 16.4+).
- [ ] **День 23.** Напоминания: даты поминовения, родительские субботы, двунадесятые праздники (email; push позже).
- [ ] **День 24.** QA: доступность для пожилых (шрифт ≥16px, контраст, крупные кнопки), мобильные, сквозные сценарии донат/записка/фотоотчёт.
- [ ] **День 25.** Прод-деплой, мониторинг вебхуков/платежей, бэкап БД и бакета. Чек-лист 152-ФЗ/54-ФЗ перед публикацией.

**Контрольные точки (демо заказчику):**
- После Дня 6 — HD-фото грузятся и отдаются оптимизированно.
- После Дня 14 — **можно реально жертвовать на котельную** (MVP цели заказчика).
- После Дня 17 — настоятель сам публикует фотоотчёты.
- После Дня 25 — полноценный релиз.

---

# Часть 10. Решения/реквизиты, которые нужны от заказчика

1. **Реквизиты религиозной организации** для `MONASTERY.bank` (ИНН, КПП, ОГРН, р/с, банк, БИК, корр/с) — сейчас заглушки в `meta.ts`.
2. **Договор ЮKassa** (или иной провайдер) на счёт организации; нужен ли рекуррент сразу (тогда + CloudPayments).
3. **Аккаунт Yandex Cloud** (или иной S3-провайдер РФ).
4. **Юр-документы**: оферта, политика ПДн, согласие (квалификация «пожертвование», см. правовой чек-лист исследования).
5. **Какой банк/МСС** будет присвоен (влияет на ставку СБП 0,7% vs 0,4%).
6. **Контент пилота «Котельная»**: текст «зачем», цель сбора в рублях, стартовые фото «как сейчас».
7. **Kotlin-фреймворк** (Ktor / Spring Boot) и где хостим бэкенд/imgproxy.

---

## Связи с вики
- [[synthesis/digital-product-market-research-2026-06-06]] — исследование, из которого вытекают эти решения (рекуррент, доверие, право РФ, PWA-приоритет).
- [[synthesis/project-snapshot-2026-05-14]] — состояние React-сайта, на который ложится ТЗ.
- [[bolshevyassky-monastery]] — обитель-заказчик.
