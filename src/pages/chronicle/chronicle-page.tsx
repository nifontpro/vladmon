import { motion } from 'motion/react';
import { Link } from 'react-router';
import { CHRONICLE_EVENTS } from '@/entities/chronicle-event/mock';
import { ROUTES } from '@/shared/config/routes';
import { ResponsiveImage } from '@/shared/ui';
import { formatRuDate } from '@/shared/lib/date';
import { Icon } from '@/shared/icons/sprite';

export function ChroniclePage() {
  const events = [...CHRONICLE_EVENTS].sort((a, b) => b.date.localeCompare(a.date));

  return (
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
              <span className="h-eyebrow">Летопись обители</span>
            </div>
            <motion.h1
              className="h-section"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.2, 0, 0, 1] }}
            >
              События монастырской жизни
            </motion.h1>
          </div>
          <p style={{ color: 'var(--cerk-text-mute)' }}>
            Архиерейские богослужения, престольные праздники и крестные ходы. Хроника пополняется по
            мере жизни обители.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: 'var(--cerk-6)',
          }}
        >
          {events.map((evt, i) => (
            <motion.article
              key={evt.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: i * 0.05, ease: [0.2, 0, 0, 1] }}
              style={{
                background: 'var(--cerk-paper-00)',
                border: '1px solid var(--cerk-border)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Link
                to={`${ROUTES.chronicle}/${evt.slug}`}
                style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
              >
                <div style={{ aspectRatio: '3 / 2', overflow: 'hidden' }}>
                  <ResponsiveImage
                    media={evt.cover}
                    sizes="(max-width: 768px) 100vw, 380px"
                    height="100%"
                  />
                </div>
                <div style={{ padding: 'var(--cerk-6)' }}>
                  <div
                    className="h-eyebrow"
                    style={{ display: 'block', marginBottom: 'var(--cerk-3)' }}
                  >
                    {formatRuDate(evt.date)}
                  </div>
                  <h2
                    style={{
                      fontFamily: 'var(--cerk-font-rubric)',
                      fontSize: 'var(--cerk-t-06)',
                      color: 'var(--cerk-rub)',
                      lineHeight: 1.15,
                      marginBottom: 'var(--cerk-3)',
                    }}
                  >
                    {evt.title}
                  </h2>
                  <p style={{ margin: 0, color: 'var(--cerk-text-mute)', fontSize: 'var(--cerk-t-03)' }}>
                    {evt.summary}
                  </p>
                  <div
                    style={{
                      marginTop: 'var(--cerk-5)',
                      color: 'var(--cerk-accent)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      fontFamily: 'var(--cerk-font-ui)',
                      fontWeight: 500,
                      fontSize: 'var(--cerk-t-02)',
                    }}
                  >
                    Читать и смотреть фото
                    <Icon name="i-arrow-r" size={14} />
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
