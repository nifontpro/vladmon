import { useParams, Link, Navigate } from 'react-router';
import { motion } from 'motion/react';
import { findArchiveEntry } from '@/entities/archive-entry/mock';
import { ARCHIVE_CATEGORY_LABEL } from '@/entities/archive-entry/types';
import { ROUTES } from '@/shared/config/routes';
import { EventGallery } from '@/widgets/event-gallery/event-gallery';
import { Icon } from '@/shared/icons/sprite';

export function ArchiveEntryPage() {
  const { slug } = useParams();
  const entry = slug ? findArchiveEntry(slug) : undefined;

  if (!entry) return <Navigate to={ROUTES.archive} replace />;

  return (
    <section className="section" style={{ paddingTop: 'var(--cerk-11)', borderTop: 0 }}>
      <div className="page" style={{ maxWidth: 900 }}>
        <Link
          to={ROUTES.archive}
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
          Весь архив
        </Link>

        <div className="eyebrow-row">
          <Icon name="orn-icxc" size={28} aria-label="" />
          <span className="h-eyebrow">
            {ARCHIVE_CATEGORY_LABEL[entry.category]} · {entry.date}
          </span>
        </div>
        <motion.h1
          className="h-section"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.2, 0, 0, 1] }}
          style={{ marginBottom: 'var(--cerk-4)' }}
        >
          {entry.title}
        </motion.h1>
        <p
          style={{
            color: 'var(--cerk-text-helper)',
            fontSize: 'var(--cerk-t-02)',
            marginBottom: 'var(--cerk-8)',
          }}
        >
          Источник: {entry.source}
        </p>

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
          <span className="h-eyebrow">
            {entry.scans.length > 1 ? `Сканы документа · ${entry.scans.length}` : 'Скан документа'}
          </span>
        </div>
        <p
          style={{
            color: 'var(--cerk-text-helper)',
            fontSize: 'var(--cerk-t-02)',
            margin: 'var(--cerk-3) 0 var(--cerk-5)',
          }}
        >
          Нажмите на изображение, чтобы рассмотреть его крупно.
        </p>
        <div style={{ marginBottom: 'var(--cerk-10)' }}>
          <EventGallery photos={entry.scans} />
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
          <span className="h-eyebrow">Расшифровка</span>
        </div>
        <article
          style={{
            marginTop: 'var(--cerk-5)',
            fontFamily: 'var(--cerk-font-body)',
            fontSize: 'var(--cerk-t-04)',
            color: 'var(--cerk-text-mute)',
            lineHeight: 1.7,
          }}
        >
          {entry.body.map((section, si) => (
            <div key={si} style={{ marginBottom: 'var(--cerk-7)' }}>
              {section.heading && (
                <h2
                  style={{
                    fontFamily: 'var(--cerk-font-rubric)',
                    fontSize: 'var(--cerk-t-05)',
                    color: 'var(--cerk-rub)',
                    marginBottom: 'var(--cerk-3)',
                  }}
                >
                  {section.heading}
                </h2>
              )}
              {section.paragraphs.map((p, pi) => (
                <p key={pi} style={{ marginBottom: 'var(--cerk-4)' }}>
                  {p}
                </p>
              ))}
            </div>
          ))}
        </article>

        {entry.notes && (
          <p
            style={{
              marginTop: 'var(--cerk-7)',
              paddingTop: 'var(--cerk-5)',
              borderTop: '1px solid var(--cerk-border)',
              color: 'var(--cerk-text-helper)',
              fontSize: 'var(--cerk-t-02)',
              fontStyle: 'italic',
              lineHeight: 1.6,
            }}
          >
            {entry.notes}
          </p>
        )}
      </div>
    </section>
  );
}
