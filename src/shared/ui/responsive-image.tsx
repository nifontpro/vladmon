import type { CSSProperties } from 'react';
import type { MediaRef } from '@/entities/media/types';
import { imgUrl, isStaticKey, type ImgFormat } from '@/shared/lib/img';

const WIDTHS = [400, 640, 800, 1200, 1600, 2000];

function srcSet(media: MediaRef, fmt: ImgFormat): string {
  return WIDTHS.filter((w) => !media.width || w <= media.width)
    .map((w) => `${imgUrl(media.key, { w, fmt })} ${w}w`)
    .join(', ');
}

type Props = {
  media?: MediaRef | null;
  /** значение для атрибута `sizes`, напр. "(max-width: 768px) 100vw, 800px" */
  sizes: string;
  priority?: boolean;
  className?: string;
  height?: number | string;
  style?: CSSProperties;
};

/**
 * Адаптивная картинка дизайн-системы «Цѣркъ».
 * Каскад AVIF→WebP→JPEG + srcset для HD-изображений из медиа-пайплайна;
 * для статических `public/`-путей — обычный <img>. Нет картинки/идёт обработка —
 * рисуется заглушка в стиле «ФОТО ТРЕБУЕТСЯ».
 */
export function ResponsiveImage({
  media,
  sizes,
  priority = false,
  className,
  height = 'auto',
  style,
}: Props) {
  const imgStyle: CSSProperties = {
    width: '100%',
    height,
    objectFit: 'cover',
    display: 'block',
    filter: 'saturate(0.92)',
    ...style,
  };

  if (!media || media.status !== 'ready' || !media.key) {
    return <ImagePlaceholder height={height} className={className} style={style} />;
  }

  if (isStaticKey(media.key)) {
    return (
      <img
        src={media.key}
        alt={media.alt}
        width={media.width || undefined}
        height={media.height || undefined}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        className={className}
        style={imgStyle}
      />
    );
  }

  return (
    <picture>
      <source type="image/avif" srcSet={srcSet(media, 'avif')} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet(media, 'webp')} sizes={sizes} />
      <img
        src={imgUrl(media.key, { w: 800, fmt: 'jpg' })}
        srcSet={srcSet(media, 'jpg')}
        sizes={sizes}
        alt={media.alt}
        width={media.width || undefined}
        height={media.height || undefined}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        className={className}
        style={imgStyle}
      />
    </picture>
  );
}

function ImagePlaceholder({
  height,
  className,
  style,
}: {
  height: number | string;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      aria-label="Фото будет добавлено"
      className={className}
      style={{
        width: '100%',
        height,
        minHeight: 160,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background:
          'repeating-linear-gradient(45deg, var(--cerk-paper-02) 0 12px, var(--cerk-paper-01) 12px 24px)',
        color: 'var(--cerk-text-helper)',
        fontFamily: 'var(--cerk-font-rubric)',
        fontSize: 'var(--cerk-t-04)',
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        ...style,
      }}
    >
      ФОТО ТРЕБУЕТСЯ
    </div>
  );
}
