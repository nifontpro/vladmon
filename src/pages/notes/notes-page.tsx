import { motion } from 'motion/react';
import { NotesForm } from '@/features/notes-form/ui/notes-form';

export function NotesPage() {
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
                V.
              </span>
              <span className="h-eyebrow">Поминовение</span>
            </div>
            <motion.h1
              className="h-section"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.2, 0, 0, 1] }}
            >
              Записки о здравии и упокоении
            </motion.h1>
          </div>
          <p style={{ color: 'var(--cerk-text-mute)' }}>
            Заказ поминовения в обители: одноразовое поминовение на Литургии, сорокоуст, годовое и
            продолжительные поминовения. Пожалуйста, указывайте имена в крещении.
          </p>
        </div>

        <div style={{ maxWidth: 640 }}>
          <NotesForm awaitingBackend />
        </div>
      </div>
    </section>
  );
}
