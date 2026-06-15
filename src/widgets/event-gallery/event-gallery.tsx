import { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import type { MediaRef } from '@/entities/media/types';
import { Icon } from '@/shared/icons/sprite';

/** Путь к миниатюре из ключа полноразмерного фото (/full/ → /thumb/). */
function thumbKey(key: string): string {
  return key.replace('/full/', '/thumb/');
}

/**
 * Галерея фотографий события: сетка миниатюр + лайтбокс с навигацией.
 * Миниатюры грузятся лениво (loading="lazy"), в лайтбоксе — полноразмерное фото.
 */
export function EventGallery({ photos }: { photos: MediaRef[] }) {
  const [active, setActive] = useState<number | null>(null);

  const open = active !== null;
  const close = useCallback(() => setActive(null), []);
  const prev = useCallback(
    () => setActive((i) => (i === null ? i : (i - 1 + photos.length) % photos.length)),
    [photos.length],
  );
  const next = useCallback(
    () => setActive((i) => (i === null ? i : (i + 1) % photos.length)),
    [photos.length],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, close, prev, next]);

  if (photos.length === 0) return null;

  return (
    <>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
          gap: 'var(--cerk-2)',
        }}
      >
        {photos.map((p, i) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setActive(i)}
            style={{
              padding: 0,
              border: '1px solid var(--cerk-border)',
              background: 'var(--cerk-paper-01)',
              cursor: 'pointer',
              aspectRatio: '1 / 1',
              overflow: 'hidden',
            }}
            aria-label={`Открыть фото ${i + 1} из ${photos.length}`}
          >
            <img
              src={thumbKey(p.key)}
              alt={p.alt}
              loading="lazy"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {open && active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={close}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 100,
              background: 'rgba(20, 16, 12, 0.92)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 'var(--cerk-5)',
            }}
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                close();
              }}
              aria-label="Закрыть"
              style={lightboxBtn({ top: 'var(--cerk-5)', right: 'var(--cerk-5)' })}
            >
              <Icon name="i-x" size={22} />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Предыдущее фото"
              style={lightboxBtn({ left: 'var(--cerk-5)', top: '50%' })}
            >
              <span style={{ display: 'inline-flex', transform: 'rotate(180deg)' }}>
                <Icon name="i-arrow-r" size={24} />
              </span>
            </button>
            <img
              src={photos[active].key}
              alt={photos[active].alt}
              onClick={(e) => e.stopPropagation()}
              style={{
                maxWidth: '92vw',
                maxHeight: '88vh',
                objectFit: 'contain',
                boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
              }}
            />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Следующее фото"
              style={lightboxBtn({ right: 'var(--cerk-5)', top: '50%' })}
            >
              <Icon name="i-arrow-r" size={24} />
            </button>
            <div
              style={{
                position: 'fixed',
                bottom: 'var(--cerk-5)',
                left: '50%',
                transform: 'translateX(-50%)',
                color: 'rgba(255,255,255,0.8)',
                fontFamily: 'var(--cerk-font-ui)',
                fontSize: 'var(--cerk-t-02)',
              }}
            >
              {active + 1} / {photos.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function lightboxBtn(pos: {
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
}): React.CSSProperties {
  return {
    position: 'fixed',
    ...pos,
    transform: pos.top === '50%' ? 'translateY(-50%)' : undefined,
    zIndex: 101,
    width: 44,
    height: 44,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(255,255,255,0.12)',
    border: '1px solid rgba(255,255,255,0.2)',
    color: '#fff',
    cursor: 'pointer',
    borderRadius: '50%',
  };
}
