export type MediaStatus = 'processing' | 'ready' | 'failed';

/**
 * Ссылка на изображение в медиа-пайплайне.
 * `key` — ключ объекта в хранилище (`original/<sha256>.<ext>`) ЛИБО статический
 * путь из `public/` (начинается с `/`) или внешний URL — тогда отдаётся как есть,
 * без imgproxy. См. ТЗ: [[synthesis/tz-donations-programs-media-2026-06-06]].
 */
export type MediaRef = {
  id: string;
  key: string;
  width: number;
  height: number;
  blurhash: string;
  alt: string;
  status: MediaStatus;
};
