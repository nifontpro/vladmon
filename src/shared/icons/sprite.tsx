/**
 * SVG-спрайт «Цѣркъ»: орнаменты (плетёнка, виноградная лоза, угол, кресты, IC XC NIKA)
 * + минимальный набор UI-иконок ручной отрисовки.
 *
 * Использование:
 *   <SvgSprite />                          // один раз в корне приложения
 *   <Icon name="orn-cross-8" size={28} />  // в местах использования
 */

/* eslint-disable react-refresh/only-export-components */

export const ICON_NAMES = [
  'orn-cross',
  'orn-cross-8',
  'orn-lily',
  'orn-icxc',
  'orn-knot-band',
  'orn-vine',
  'orn-corner',
  'orn-hairline',
  'orn-medallion',
  'orn-medallion-warm',
  'i-check',
  'i-x',
  'i-arrow-r',
  'i-calendar',
  'i-book',
  'i-bell',
  'i-info',
  'i-warning',
  'i-search',
  'i-menu',
  'i-chevron-d',
  'i-plus',
  'i-candle',
] as const;

export type IconName = (typeof ICON_NAMES)[number];

export function SvgSprite() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <defs>
        <symbol id="orn-cross" viewBox="0 0 32 32">
          <g fill="currentColor">
            <rect x="14.5" y="2" width="3" height="26" />
            <rect x="10" y="7" width="12" height="2.4" />
            <rect x="8" y="13" width="16" height="2.8" />
            <path d="M9 22 L23 22 L19.5 26 L12.5 26 Z" />
          </g>
        </symbol>

        <symbol id="orn-cross-8" viewBox="0 0 32 40">
          <g fill="currentColor">
            <rect x="14.5" y="2" width="3" height="36" />
            <rect x="10" y="7" width="12" height="2.4" />
            <rect x="6" y="13" width="20" height="2.8" />
            <g transform="translate(0 22)">
              <path d="M6 0 L26 -2.2 L26 2.2 L6 4.4 Z" />
            </g>
          </g>
        </symbol>

        <symbol id="orn-lily" viewBox="0 0 24 24">
          <g fill="currentColor">
            <path d="M12 2 C 11 6, 7 7, 5 9 C 7 9, 9 10, 10 12 C 8 12, 6 13, 5 15 C 7 14, 9 14, 11 15 L11 22 L13 22 L13 15 C 15 14, 17 14, 19 15 C 18 13, 16 12, 14 12 C 15 10, 17 9, 19 9 C 17 7, 13 6, 12 2 Z" />
          </g>
        </symbol>

        <symbol id="orn-icxc" viewBox="0 0 64 24">
          <g fill="currentColor" fontFamily="Ponomar, serif" fontSize="11" textAnchor="middle">
            <text x="10" y="11">IC</text>
            <text x="54" y="11">XC</text>
            <text x="10" y="22">НИ</text>
            <text x="54" y="22">КА</text>
            <rect x="30" y="2" width="4" height="20" />
            <rect x="22" y="7" width="20" height="2.4" />
          </g>
        </symbol>

        <symbol id="orn-knot-band" viewBox="0 0 1200 140" preserveAspectRatio="xMidYMid meet">
          <rect x="80" y="36" width="1040" height="68" fill="#3a2c7a" />
          <rect x="84" y="40" width="1032" height="60" fill="none" stroke="#b8893a" strokeWidth="1.6" />
          <g stroke="#f1e3b6" strokeWidth="2" fill="none" strokeLinejoin="round">
            <g transform="translate(120 50)">
              <g id="knot-unit">
                <path d="M0 20 C 10 -4, 30 -4, 40 20 C 50 44, 70 44, 80 20" />
                <path d="M0 20 C 10 44, 30 44, 40 20 C 50 -4, 70 -4, 80 20" />
                <circle cx="40" cy="20" r="6" fill="#a82820" stroke="#f1e3b6" />
              </g>
              <use href="#knot-unit" x="80" />
              <use href="#knot-unit" x="160" />
              <use href="#knot-unit" x="240" />
              <use href="#knot-unit" x="320" />
              <use href="#knot-unit" x="400" />
              <use href="#knot-unit" x="480" />
              <use href="#knot-unit" x="560" />
              <use href="#knot-unit" x="640" />
              <use href="#knot-unit" x="720" />
              <use href="#knot-unit" x="800" />
              <use href="#knot-unit" x="880" />
            </g>
          </g>
          <g transform="translate(600 70)">
            <circle r="32" fill="#a82820" stroke="#b8893a" strokeWidth="2" />
            <circle r="24" fill="none" stroke="#f1e3b6" strokeWidth="1.5" />
            <g fill="#f1e3b6">
              <rect x="-1.5" y="-18" width="3" height="36" />
              <rect x="-12" y="-1.5" width="24" height="3" />
              <rect x="-8" y="-12" width="16" height="2.2" transform="rotate(45)" />
              <rect x="-8" y="-12" width="16" height="2.2" transform="rotate(-45)" />
            </g>
          </g>
          <g fill="#3a6242" stroke="#b8893a" strokeWidth="1.4" transform="translate(80 70)">
            <path d="M0 0 C -20 -16, -40 -22, -52 -12 C -44 -6, -38 0, -36 8 C -42 10, -50 16, -50 26 C -38 22, -28 22, -20 28 C -14 18, -8 10, 0 0 Z" />
            <path d="M0 0 C -22 16, -42 22, -52 14" fill="none" />
          </g>
          <g fill="#3a6242" stroke="#b8893a" strokeWidth="1.4" transform="translate(1120 70) scale(-1 1)">
            <path d="M0 0 C -20 -16, -40 -22, -52 -12 C -44 -6, -38 0, -36 8 C -42 10, -50 16, -50 26 C -38 22, -28 22, -20 28 C -14 18, -8 10, 0 0 Z" />
            <path d="M0 0 C -22 16, -42 22, -52 14" fill="none" />
          </g>
          <g transform="translate(600 30)" fill="none" stroke="#b8893a" strokeWidth="1.6">
            <path d="M-80 6 Q 0 -22, 80 6" />
            <path d="M-60 2 Q 0 -14, 60 2" />
          </g>
          <use href="#orn-cross-8" x="586" y="0" width="28" height="32" color="#b8893a" />
        </symbol>

        <symbol id="orn-vine" viewBox="0 0 600 40">
          <g fill="none" stroke="#3a2c7a" strokeWidth="1.4" strokeLinecap="round">
            <path d="M10 20 Q 40 0, 70 20 T 130 20 T 190 20 T 250 20 T 310 20 T 370 20 T 430 20 T 490 20 T 550 20 Q 580 20, 590 20" />
            <path d="M70 20 Q 90 12, 100 4 M 70 20 Q 50 28, 40 36" />
            <path d="M190 20 Q 210 12, 220 4 M 190 20 Q 170 28, 160 36" />
            <path d="M310 20 Q 330 12, 340 4 M 310 20 Q 290 28, 280 36" />
            <path d="M430 20 Q 450 12, 460 4 M 430 20 Q 410 28, 400 36" />
            <path d="M550 20 Q 570 12, 580 4 M 550 20 Q 530 28, 520 36" />
          </g>
          <g fill="#a82820">
            <circle cx="100" cy="4" r="2.5" />
            <circle cx="40" cy="36" r="2.5" />
            <circle cx="220" cy="4" r="2.5" />
            <circle cx="160" cy="36" r="2.5" />
            <circle cx="340" cy="4" r="2.5" />
            <circle cx="280" cy="36" r="2.5" />
            <circle cx="460" cy="4" r="2.5" />
            <circle cx="400" cy="36" r="2.5" />
            <circle cx="580" cy="4" r="2.5" />
            <circle cx="520" cy="36" r="2.5" />
          </g>
        </symbol>

        <symbol id="orn-corner" viewBox="0 0 120 120">
          <g fill="none" stroke="#a82820" strokeWidth="1.6" strokeLinejoin="round">
            <path d="M14 10 L 110 10" />
            <path d="M10 14 L 10 110" />
            <path d="M14 22 L 102 22" />
            <path d="M22 14 L 22 102" />
            <circle cx="22" cy="22" r="10" fill="#a82820" />
            <g fill="#f1e3b6">
              <rect x="20.5" y="14" width="3" height="16" />
              <rect x="14" y="20.5" width="16" height="3" />
            </g>
            <path d="M108 10 C 116 14, 116 22, 110 28 C 104 22, 104 14, 108 10 Z" fill="#a82820" />
            <path d="M10 108 C 14 116, 22 116, 28 110 C 22 104, 14 104, 10 108 Z" fill="#a82820" />
            <path d="M34 22 Q 42 22, 46 30 Q 50 38, 50 50" />
            <path d="M22 34 Q 22 42, 30 46 Q 38 50, 50 50" />
            <path d="M50 50 Q 56 56, 52 62 Q 48 68, 40 64" fill="#3a6242" />
          </g>
        </symbol>

        <symbol id="orn-hairline" viewBox="0 0 400 32">
          <g fill="none" stroke="#a82820" strokeWidth="1.2" strokeLinecap="round">
            <path d="M2 16 L 170 16" />
            <path d="M230 16 L 398 16" />
            <path d="M170 16 Q 180 8, 190 16" />
            <path d="M230 16 Q 220 24, 210 16" />
          </g>
          <use href="#orn-cross-8" x="186" y="0" width="28" height="32" color="#a82820" />
        </symbol>

        {/*
          orn-medallion — угловая розетка в палитре band-3-rosettes + column-blue.
          Симметрична по 4 осям, потому один и тот же символ ставится во все 4 угла
          рамки и работает как «узел» — место, где горизонтальная и вертикальная
          полосы встречаются и плавно перетекают друг в друга.
        */}
        <symbol id="orn-medallion" viewBox="0 0 100 100">
          <rect width="100" height="100" fill="#efe5ce" />
          <rect
            x="2.5"
            y="2.5"
            width="95"
            height="95"
            fill="none"
            stroke="#c8983e"
            strokeWidth="2.4"
          />
          <rect
            x="6"
            y="6"
            width="88"
            height="88"
            fill="none"
            stroke="#8b6a44"
            strokeWidth="0.6"
            opacity="0.7"
          />

          <g transform="translate(50 50)">
            <circle r="34" fill="#efe5ce" />
            <circle r="34" fill="none" stroke="#c8983e" strokeWidth="1.4" />
            <circle r="32" fill="none" stroke="#8b6a44" strokeWidth="0.5" opacity="0.7" />
            <circle r="29" fill="#e1b6a4" />

            <g fill="#3a6c4f" stroke="#23402c" strokeWidth="0.5" strokeLinejoin="round">
              <path d="M0 -24 C 5 -14, 5 -6, 0 0 C -5 -6, -5 -14, 0 -24 Z" />
              <path d="M0 24 C 5 14, 5 6, 0 0 C -5 6, -5 14, 0 24 Z" />
              <path d="M-24 0 C -14 -5, -6 -5, 0 0 C -6 5, -14 5, -24 0 Z" />
              <path d="M24 0 C 14 -5, 6 -5, 0 0 C 6 5, 14 5, 24 0 Z" />
            </g>

            <g fill="#3a6c4f" stroke="#23402c" strokeWidth="0.4" opacity="0.85">
              <path d="M0 -14 L 4 -4 L 14 0 L 4 4 L 0 14 L -4 4 L -14 0 L -4 -4 Z" />
            </g>

            <g fill="#447a86" stroke="#1f4750" strokeWidth="0.4">
              <circle cx="14" cy="14" r="3.2" />
              <circle cx="-14" cy="14" r="3.2" />
              <circle cx="-14" cy="-14" r="3.2" />
              <circle cx="14" cy="-14" r="3.2" />
            </g>

            <circle r="5.5" fill="#a82820" stroke="#6a1612" strokeWidth="0.5" />
            <circle r="2" fill="#efe5ce" />

            <g fill="#efe5ce" stroke="#8b6a44" strokeWidth="0.3">
              <circle cx="0" cy="-30" r="1.4" />
              <circle cx="0" cy="30" r="1.4" />
              <circle cx="-30" cy="0" r="1.4" />
              <circle cx="30" cy="0" r="1.4" />
              <circle cx="21" cy="21" r="1" />
              <circle cx="-21" cy="21" r="1" />
              <circle cx="-21" cy="-21" r="1" />
              <circle cx="21" cy="-21" r="1" />
            </g>
          </g>

          {/* четыре «уса» лозы, выходящие в стороны полос — плавный переход */}
          <g fill="none" stroke="#3a6c4f" strokeWidth="1.4" strokeLinecap="round" opacity="0.75">
            <path d="M50 14 Q 46 8, 50 2" />
            <path d="M50 86 Q 54 92, 50 98" />
            <path d="M14 50 Q 8 54, 2 50" />
            <path d="M86 50 Q 92 46, 98 50" />
          </g>
          <g fill="#a82820" opacity="0.85">
            <circle cx="50" cy="3" r="1.6" />
            <circle cx="50" cy="97" r="1.6" />
            <circle cx="3" cy="50" r="1.6" />
            <circle cx="97" cy="50" r="1.6" />
          </g>
        </symbol>

        {/*
          orn-medallion-warm — тёплый вариант розетки для пар «band-1/band-4 + column-warm»
          (золото–терракота–умбра).
        */}
        <symbol id="orn-medallion-warm" viewBox="0 0 100 100">
          <rect width="100" height="100" fill="#f3e6c4" />
          <rect
            x="2.5"
            y="2.5"
            width="95"
            height="95"
            fill="none"
            stroke="#8b6a2a"
            strokeWidth="2.4"
          />
          <rect
            x="6"
            y="6"
            width="88"
            height="88"
            fill="none"
            stroke="#6a4a14"
            strokeWidth="0.6"
            opacity="0.7"
          />
          <g transform="translate(50 50)">
            <circle r="34" fill="#f3e6c4" stroke="#8b6a2a" strokeWidth="1.4" />
            <circle r="32" fill="none" stroke="#6a4a14" strokeWidth="0.5" opacity="0.7" />
            <circle r="29" fill="#d68c4a" />
            <g fill="#8b1f1a" stroke="#5a1410" strokeWidth="0.5" strokeLinejoin="round">
              <path d="M0 -24 C 5 -14, 5 -6, 0 0 C -5 -6, -5 -14, 0 -24 Z" />
              <path d="M0 24 C 5 14, 5 6, 0 0 C -5 6, -5 14, 0 24 Z" />
              <path d="M-24 0 C -14 -5, -6 -5, 0 0 C -6 5, -14 5, -24 0 Z" />
              <path d="M24 0 C 14 -5, 6 -5, 0 0 C 6 5, 14 5, 24 0 Z" />
            </g>
            <g fill="#3a6c4f" stroke="#23402c" strokeWidth="0.4">
              <path d="M0 -14 L 4 -4 L 14 0 L 4 4 L 0 14 L -4 4 L -14 0 L -4 -4 Z" />
            </g>
            <g fill="#f3e6c4" stroke="#8b6a2a" strokeWidth="0.4">
              <circle cx="14" cy="14" r="3" />
              <circle cx="-14" cy="14" r="3" />
              <circle cx="-14" cy="-14" r="3" />
              <circle cx="14" cy="-14" r="3" />
            </g>
            <circle r="5.5" fill="#23402c" stroke="#0d1e14" strokeWidth="0.5" />
            <circle r="2" fill="#f3e6c4" />
            <g fill="#f3e6c4" stroke="#6a4a14" strokeWidth="0.3">
              <circle cx="0" cy="-30" r="1.4" />
              <circle cx="0" cy="30" r="1.4" />
              <circle cx="-30" cy="0" r="1.4" />
              <circle cx="30" cy="0" r="1.4" />
              <circle cx="21" cy="21" r="1" />
              <circle cx="-21" cy="21" r="1" />
              <circle cx="-21" cy="-21" r="1" />
              <circle cx="21" cy="-21" r="1" />
            </g>
          </g>
          <g fill="none" stroke="#8b1f1a" strokeWidth="1.4" strokeLinecap="round" opacity="0.7">
            <path d="M50 14 Q 46 8, 50 2" />
            <path d="M50 86 Q 54 92, 50 98" />
            <path d="M14 50 Q 8 54, 2 50" />
            <path d="M86 50 Q 92 46, 98 50" />
          </g>
        </symbol>

        <symbol id="i-check" viewBox="0 0 16 16">
          <path
            d="M3 8.5 L 6.5 12 L 13 4.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </symbol>
        <symbol id="i-x" viewBox="0 0 16 16">
          <path
            d="M3 3 L 13 13 M 13 3 L 3 13"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </symbol>
        <symbol id="i-arrow-r" viewBox="0 0 16 16">
          <path
            d="M3 8 L 13 8 M 9 4 L 13 8 L 9 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </symbol>
        <symbol id="i-calendar" viewBox="0 0 24 24">
          <g fill="none" stroke="currentColor" strokeWidth="1.6">
            <rect x="3.5" y="5.5" width="17" height="15" />
            <path d="M3.5 10 L 20.5 10 M 8 3 L 8 7 M 16 3 L 16 7" />
            <circle cx="8" cy="14" r="1" fill="currentColor" />
            <circle cx="12" cy="14" r="1" fill="currentColor" />
            <circle cx="16" cy="14" r="1" fill="currentColor" />
          </g>
        </symbol>
        <symbol id="i-book" viewBox="0 0 24 24">
          <g fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M4 4 L 4 20 L 12 18 L 20 20 L 20 4 L 12 6 L 4 4 Z" />
            <path d="M12 6 L 12 18" />
          </g>
        </symbol>
        <symbol id="i-bell" viewBox="0 0 24 24">
          <g fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M5 17 L 19 17 C 18 14 17 13 17 10 C 17 7 15 4 12 4 C 9 4 7 7 7 10 C 7 13 6 14 5 17 Z" />
            <path d="M10 20 C 11 21.2, 13 21.2, 14 20" />
          </g>
        </symbol>
        <symbol id="i-info" viewBox="0 0 16 16">
          <circle cx="8" cy="8" r="6.4" fill="none" stroke="currentColor" strokeWidth="1.4" />
          <path
            d="M8 7 L 8 11.5 M 8 4.5 L 8 5.2"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </symbol>
        <symbol id="i-warning" viewBox="0 0 16 16">
          <path
            d="M8 2 L 14.5 13.5 L 1.5 13.5 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          <path
            d="M8 6 L 8 10 M 8 11.5 L 8 12"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </symbol>
        <symbol id="i-search" viewBox="0 0 16 16">
          <circle cx="7" cy="7" r="4.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
          <path
            d="M10.5 10.5 L 14 14"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </symbol>
        <symbol id="i-menu" viewBox="0 0 16 16">
          <path
            d="M2 4 H 14 M 2 8 H 14 M 2 12 H 14"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </symbol>
        <symbol id="i-chevron-d" viewBox="0 0 16 16">
          <path
            d="M3 6 L 8 11 L 13 6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </symbol>
        <symbol id="i-plus" viewBox="0 0 16 16">
          <path
            d="M8 3 L 8 13 M 3 8 L 13 8"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </symbol>
        <symbol id="i-candle" viewBox="0 0 24 24">
          <g fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M12 3 C 14 5, 14 7, 12 9 C 10 7, 10 5, 12 3 Z" fill="currentColor" />
            <rect x="10" y="9" width="4" height="12" />
            <path d="M8 21 L 16 21" />
          </g>
        </symbol>
      </defs>
    </svg>
  );
}

type IconProps = {
  name: IconName;
  size?: number;
  className?: string;
  'aria-label'?: string;
};

export function Icon({ name, size = 16, className, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      className={className}
      aria-hidden={rest['aria-label'] ? undefined : true}
      role={rest['aria-label'] ? 'img' : undefined}
      {...rest}
    >
      <use href={`#${name}`} />
    </svg>
  );
}
