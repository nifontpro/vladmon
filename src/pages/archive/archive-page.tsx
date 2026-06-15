import { motion } from 'motion/react';
import { Link } from 'react-router';
import { ARCHIVE_ENTRIES } from '@/entities/archive-entry/mock';
import {
  ARCHIVE_CATEGORY_LABEL,
  type ArchiveCategory,
  type ArchiveEntry,
} from '@/entities/archive-entry/types';
import { ROUTES } from '@/shared/config/routes';
import { ResponsiveImage } from '@/shared/ui';
import { Icon } from '@/shared/icons/sprite';

const CATEGORY_ORDER: ArchiveCategory[] = ['documents', 'maps', 'memoirs', 'press', 'photos'];

export function ArchivePage() {
  const byCategory = new Map<ArchiveCategory, ArchiveEntry[]>();
  for (const e of ARCHIVE_ENTRIES) {
    const list = byCategory.get(e.category) ?? [];
    list.push(e);
    byCategory.set(e.category, list);
  }

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
                IX.
              </span>
              <span className="h-eyebrow">Архив обители</span>
            </div>
            <motion.h1
              className="h-section"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.2, 0, 0, 1] }}
            >
              Документы и свидетельства
            </motion.h1>
          </div>
          <p style={{ color: 'var(--cerk-text-mute)' }}>
            Фотографии архивных документов обители с текстовыми расшифровками. Раздел пополняется по
            мере работы с архивными фондами.
          </p>
        </div>

        {CATEGORY_ORDER.filter((c) => byCategory.has(c)).map((cat) => (
          <div key={cat} style={{ marginBottom: 'var(--cerk-11)' }}>
            <h2
              className="h-eyebrow"
              style={{
                display: 'block',
                marginBottom: 'var(--cerk-6)',
                paddingBottom: 'var(--cerk-3)',
                borderBottom: '1px solid var(--cerk-border)',
              }}
            >
              {ARCHIVE_CATEGORY_LABEL[cat]}
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: 'var(--cerk-6)',
              }}
            >
              {byCategory.get(cat)!.map((entry, i) => (
                <motion.article
                  key={entry.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.4, delay: i * 0.05, ease: [0.2, 0, 0, 1] }}
                  style={{
                    background: 'var(--cerk-paper-00)',
                    border: '1px solid var(--cerk-border)',
                    overflow: 'hidden',
                  }}
                >
                  <Link
                    to={`${ROUTES.archive}/${entry.slug}`}
                    style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
                  >
                    <div
                      style={{
                        aspectRatio: '4 / 3',
                        overflow: 'hidden',
                        borderBottom: '1px solid var(--cerk-border)',
                        background: 'var(--cerk-paper-01)',
                      }}
                    >
                      <ResponsiveImage
                        media={entry.cover}
                        sizes="(max-width: 768px) 100vw, 340px"
                        height="100%"
                      />
                    </div>
                    <div style={{ padding: 'var(--cerk-6)' }}>
                      <div
                        className="h-eyebrow"
                        style={{ display: 'block', marginBottom: 'var(--cerk-3)' }}
                      >
                        {entry.date}
                      </div>
                      <h3
                        style={{
                          fontFamily: 'var(--cerk-font-rubric)',
                          fontSize: 'var(--cerk-t-06)',
                          color: 'var(--cerk-rub)',
                          lineHeight: 1.15,
                          marginBottom: 'var(--cerk-3)',
                        }}
                      >
                        {entry.title}
                      </h3>
                      <p
                        style={{
                          margin: 0,
                          color: 'var(--cerk-text-mute)',
                          fontSize: 'var(--cerk-t-03)',
                        }}
                      >
                        {entry.summary}
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
                        Открыть документ
                        <Icon name="i-arrow-r" size={14} />
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
