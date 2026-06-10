import { motion } from 'motion/react';
import { PROGRAMS } from '@/entities/program/mock';
import { ProgramCard } from '@/widgets/program-card/program-card';
import { DonationPanel } from '@/widgets/donation-panel/donation-panel';

export function ProgramsPage() {
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
                VI.
              </span>
              <span className="h-eyebrow">Помощь обители</span>
            </div>
            <motion.h1
              className="h-section"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.2, 0, 0, 1] }}
            >
              Целевые программы и пожертвования
            </motion.h1>
          </div>
          <p style={{ color: 'var(--cerk-text-mute)' }}>
            Каждое пожертвование идёт на конкретное дело обители. Мы публикуем фотоотчёты на каждом
            этапе работ — вы видите, во что воплощается ваша помощь.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: 'var(--cerk-6)',
            marginBottom: 'var(--cerk-11)',
          }}
        >
          {PROGRAMS.map((program, i) => (
            <ProgramCard key={program.id} program={program} index={i} />
          ))}
        </div>

        <div style={{ maxWidth: 560 }}>
          <DonationPanel />
        </div>
      </div>
    </section>
  );
}
