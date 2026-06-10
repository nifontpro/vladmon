---
name: ornament-frame-from-image
description: |
  Превращает растровое изображение церковного/исторического орнамента (как
  raw/image/Ornaments/o4.jpeg, акварельные полосы в манускрипте) в
  tileable SVG-«кирпичи» для обрамления страниц сайта. Возвращает три SVG:
  corner.svg, tile-h.svg, tile-v.svg в единой палитре и стиле; швы заложены в
  композицию, никаких разрывов при background-repeat. Использовать когда
  пользователь говорит «сделай красивую рамку по образцу <картинка>»,
  «дорисуй углы», «нужна tileable полоса орнамента», «преврати акварельную
  полосу в SVG».
---

# Ornament Frame from Raster Reference

## Когда применять

- Пользователь даёт растровое изображение с несколькими полосами орнамента
  (часто акварельный манускрипт) и просит сделать из них рамку для каждой
  страницы сайта.
- Растровые исходники, тайленные через `background-repeat`, всегда дают
  разрывы по краям — пользователь это замечает. Решение — векторизация.
- Нужен художественный, не «инженерный» подход: единая палитра, единые мотивы
  по горизонтали, вертикали и углам.

## Архитектура

Рамка собирается из **трёх SVG-кирпичей**, выложенных по периметру контента:

```
┌─[corner]─[tile-h ↔ ↔ ↔]─[corner]─┐
│                                  │
│ tile-v        content        tile-v │
│   ↕                            ↕  │
│                                  │
└─[corner]─[tile-h ↔ ↔ ↔]─[corner]─┘
```

- `corner.svg` — квадрат N×N, симметричен по 4 осям (один файл, ставится во
  все 4 угла одинаково)
- `tile-h.svg` — период `3N × N` (например 240×80), tileable по X
- `tile-v.svg` — период `N × 3N` (например 80×240), tileable по Y

Период `3N`, а не `2N`: даёт достаточно места под композицию
`[бумага · узел · мост · розетка · мост · узел · бумага]` с зазором между
крайними узлами и краем тайла, чтобы при repeat не возникало «задвоения».

## Шаги

### 1. Анализ исходника (Python + PIL + numpy)

Установить если нужно: `python3 -m pip install --user numpy pillow`.

Найти границы полос автоматически:

```python
from PIL import Image
import numpy as np

img = Image.open("/path/to/source.jpeg").convert("RGB")
arr = np.asarray(img)
H, W, _ = arr.shape

r, g, b = arr[...,0].astype(int), arr[...,1].astype(int), arr[...,2].astype(int)
sat = np.maximum.reduce([r,g,b]) - np.minimum.reduce([r,g,b])
ink = 255 - ((r+g+b) // 3)
active = ((sat > 18) | (ink > 28)).astype(np.uint8)

# Сглаженный профиль по строкам/колонкам, порог ~0.5
row = np.convolve(active.mean(axis=1), np.ones(9)/9, mode='same')
# найти band'ы: непрерывные отрезки row > 0.5
```

После этого внутри каждой band — поискать «объекты» (колонны или розетки)
по столбцам: непрерывные отрезки `col_active > 0.25`.

### 2. Извлечение палитры

Открыть исходные полосы и зафиксировать палитру в виде 7-9 hex-цветов.
Типичная палитра церковного манускрипта:

```
#efe5ce  — бумага (тёплый пергамент)
#c8983e  — золото (охра, каёмки)
#8b6a2a  — тёмное золото (внутренняя обводка)
#3a6c4f  — зелёная лоза (основной зелёный)
#23402c  — тёмно-зелёный (контур)
#447a86  — бирюза (акценты)
#a82820  — карминовый (сердцевина)
#6a1612  — тёмный карминовый
#e1b6a4  — коралл (заливка медальонов)
```

**Все три SVG-кирпича должны использовать эту общую палитру.**
Без этого горизонталь, вертикаль и углы будут «о разных проектах».

### 3. Спроектировать единый мотив

Принцип «розетка ↔ узел»:

- **Розетка** — главный элемент, диаметр ≈ ширине внутренней зоны полосы.
  Например, при viewBox 80 единиц высотой и каёмкой 6.25 ед. сверху+снизу:
  внутренняя зона 67.5, радиус розетки 30–32.
- **Узел-четырёхлистник/бусина** — связка между розетками, диаметр < 1/3
  розетки. Не должен конкурировать по весу.
- **Каёмка** одинаковой толщины во всех трёх SVG (6.25 ед. на 80 ед.
  высоты — это ~6.25% / ~3.5 px при отображении 56 px).

### 4. Tileability — швы внутри композиции

```
tile-h period 160×80:
   [x=0]              [x=80]              [x=160]
   ●—————————————————(розетка r=32)—————————————————●
   ↑ пол-узла                                     ↑ пол-узла
   centered                                       centered
```

Левый и правый край SVG — **середина узла**. При `repeat-x` две половинки
сходятся в целый узел, и каёмки идут непрерывной линией. То же для tile-v
по вертикали.

### 5. SVG-файл — типичная структура

```svg
<svg xmlns="http://www.w3.org/2000/svg"
     width="160" height="80"
     viewBox="0 0 160 80"
     preserveAspectRatio="xMidYMid meet">
  <defs>
    <g id="rosette-h"> ... </g>   <!-- НЕ <symbol> -->
    <g id="node-h"> ... </g>
  </defs>

  <rect width="160" height="80" fill="#efe5ce"/>
  <rect x="0" y="0"     width="160" height="6.25" fill="#c8983e"/>
  <rect x="0" y="73.75" width="160" height="6.25" fill="#c8983e"/>

  <use href="#rosette-h" x="80" y="40"/>
  <use href="#node-h"    x="0"  y="40"/>
  <use href="#node-h"    x="160" y="40"/>
</svg>
```

### 6. Грабли — обязательно избегать

**`<g>`, а не `<symbol>`.** `<use href="#symbol">` без явных `width/height`
растягивает символ на 100% viewport SVG — узлы выходят гигантские, угол
смотрится пустым. С `<g>` `<use x y>` просто переносит координаты, размеры
сохраняются.

**Intrinsic размер на SVG.** Обязательно указать `width="..." height="..."`
на корневом `<svg>` (не только viewBox). Без них браузер не знает intrinsic
ratio, и `background-size: auto 100%` растягивает SVG на всю ширину
контейнера вместо повторения.

**Каёмки одной толщины.** Если в corner.svg каёмка 5/100, а в tile-h
6.25/80 — на стыке будет видимая ступенька. Привести к одному относительному
размеру (одинаковый % от высоты/ширины).

**Симметрия угла.** Чтобы один файл подходил для всех 4 углов, corner.svg
должен быть симметричен по 4 осям: розетка центрирована, каёмки по всем 4
сторонам одинаковые.

**Не размещать декор на самом краю тайла.** Соблазн — поставить узел на
`x=0` и `x=W`, рассчитывая, что половинки склеятся при repeat-x. Это
работает на стыке tile↔tile, но рядом с corner торчат **обрезанные
половинки** — выглядит как ошибка. Правильно: ставить узлы **внутрь**
тайла (`x=30`, `x=W-30`), оставляя по краям пустое бумажное поле. На
стыке tile↔corner у угла спокойная бумага без обрезков.

**Зазор между узлами на стыке tile↔tile.** Если узлы стоят слишком близко
к краям тайла (например `x=18`, `x=W-18`), при repeat-x два узла соседних
тайлов оказываются почти вплотную и выглядят как «парный глаз» —
визуальное удвоение. Правильно: внутри тайла оставить ≥20 ед бумаги по
краям. Период tile-h 240×80 c узлами на `x=30` и `x=210` даёт
~60 ед бумажного воздуха между узлами разных тайлов — узор не задваивается.

**`background-repeat: round`, а не `repeat`.** При `repeat` последняя копия
обрезается там, где помещается, — часто это середина розетки или узла.
`round` подгоняет ширину/высоту каждой копии так, чтобы в полосу поместилось
целое число копий (растяжение на 1–6 %, практически незаметно). Синтаксис:

```css
.band   { background-repeat: round no-repeat; }   /* по X round, по Y нет */
.column { background-repeat: no-repeat round; }   /* по Y round, по X нет */
```

**`background-position: 0 50%`, а не `center center`.** При центрировании
позиции узор смещается так, что **слева** в области полосы видна
обрезанная половина тайла — типичная жалоба пользователя: «фигура
обрезана наполовину». Прижимать к левому/верхнему краю:

```css
.band   { background-position: 0 50%; }  /* левый край полосы — начало 1й копии */
.column { background-position: 50% 0; }  /* верхний край колонны — начало 1й копии */
```

В сочетании с `round` это даёт: первая копия начинается ровно у угла,
последняя заканчивается ровно у противоположного угла, все копии целые.

### 7. Подключение в React-компонент

```tsx
// src/widgets/ornament-frame/ornament-frame.tsx
<div className="ornament-frame">
  <div className="ornament-frame__band ornament-frame__band--top"
       style={{backgroundImage: `url(${TILE_H})`}} aria-hidden/>
  <div className="ornament-frame__band ornament-frame__band--bottom"
       style={{backgroundImage: `url(${TILE_H})`}} aria-hidden/>
  <div className="ornament-frame__column ornament-frame__column--left"
       style={{backgroundImage: `url(${TILE_V})`}} aria-hidden/>
  <div className="ornament-frame__column ornament-frame__column--right"
       style={{backgroundImage: `url(${TILE_V})`}} aria-hidden/>
  <img src={CORNER} className="ornament-frame__corner ornament-frame__corner--tl" aria-hidden/>
  <img src={CORNER} className="ornament-frame__corner ornament-frame__corner--tr" aria-hidden/>
  <img src={CORNER} className="ornament-frame__corner ornament-frame__corner--bl" aria-hidden/>
  <img src={CORNER} className="ornament-frame__corner ornament-frame__corner--br" aria-hidden/>
  <div className="ornament-frame__content">{children}</div>
</div>
```

```css
.ornament-frame {
  --orn-th: 72px;
  --orn-gap: 24px;
  position: relative;
  padding: var(--orn-th);
  margin: var(--orn-gap);
  background-color: #efe5ce;
}
.ornament-frame__band {
  position: absolute;
  height: var(--orn-th);
  left: var(--orn-th); right: var(--orn-th);
  background-repeat: repeat-x;
  background-size: auto 100%;
}
.ornament-frame__band--top { top: 0; }
.ornament-frame__band--bottom { bottom: 0; transform: scaleY(-1); }
.ornament-frame__column {
  position: absolute;
  width: var(--orn-th);
  top: var(--orn-th); bottom: var(--orn-th);
  background-repeat: repeat-y;
  background-size: 100% auto;
}
.ornament-frame__column--left { left: 0; }
.ornament-frame__column--right { right: 0; transform: scaleX(-1); }
.ornament-frame__corner {
  position: absolute;
  width: var(--orn-th); height: var(--orn-th);
  object-fit: contain;
  z-index: 2;
}
.ornament-frame__corner--tl { top: 0; left: 0; }
/* ... остальные углы — симметрично ... */
```

Адаптивные брейкпойнты через `@media` (1100/760/480 px) на `--orn-th` и
`--orn-gap`.

### 8. Итерация в браузере

Запустить dev (`npm run dev`), открыть страницу, делать zoom-скриншоты на
4 угла и на стыки tile'ов. Проверять:

- Каёмки идут непрерывно через корнер/полосу — без ступенек
- Розетки одного размера у горизонтали/вертикали/угла
- Узлы маленькие, не конкурируют с розетками
- При repeat шов не виден (две половинки узла должны точно сходиться)

Если узор «жёсткий» — посмотри на референсные исходники в `raw/image/Ornaments/`:
там акварель, мягкость даёт ручная природа линии. В SVG её имитировать сложно;
можно слегка приглушить контуры через `opacity` или сделать обводку чуть тоньше.

## Ссылки на текущий проект

- `public/ornaments/svg/{corner,tile-h,tile-v}.svg` — финальные кирпичи
- `src/widgets/ornament-frame/ornament-frame.{tsx,css}` — компонент
- `src/app/layout.tsx` — оборачивает `<Outlet/>` в `<OrnamentFrame>`,
  рамка появляется на всех страницах автоматически
- `raw/image/Ornaments/o4.jpeg`, `o5.jpg` — исходные акварельные сканы
  (4 горизонтальные полосы + 9 вертикальных колонн)
- `wiki/synthesis/ornament-frame-svg-2026-05-14.md` — фиксация решений
  и палитры для будущих сессий
