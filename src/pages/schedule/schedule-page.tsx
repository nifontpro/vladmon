import { useState } from 'react';
import { motion } from 'motion/react';
import { SCHEDULE_WEEK } from '@/shared/config/meta';
import { ScheduleTable } from '@/widgets/schedule-table/schedule-table';
import { Tabs, type TabItem, Banner } from '@/shared/ui';

type Range = 'week' | 'month';

const TABS: ReadonlyArray<TabItem<Range>> = [
  { value: 'week', label: 'Текущая неделя' },
  { value: 'month', label: 'Месяц' },
];

export function SchedulePage() {
  const [range, setRange] = useState<Range>('week');
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
                IV.
              </span>
              <span className="h-eyebrow">Богослужения</span>
            </div>
            <motion.h1
              className="h-section"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.2, 0, 0, 1] }}
            >
              Расписание служб
            </motion.h1>
          </div>
          <p style={{ color: 'var(--cerk-text-mute)' }}>
            Время богослужений уточняется накануне у дежурного по канцелярии. В дни праздников и
            постов служба может быть продолжительной.
          </p>
        </div>

        <div style={{ marginBottom: 'var(--cerk-6)' }}>
          <Tabs items={TABS} value={range} onChange={setRange} ariaLabel="Период расписания" />
        </div>

        {range === 'week' ? (
          <ScheduleTable week={SCHEDULE_WEEK} />
        ) : (
          <Banner variant="lapis" title="Календарь на месяц в работе">
            Помесячный календарь будет добавлен в одном из ближайших обновлений.
          </Banner>
        )}
      </div>
    </section>
  );
}
