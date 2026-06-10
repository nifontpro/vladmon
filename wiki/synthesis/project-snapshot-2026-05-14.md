---
type: synthesis
title: Снапшот проекта на 2026-05-14
aliases: [project-snapshot, snapshot, dev-context]
tags: [meta, dev, react, design-system, llm-wiki]
created: 2026-05-14
updated: 2026-05-14
---

# Снапшот проекта на 2026-05-14

> Этот файл — мета-документ о состоянии разработки на конкретную дату. Он **не**
> является частью знаний по теме исследования (для этого см. `entities/`,
> `concepts/`, `sources/`). Здесь зафиксирован контекст того, что сделано в коде,
> какие решения приняты, что ещё предстоит — чтобы будущая сессия Claude могла
> восстановить картину без переспрашивания.

## Что это за репозиторий

Папка `app/` — корень проекта в редакторе. Внутри уживаются **два независимых контекста**:

1. **React-сайт православного монастыря** (`src/`, `public/`, `package.json`, …) на собственной дизайн-системе «Цѣркъ».
2. **LLM Wiki** (`wiki/`, `raw/`) — персональная исследовательская база знаний по методу Карпатии.

Полные правила обоих контекстов — в `app/CLAUDE.md` (части I и II соответственно). Граница описана там же в части III.

## Стек React-сайта

- **Сборка:** Vite 8 + TypeScript 6
- **UI:** React 19.2 + Tailwind CSS v4 (через `@tailwindcss/vite` + `@theme` в CSS)
- **Роутинг:** React Router 7 (data router, lazy-роуты)
- **Состояние:** Zustand 5 (auth, theme) + TanStack Query 5 (server)
- **Формы:** react-hook-form 7 + Zod 4
- **Анимации:** Motion 12 (бывший Framer Motion)
- **Линт:** ESLint 10 (flat config) + Prettier 3 + `prettier-plugin-tailwindcss`

Архитектура — **lite-FSD**: `pages/widgets/features/entities/shared` + слой `app/` для провайдеров/роутера/layout. Алиас `@/*` → `src/*`.

## Дизайн-система «Цѣркъ»

**Источник:** handoff-пакет от Claude Design (`api.anthropic.com/v1/design/h/TB2lSEWcQT66Ma3adUU1Jg`), распакован при работе во временную папку. Концепция — старинная церковно-славянская книга + Linear-style взаимодействие.

**Палитра** (CSS-переменные в `src/shared/styles/tokens.css`):
- `paper` — пергамент, 6 шагов от `#fbf3da` до `#b89752`
- `ink` — чернила-сепия, 5 шагов от `#2a1810` до `#c2a784`
- `rubric` — киноварь, 4 красных оттенка для буквиц и акцентов
- `lapis` — лазурь/индиго, 7 шагов, основной accent `#3a2c7a`
- `gold` — сусаль, 3 оттенка
- `emerald` — изумруд, 2 оттенка

**Типографика:**
- Display/заголовки/буквицы → Monomakh, Fedorovsk, Vertograd, Ponomar, Indiction (5 кириллических OTF, лежат в `public/fonts/`)
- Body → Literata (Google Fonts)
- UI → Onest (Google Fonts)
- **Правило**: тексты пишутся современным русским языком, без ѣ/і/ѳ/ѵ/конечных ъ. (Зафиксировано дизайнером в исходном чате.)

**Эффекты** — paper grain (SVG noise filter, `opacity: 0.55`, `mix-blend-mode: multiply`) + radial vignette поверх `body`, монтируются через `::before` и `::after`. Анимации — `cubic-bezier(0.2, 0, 0, 1)`, длительности 70/120/180/280 мс.

**Компоненты** дизайн-системы (классы `.cerk-*` в `src/shared/styles/components.css`): кнопки (5 вариантов × 4 размера), поля, чекбоксы/радио, тогглы, бэйджи, табы, таблицы, баннеры, аватары.

**SVG-спрайт** (`src/shared/icons/sprite.tsx`) — 12 орнаментов (`orn-cross-8`, `orn-knot-band`, `orn-vine`, `orn-corner`, `orn-hairline`, `orn-icxc`, `orn-lily`, …) + 13 UI-иконок.

## Карта страниц

| Роут | Компоненты | Статус |
|---|---|---|
| `/` | hero с дроп-капом + ornament-band + today-card + 3 промо-плитки | ✅ работает |
| `/history` | timeline с буквицами-маркерами | ✅ работает (текст-заглушка) |
| `/today` | gallery 3×3 | ✅ работает (плейсхолдеры фото) |
| `/schedule` | таблица недели + tabs неделя/месяц | ✅ работает |
| `/notes` | форма записок (RHF + Zod, динамический массив) | ✅ UI готов, submit disabled |
| `/contacts` | карточки + полные реквизиты | ✅ работает (текст-заглушка) |
| `*` | 404 с большой буквицей | ✅ работает |

## Auth-каркас

- `src/features/auth/model/store.ts` — Zustand с `user`, `accessToken`, `status`.
- `src/features/auth/lib/jwt.ts` — `parseJwt`, `isExpired` (без верификации, claims only).
- `src/features/auth/ui/{login,register}-form.tsx` — формы с Zod-валидацией, кнопка submit `disabled`, баннер «после подключения сервера».
- `src/shared/lib/api/client.ts` — fetch-обёртка с JWT-интерсептором, готов к Kotlin-API (через `VITE_API_BASE_URL`).

**Принцип:** никаких mock-токенов в localStorage. UI работает, реальная авторизация включится после Kotlin.

## Согласованные с пользователем решения

| Решение | Что выбрали |
|---|---|
| Стек | Vite + React + TS + Tailwind + shadcn-style (без CLI shadcn) |
| Контент | Заглушки с пометкой `[ТЕКСТ-ЗАГЛУШКА]`, фото — плейсхолдеры |
| Шрифты | 4–5 ключевых OTF, не все 17 (производительность) |
| Auth в MVP | Каркас + disabled UI (не моки) |
| Навигация | Отдельные роуты, не one-page |
| Папка | Сначала `site/app/`, после переезда — просто `app/` |
| `app/CLAUDE.md` | Объединённый (React + LLM Wiki) |

## Хронология сессии 2026-05-14

1. **Инициализация LLM Wiki** в `site/` (метод Карпатии): создан `CLAUDE.md`, скелет `raw/`/`wiki/`.
2. **Скачан handoff-пакет** дизайн-системы «Цѣркъ» (gzip → tar, ~9.7 МБ). Прочитан чат дизайнера + `tokens.css` + `components.css` + `index.html`.
3. **Развёрнут Vite-проект** `site/app/` с полным стеком, dev-зависимости установлены.
4. **Перенесены стили** (tokens/fonts/base/components/index.css), SVG-спрайт, шрифты, ассеты.
5. **Написаны** shared/ui-обёртки, entities-типы, features (auth, notes-form), widgets (header, footer, ornament-band, today-card, timeline, gallery, schedule-table), pages (6 + 404), app/ (providers, router, layout).
6. **Прогон проверок**: `tsc -b` exit 0, `eslint .` exit 0, `npm run build` exit 0 (484 КБ → 153 КБ gzip).
7. **Скриншот** главной в Chrome через MCP — визуально подтверждено: hero с буквицей «Н», орнамент-плетёнка, промо-плитки, футер.
8. **Переезд** `site/{CLAUDE.md, wiki/, raw/}` → `site/app/`. CLAUDE.md переписан как объединённый. `.prettierignore` + `eslint.config.js → globalIgnores`. После переезда: `tsc` / `eslint` / `build` — exit 0, размеры не изменились.

## Известные косяки (мелкие, не блокируют)

- В `widgets/today-card/today-card.tsx` буквица берёт первый символ `[` из префикса `[ТЕКСТ-ЗАГЛУШКА]` — нужно вырезать префикс перед буквицей.
- В Chrome-MCP сессии скролл с `key: "Home"` навигировал на `/history` — это особенность браузерной автоматизации, не баг приложения.
- Production-бандл основного `index.js` — 484 КБ. Доминирует RR + Motion + Zustand + Zod. Не критично, но при росте можно делать manual chunks.

## Что осталось сделать (за пределами MVP)

- Заменить заглушки на реальные тексты и фото монастыря.
- Подключить Kotlin-бэкенд (`VITE_API_BASE_URL` в `.env`, реальные endpoints).
- Включить регистрацию: email сейчас, SMS позже.
- Тёмная «монастырская» тема (заготовка в `src/features/theme/`).
- Календарь на месяц на `/schedule`.
- OG-карточки для соц-сетей.

## Связи

- Тема исследования LLM Wiki — Вьясский монастырь (см. [[overview]], источники не обработаны).
- Полные правила и конвенции — в `app/CLAUDE.md` (вне вики).
- Архитектурный план реализации — `/Users/nifont/.claude/plans/abstract-conjuring-crane.md`.
