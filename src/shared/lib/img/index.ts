/**
 * Построение URL изображения через imgproxy + CDN.
 * См. ТЗ: [[synthesis/tz-donations-programs-media-2026-06-06]] (часть 5).
 *
 * Если `key` — статический путь (`/photos/...`) или внешний URL, отдаём как есть.
 * Иначе строим imgproxy-совместимый путь; подпись HMAC в проде добавляет edge/бэкенд.
 */
const CDN_BASE = import.meta.env.VITE_CDN_BASE_URL ?? '';
const BUCKET = 's3://monastery-media';

export type ImgFormat = 'avif' | 'webp' | 'jpg';
export type ImgOpts = { w: number; fmt?: ImgFormat; q?: number };

export function isStaticKey(key: string): boolean {
  return /^(https?:)?\/\//.test(key) || key.startsWith('/');
}

export function imgUrl(key: string, opts: ImgOpts): string {
  if (isStaticKey(key)) return key;
  const { w, fmt = 'webp', q = 75 } = opts;
  return `${CDN_BASE}/rs:fit:${w}:0/q:${q}/f:${fmt}/plain/${BUCKET}/${key}`;
}
