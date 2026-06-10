import type { ServiceDay } from '@/entities/service/types';

const TYPE_LABEL: Record<string, string> = {
  liturgy: 'Литургия',
  vespers: 'Вечерня',
  matins: 'Утреня',
  molieben: 'Молебен',
};

type Props = {
  week: ReadonlyArray<ServiceDay>;
};

export function ScheduleTable({ week }: Props) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table className="cerk-table">
        <thead>
          <tr>
            <th style={{ width: 180 }}>День</th>
            <th style={{ width: 100 }}>Время</th>
            <th>Богослужение</th>
            <th style={{ width: 140 }}>Тип</th>
          </tr>
        </thead>
        <tbody>
          {week.flatMap((d) =>
            d.services.map((s, i) => (
              <tr key={`${d.day}-${i}`}>
                {i === 0 ? (
                  <td rowSpan={d.services.length}>
                    <span
                      style={{
                        fontFamily: 'var(--cerk-font-rubric)',
                        color: 'var(--cerk-rub)',
                        fontSize: 'var(--cerk-t-04)',
                        display: 'block',
                        lineHeight: 1.1,
                      }}
                    >
                      {d.day}
                    </span>
                    <span
                      style={{
                        color: 'var(--cerk-text-helper)',
                        fontSize: 'var(--cerk-t-02)',
                      }}
                    >
                      {d.date}
                    </span>
                  </td>
                ) : null}
                <td className="num">{s.time}</td>
                <td>{s.title}</td>
                <td style={{ color: 'var(--cerk-text-helper)' }}>{TYPE_LABEL[s.type] ?? '—'}</td>
              </tr>
            )),
          )}
        </tbody>
      </table>
    </div>
  );
}
