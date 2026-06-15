import { useParams, Link, Navigate } from 'react-router';
import { motion } from 'motion/react';
import { findChronicleEvent } from '@/entities/chronicle-event/mock';
import { ROUTES } from '@/shared/config/routes';
import { EventGallery } from '@/widgets/event-gallery/event-gallery';
import { formatRuDate } from '@/shared/lib/date';
import { Icon } from '@/shared/icons/sprite';

export function EventPage() {
  const { slug } = useParams();
  const evt = slug ? findChronicleEvent(slug) : undefined;

  if (!evt) return <Navigate to={ROUTES.chronicle} replace />;

  return (
    <section className="section" style={{ paddingTop: 'var(--cerk-11)', borderTop: 0 }}>
      <div className="page" style={{ maxWidth: 980 }}>
        <Link
          to={ROUTES.chronicle}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            fontSize: 'var(--cerk-t-02)',
            marginBottom: 'var(--cerk-6)',
            fontFamily: 'var(--cerk-font-ui)',
          }}
        >
          <span style={{ display: 'inline-flex', transform: 'rotate(180deg)' }}>
            <Icon name="i-arrow-r" size={14} />
          </span>
          Вся летопись
        </Link>

        <div className="eyebrow-row">
          <Icon name="orn-icxc" size={28} aria-label="" />
          <span className="h-eyebrow">{formatRuDate(evt.date)}</span>
        </div>
        <motion.h1
          className="h-section"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.2, 0, 0, 1] }}
          style={{ marginBottom: 'var(--cerk-7)' }}
        >
          {evt.title}
        </motion.h1>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.6fr) minmax(0, 1fr)',
            gap: 'var(--cerk-9)',
            alignItems: 'start',
            marginBottom: 'var(--cerk-10)',
          }}
          className="donate-grid"
        >
          <div
            style={{
              fontFamily: 'var(--cerk-font-body)',
              fontSize: 'var(--cerk-t-04)',
              color: 'var(--cerk-text-mute)',
              lineHeight: 1.7,
            }}
          >
            {evt.body.split('\n\n').map((para, i) => (
              <p key={i} style={{ marginBottom: 'var(--cerk-5)' }}>
                {para}
              </p>
            ))}

            {evt.source && (
              <p style={{ fontSize: 'var(--cerk-t-02)', color: 'var(--cerk-text-helper)' }}>
                Источник:{' '}
                <a href={evt.source.url} target="_blank" rel="noopener noreferrer">
                  {evt.source.title}
                </a>
              </p>
            )}
          </div>

          {evt.participants.length > 0 && (
            <aside
              style={{
                background: 'var(--cerk-paper-00)',
                border: '1px solid var(--cerk-border)',
                padding: 'var(--cerk-6)',
              }}
            >
              <div
                className="h-eyebrow"
                style={{ display: 'block', marginBottom: 'var(--cerk-4)' }}
              >
                Участники
              </div>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 'var(--cerk-4)' }}>
                {evt.participants.map((p) => (
                  <li key={p.name}>
                    <div
                      style={{
                        fontFamily: 'var(--cerk-font-rubric)',
                        color: 'var(--cerk-rub)',
                        fontSize: 'var(--cerk-t-04)',
                        lineHeight: 1.2,
                      }}
                    >
                      {p.name}
                    </div>
                    <div style={{ color: 'var(--cerk-text-helper)', fontSize: 'var(--cerk-t-02)' }}>
                      {p.role}
                    </div>
                  </li>
                ))}
              </ul>
            </aside>
          )}
        </div>

        <div className="eyebrow-row">
          <span
            style={{
              fontFamily: 'var(--cerk-font-rubric)',
              fontSize: 'var(--cerk-t-06)',
              color: 'var(--cerk-rub)',
            }}
          >
            §
          </span>
          <span className="h-eyebrow">Фотографии · {evt.gallery.length}</span>
        </div>
        <div style={{ marginTop: 'var(--cerk-5)' }}>
          <EventGallery photos={evt.gallery} />
        </div>
      </div>
    </section>
  );
}
