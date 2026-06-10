import { motion } from 'motion/react';
import type { ReactNode } from 'react';

export type TimelineEvent = {
  year: string;
  title: string;
  body: ReactNode;
};

type Props = {
  events: ReadonlyArray<TimelineEvent>;
};

export function Timeline({ events }: Props) {
  return (
    <ol
      style={{
        listStyle: 'none',
        padding: 0,
        margin: 0,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--cerk-9)',
      }}
    >
      <span
        aria-hidden
        style={{
          position: 'absolute',
          left: 23,
          top: 0,
          bottom: 0,
          width: 1,
          background:
            'linear-gradient(180deg, transparent 0, var(--cerk-border-strong) 5%, var(--cerk-border-strong) 95%, transparent 100%)',
        }}
      />
      {events.map((e, i) => (
        <motion.li
          key={e.year + i}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4, delay: i * 0.04, ease: [0.2, 0, 0, 1] }}
          style={{
            display: 'grid',
            gridTemplateColumns: '48px 1fr',
            gap: 'var(--cerk-6)',
            position: 'relative',
          }}
        >
          <div
            aria-hidden
            style={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              background: 'var(--cerk-rub)',
              color: 'var(--cerk-paper-00)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--cerk-font-initial)',
              fontSize: 'var(--cerk-t-06)',
              border: '2px solid var(--cerk-rubric-deep)',
              boxShadow: 'var(--cerk-elevation-1)',
              zIndex: 1,
            }}
          >
            {e.year.slice(-2)}
          </div>
          <div style={{ paddingTop: 4 }}>
            <div
              className="h-eyebrow"
              style={{ color: 'var(--cerk-text-helper)', marginBottom: 4 }}
            >
              {e.year} год
            </div>
            <h3
              style={{
                fontFamily: 'var(--cerk-font-rubric)',
                color: 'var(--cerk-rub)',
                fontSize: 'var(--cerk-t-07)',
                lineHeight: 1.1,
                marginBottom: 'var(--cerk-3)',
              }}
            >
              {e.title}
            </h3>
            <div style={{ color: 'var(--cerk-text-mute)', maxWidth: '64ch' }}>{e.body}</div>
          </div>
        </motion.li>
      ))}
    </ol>
  );
}
