import type { Program } from '@/entities/program/types';
import { rub } from '@/shared/lib/money';

type Props = {
  program: Program;
  donorsCount?: number;
};

export function ProgramProgress({ program, donorsCount }: Props) {
  const pct =
    program.goalKopecks > 0
      ? Math.min(100, Math.round((program.raisedKopecks / program.goalKopecks) * 100))
      : 0;

  return (
    <div className="cerk-progress">
      <div className="cerk-progress__head">
        <span className="cerk-progress__raised">{rub(program.raisedKopecks)}</span>
        <span className="cerk-progress__goal">из {rub(program.goalKopecks)}</span>
      </div>
      <div
        className="cerk-progress__track"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Собрано ${pct}%`}
      >
        <div className="cerk-progress__fill" style={{ width: `${pct}%` }} />
      </div>
      <div className="cerk-progress__meta">
        <span>{pct}% собрано</span>
        {typeof donorsCount === 'number' && <span>{donorsCount} жертвователей</span>}
      </div>
    </div>
  );
}
