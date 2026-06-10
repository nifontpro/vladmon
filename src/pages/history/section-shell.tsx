import type { ReactNode } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router';
import { ROUTES, HISTORY_SECTIONS } from '@/shared/config/routes';
import { OrnamentBand } from '@/widgets/ornament-band/ornament-band';
import { LinkButton } from '@/shared/ui';
import { Icon } from '@/shared/icons/sprite';

type Props = {
  sectionKey:
    | 'historyFoundation'
    | 'historyHeyday'
    | 'historyPersecution'
    | 'historyRevival'
    | 'historyIcon';
  children: ReactNode;
};

export function HistorySectionShell({ sectionKey, children }: Props) {
  const section = HISTORY_SECTIONS.find((s) => s.key === sectionKey)!;
  const index = HISTORY_SECTIONS.findIndex((s) => s.key === sectionKey);
  const prev = index > 0 ? HISTORY_SECTIONS[index - 1] : null;
  const next = index < HISTORY_SECTIONS.length - 1 ? HISTORY_SECTIONS[index + 1] : null;

  return (
    <>
      <div className="page" style={{ paddingTop: 'var(--cerk-7)' }}>
        <OrnamentBand symbol="orn-hairline" ariaLabel="" />
      </div>

      <section className="section" style={{ paddingTop: 'var(--cerk-9)', borderTop: 0 }}>
        <div className="page" style={{ maxWidth: 920 }}>
          <nav
            aria-label="Хлебные крошки"
            style={{
              fontFamily: 'var(--cerk-font-ui)',
              fontSize: 'var(--cerk-t-02)',
              color: 'var(--cerk-text-helper)',
              marginBottom: 'var(--cerk-5)',
              display: 'flex',
              gap: 'var(--cerk-3)',
              alignItems: 'center',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
            }}
          >
            <Link
              to={ROUTES.history}
              style={{ color: 'var(--cerk-accent)', textDecoration: 'none' }}
            >
              История
            </Link>
            <span aria-hidden>·</span>
            <span>{section.period}</span>
          </nav>

          <div className="eyebrow-row">
            <span
              style={{
                fontFamily: 'var(--cerk-font-rubric)',
                fontSize: 'var(--cerk-t-06)',
                color: 'var(--cerk-rub)',
              }}
            >
              II.
            </span>
            <span className="h-eyebrow">{section.period}</span>
          </div>
          <motion.h1
            className="h-section"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.2, 0, 0, 1] }}
            style={{ marginBottom: 'var(--cerk-6)' }}
          >
            {section.title}
          </motion.h1>

          <p
            className="lede"
            style={{
              color: 'var(--cerk-text-mute)',
              maxWidth: '60ch',
              marginBottom: 'var(--cerk-10)',
            }}
          >
            {section.summary}
          </p>

          <article
            style={{
              background: 'var(--cerk-paper-00)',
              border: '1px solid var(--cerk-border)',
              padding: 'var(--cerk-9)',
              fontSize: 'var(--cerk-t-04)',
              lineHeight: 1.75,
              color: 'var(--cerk-ink-00)',
            }}
            className="history-article"
          >
            {children}
          </article>

          <nav
            aria-label="Между разделами истории"
            style={{
              marginTop: 'var(--cerk-10)',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 'var(--cerk-5)',
            }}
          >
            <div>
              {prev && (
                <LinkButton to={prev.to} variant="secondary" size="md">
                  <span style={{ display: 'inline-flex', transform: 'scaleX(-1)' }}>
                    <Icon name="i-arrow-r" size={14} className="icon" />
                  </span>
                  {prev.title}
                </LinkButton>
              )}
            </div>
            <div style={{ textAlign: 'right' }}>
              {next ? (
                <LinkButton to={next.to} variant="secondary" size="md">
                  {next.title}
                  <Icon name="i-arrow-r" size={14} className="icon" />
                </LinkButton>
              ) : (
                <LinkButton to={ROUTES.history} variant="secondary" size="md">
                  К обзору истории
                  <Icon name="i-arrow-r" size={14} className="icon" />
                </LinkButton>
              )}
            </div>
          </nav>
        </div>
      </section>
    </>
  );
}
