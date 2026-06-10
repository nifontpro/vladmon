import { motion } from 'motion/react';
import { useParams, Link } from 'react-router';
import { findProgram } from '@/entities/program/mock';
import type { ProgramUpdate } from '@/entities/program/types';
import { ResponsiveImage } from '@/shared/ui';
import { ProgramProgress } from '@/widgets/program-progress/program-progress';
import { DonationPanel } from '@/widgets/donation-panel/donation-panel';

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function ProgramPage() {
  const { slug } = useParams<{ slug: string }>();
  const program = slug ? findProgram(slug) : undefined;

  if (!program) {
    return (
      <section className="section" style={{ paddingTop: 'var(--cerk-11)', borderTop: 0 }}>
        <div className="page">
          <h1 className="h-section">Программа не найдена</h1>
          <p style={{ color: 'var(--cerk-text-mute)' }}>
            Возможно, сбор завершён. <Link to="/programs">Все программы обители →</Link>
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="section" style={{ paddingTop: 'var(--cerk-9)', borderTop: 0 }}>
      <div className="page">
        {/* Hero */}
        <div style={{ marginBottom: 'var(--cerk-7)' }}>
          <ResponsiveImage
            media={program.cover}
            sizes="(max-width: 960px) 100vw, 920px"
            height={360}
            priority
          />
        </div>

        <motion.h1
          className="h-section"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.2, 0, 0, 1] }}
        >
          {program.title}
        </motion.h1>

        {/* Прогресс + панель пожертвования */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) minmax(280px, 360px)',
            gap: 'var(--cerk-8)',
            alignItems: 'start',
            margin: 'var(--cerk-7) 0 var(--cerk-10)',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--cerk-6)' }}>
            <ProgramProgress program={program} />
            <div className="history-article">
              {program.description.split('\n\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>
          <DonationPanel programTitle={program.title} />
        </div>

        {/* Как сейчас */}
        {program.gallery.length > 0 && (
          <div style={{ marginBottom: 'var(--cerk-10)' }}>
            <h2 className="history-h2">Как сейчас</h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                gap: 'var(--cerk-4)',
              }}
            >
              {program.gallery.map((m) => (
                <ResponsiveImage
                  key={m.id}
                  media={m}
                  sizes="(max-width: 720px) 50vw, 240px"
                  height={180}
                />
              ))}
            </div>
          </div>
        )}

        {/* Фотоотчёты */}
        {program.updates.length > 0 && (
          <div>
            <h2 className="history-h2">Фотоотчёты</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--cerk-8)' }}>
              {program.updates.map((u) => (
                <UpdateBlock key={u.id} update={u} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function UpdateBlock({ update }: { update: ProgramUpdate }) {
  return (
    <article
      style={{
        borderLeft: '3px solid var(--cerk-gold)',
        paddingLeft: 'var(--cerk-6)',
      }}
    >
      <div
        className="h-eyebrow"
        style={{ color: 'var(--cerk-text-helper)', marginBottom: 'var(--cerk-2)' }}
      >
        {formatDate(update.date)}
      </div>
      <h3 className="history-h3" style={{ marginTop: 0 }}>
        {update.title}
      </h3>
      <p style={{ color: 'var(--cerk-text-mute)', marginBottom: 'var(--cerk-4)' }}>{update.body}</p>
      {update.photos.length > 0 && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: 'var(--cerk-4)',
          }}
        >
          {update.photos.map((m) => (
            <ResponsiveImage
              key={m.id}
              media={m}
              sizes="(max-width: 720px) 50vw, 220px"
              height={170}
            />
          ))}
        </div>
      )}
    </article>
  );
}
