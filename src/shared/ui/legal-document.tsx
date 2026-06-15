import type { ReactNode } from 'react';
import { motion } from 'motion/react';

/**
 * Каркас юридического документа сайта (оферта, политика ПДн).
 * Держит единый стиль «Цѣркъ»: рубричная шапка, нумерованные разделы,
 * пункты договора. Текст наполняют страницы /offer и /privacy.
 */

const sectionStyle = {
  marginBottom: 'var(--cerk-9)',
};

const sectionTitleStyle = {
  fontFamily: 'var(--cerk-font-rubric)',
  fontSize: 'var(--cerk-t-06)',
  color: 'var(--cerk-rub)',
  lineHeight: 1.15,
  marginBottom: 'var(--cerk-4)',
};

const clauseListStyle = {
  listStyle: 'none' as const,
  padding: 0,
  margin: 0,
  display: 'flex',
  flexDirection: 'column' as const,
  gap: 'var(--cerk-3)',
};

const clauseStyle = {
  display: 'grid',
  gridTemplateColumns: 'minmax(2.5em, auto) 1fr',
  gap: 'var(--cerk-4)',
  fontFamily: 'var(--cerk-font-body)',
  fontSize: 'var(--cerk-t-03)',
  lineHeight: 1.6,
  color: 'var(--cerk-text-mute)',
};

const numStyle = {
  fontFamily: 'var(--cerk-font-mono)',
  color: 'var(--cerk-text-helper)',
  whiteSpace: 'nowrap' as const,
};

export function LegalDocument({
  numeral,
  eyebrow,
  title,
  intro,
  revision,
  children,
}: {
  /** Римская цифра-рубрика слева от eyebrow (как на других страницах). */
  numeral: string;
  eyebrow: string;
  title: string;
  intro?: ReactNode;
  /** Подпись о дате редакции внизу. */
  revision?: string;
  children: ReactNode;
}) {
  return (
    <section className="section" style={{ paddingTop: 'var(--cerk-11)', borderTop: 0 }}>
      <div className="page" style={{ maxWidth: 880 }}>
        <div className="eyebrow-row">
          <span
            style={{
              fontFamily: 'var(--cerk-font-rubric)',
              fontSize: 'var(--cerk-t-06)',
              color: 'var(--cerk-rub)',
            }}
          >
            {numeral}
          </span>
          <span className="h-eyebrow">{eyebrow}</span>
        </div>
        <motion.h1
          className="h-section"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.2, 0, 0, 1] }}
          style={{ marginBottom: 'var(--cerk-7)' }}
        >
          {title}
        </motion.h1>

        {intro ? (
          <div
            style={{
              fontFamily: 'var(--cerk-font-body)',
              fontSize: 'var(--cerk-t-04)',
              color: 'var(--cerk-text-mute)',
              lineHeight: 1.6,
              marginBottom: 'var(--cerk-9)',
              maxWidth: '64ch',
            }}
          >
            {intro}
          </div>
        ) : null}

        {children}

        {revision ? (
          <p
            style={{
              marginTop: 'var(--cerk-9)',
              paddingTop: 'var(--cerk-5)',
              borderTop: '1px solid var(--cerk-border)',
              color: 'var(--cerk-text-helper)',
              fontSize: 'var(--cerk-t-02)',
            }}
          >
            Редакция от {revision}
          </p>
        ) : null}
      </div>
    </section>
  );
}

export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div style={sectionStyle}>
      <h2 style={sectionTitleStyle}>{title}</h2>
      {children}
    </div>
  );
}

/** Нумерованный список пунктов договора (1.1, 1.2 …). */
export function Clauses({ items }: { items: Array<{ num: string; text: ReactNode }> }) {
  return (
    <ul style={clauseListStyle}>
      {items.map((c) => (
        <li key={c.num} style={clauseStyle}>
          <span style={numStyle}>{c.num}</span>
          <span>{c.text}</span>
        </li>
      ))}
    </ul>
  );
}
