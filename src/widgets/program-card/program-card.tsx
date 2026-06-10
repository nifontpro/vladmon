import { motion } from 'motion/react';
import { Link } from 'react-router';
import type { Program } from '@/entities/program/types';
import { PROGRAM_STATUS_LABEL } from '@/entities/program/types';
import { ResponsiveImage, Badge } from '@/shared/ui';
import { ProgramProgress } from '@/widgets/program-progress/program-progress';

type Props = {
  program: Program;
  index?: number;
};

export function ProgramCard({ program, index = 0 }: Props) {
  const to = `/programs/${program.slug}`;
  return (
    <motion.article
      className="cerk-program-card"
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, delay: (index % 6) * 0.05, ease: [0.2, 0, 0, 1] }}
    >
      <Link to={to} className="cerk-program-card__media" aria-label={program.title}>
        <ResponsiveImage
          media={program.cover}
          sizes="(max-width: 720px) 100vw, 360px"
          height={200}
        />
      </Link>
      <div className="cerk-program-card__body">
        <div style={{ display: 'flex', gap: 'var(--cerk-3)' }}>
          <Badge variant={program.status === 'active' ? 'emerald' : 'outline'}>
            {PROGRAM_STATUS_LABEL[program.status]}
          </Badge>
        </div>
        <h3
          style={{
            fontFamily: 'var(--cerk-font-rubric)',
            fontSize: 'var(--cerk-t-06)',
            lineHeight: 1.2,
            color: 'var(--cerk-text)',
            margin: 0,
          }}
        >
          <Link to={to} style={{ color: 'inherit', textDecoration: 'none' }}>
            {program.title}
          </Link>
        </h3>
        <p style={{ color: 'var(--cerk-text-mute)', fontSize: 'var(--cerk-t-03)', margin: 0 }}>
          {program.summary}
        </p>
        <div style={{ marginTop: 'auto' }}>
          <ProgramProgress program={program} />
        </div>
      </div>
    </motion.article>
  );
}
