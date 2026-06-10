# Сайт монастыря — на дизайн-системе «Цѣркъ»

React-приложение публичного сайта монастыря. Эстетика — старинная церковно-славянская
книга (пожелтевший пергамент, киноварные буквицы, сине-фиолетовый accent), структура и
динамика — Linear-style (плавные ease-функции, sticky header, scroll-fade анимации).

## Стек

- **Сборка:** Vite 8 + TypeScript 6
- **UI:** React 19.2 + Tailwind CSS v4 (`@tailwindcss/vite`)
- **Роутинг:** React Router 7 (lazy-роуты)
- **Состояние:** Zustand 5 (auth, theme) + TanStack Query 5 (server)
- **Формы:** react-hook-form + Zod
- **Анимации:** Motion 12
- **Иконки:** собственный SVG-спрайт + lucide-react
- **Линт:** ESLint 10 (flat config) + Prettier 3

## Команды

```bash
npm install          # установка зависимостей
npm run dev          # dev-сервер на :5173
npm run build        # production-сборка
npm run lint         # проверка ESLint
npm run preview      # просмотр production-сборки
```

## Структура (lite-FSD)

```
src/
├── app/         # провайдеры, router, layout
├── pages/       # 6 страниц (home, history, today, schedule, notes, contacts) + 404
├── widgets/     # композиционные блоки (header, footer, hero, ornament-band, ...)
├── features/    # auth, notes-form
├── entities/    # типы (user, note, service)
└── shared/      # ui-обёртки, иконки, библиотеки (cn, jwt, api), стили, конфиг
```

## Дизайн-система «Цѣркъ»

Все стили — в `src/shared/styles/`:
- `tokens.css` — CSS-переменные (палитра, spacing, типографика, durations, paper grain)
- `fonts.css` — `@font-face` для 5 церковно-славянских OTF
- `base.css` — глобальные стили (body, paper grain, vignette, типографика)
- `components.css` — `cerk-*` классы (кнопки, поля, табы, бэйджи, баннеры, таблицы)
- `index.css` — entry, импортирует всё + Tailwind v4 + `@theme` мостик

SVG-орнаменты — `src/shared/icons/sprite.tsx` (12 символов + UI-иконки).

## Что является заглушкой

- Все тексты в `src/shared/config/meta.ts` помечены `[ТЕКСТ-ЗАГЛУШКА]`.
- Фотографии монастыря отсутствуют — на странице «Современность» отрисовываются
  плейсхолдеры «ФОТО ТРЕБУЕТСЯ».
- Auth UI работает (формы валидируются Zod), но `submit` disabled — реальная авторизация
  включится после подключения Kotlin-бэкенда.
- Записки: форма работает локально, отправка отключена до бэкенда.

## Шрифты

Скопированы 5 ключевых из 17 церковно-славянских (Monomakh, Fedorovsk, Vertograd,
Ponomar, Indiction) — суммарно ~675 КБ OTF. Литературный текст — Literata, UI — Onest
(Google Fonts). Преlоad в `index.html` — только 3 самых нужных.

## Будущие фазы

- Подключение Kotlin-бэкенда (`VITE_API_BASE_URL` в `.env`).
- Включение auth (email сейчас, SMS позже).
- Реальная отправка записок и пожертвований.
- Тёмная «монастырская» тема.
- Календарь на месяц на странице расписания.
- OG-карточки для соц-сетей.

## Соседняя LLM Wiki

В корне проекта рядом с `src/` лежат папки `wiki/` и `raw/` — это **персональная исследовательская база знаний** (метод Карпатии), а не часть React-сайта. Они:
- не попадают в Vite-сборку (Vite смотрит только `src/` + `public/`);
- исключены из ESLint (`globalIgnores`) и Prettier (`.prettierignore`);
- не индексируются TypeScript (`tsconfig.app.json` → `"include": ["src"]`).

Правила работы с LLM Wiki — в `CLAUDE.md` (часть II). Если работаете только над сайтом, эти папки можно игнорировать.
