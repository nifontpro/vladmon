import { motion } from 'motion/react';
import { Gallery, type GalleryItem } from '@/widgets/gallery/gallery';
import { Banner } from '@/shared/ui';

const ITEMS: GalleryItem[] = Array.from({ length: 9 }, (_, i) => ({
  id: `today-${i + 1}`,
  alt: `Современное фото монастыря ${i + 1}`,
  caption: `[ТЕКСТ-ЗАГЛУШКА] Фотография ${i + 1} — событие или вид обители`,
}));

export function TodayPage() {
  return (
    <>
      <section className="section" style={{ paddingTop: 'var(--cerk-11)', borderTop: 0 }}>
        <div className="page">
          <div className="section-head">
            <div>
              <div className="eyebrow-row">
                <span
                  style={{
                    fontFamily: 'var(--cerk-font-rubric)',
                    fontSize: 'var(--cerk-t-06)',
                    color: 'var(--cerk-rub)',
                  }}
                >
                  III.
                </span>
                <span className="h-eyebrow">Современность</span>
              </div>
              <motion.h1
                className="h-section"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: [0.2, 0, 0, 1] }}
              >
                Жизнь обители сегодня
              </motion.h1>
            </div>
            <p style={{ color: 'var(--cerk-text-mute)' }}>
              Богослужения, престольные праздники, восстановительные работы, паломничества. Здесь
              появятся фотохроники последних лет — пока что вместо них стоят плейсхолдеры.
            </p>
          </div>

          <Banner variant="gold" title="Фотографии будут добавлены">
            Когда монастырь предоставит подборку современных фотографий, я заменю плейсхолдеры на
            настоящие снимки с подписями.
          </Banner>

          <div style={{ marginTop: 'var(--cerk-7)' }}>
            <Gallery items={ITEMS} />
          </div>
        </div>
      </section>
    </>
  );
}
