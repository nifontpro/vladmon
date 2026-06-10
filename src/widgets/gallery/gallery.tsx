import { motion } from 'motion/react';

export type GalleryItem = {
  id: string;
  src?: string;
  caption?: string;
  alt: string;
};

type Props = {
  items: ReadonlyArray<GalleryItem>;
};

export function Gallery({ items }: Props) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: 'var(--cerk-5)',
      }}
    >
      {items.map((it, i) => (
        <motion.figure
          key={it.id}
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4, delay: (i % 6) * 0.04, ease: [0.2, 0, 0, 1] }}
          style={{
            margin: 0,
            background: 'var(--cerk-paper-00)',
            border: '1px solid var(--cerk-border)',
            padding: 'var(--cerk-3)',
          }}
        >
          {it.src ? (
            <img
              src={it.src}
              alt={it.alt}
              loading="lazy"
              style={{
                width: '100%',
                height: 220,
                objectFit: 'cover',
                display: 'block',
                filter: 'saturate(0.92)',
              }}
            />
          ) : (
            <div
              aria-label="Фото будет добавлено"
              style={{
                width: '100%',
                height: 220,
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
              }}
            >
              ФОТО ТРЕБУЕТСЯ
            </div>
          )}
          {it.caption && (
            <figcaption
              style={{
                marginTop: 'var(--cerk-3)',
                fontSize: 'var(--cerk-t-02)',
                color: 'var(--cerk-text-helper)',
              }}
            >
              {it.caption}
            </figcaption>
          )}
        </motion.figure>
      ))}
    </div>
  );
}
