import { TODAY_TYPIKON } from '@/shared/config/meta';
import { Icon } from '@/shared/icons/sprite';
import { Rubric } from '@/shared/ui';

export function TodayCard() {
  return (
    <article
      style={{
        background: 'var(--cerk-paper-00)',
        border: '1px solid var(--cerk-border-strong)',
        padding: 'var(--cerk-6)',
        position: 'relative',
        fontFamily: 'var(--cerk-font-body)',
      }}
    >
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 'var(--cerk-4)',
          fontSize: 'var(--cerk-t-02)',
          color: 'var(--cerk-text-helper)',
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Icon name="i-calendar" size={16} />
          {TODAY_TYPIKON.date} · {TODAY_TYPIKON.weekday}
        </span>
        <Icon name="orn-lily" size={20} aria-label="" />
      </header>

      <h3
        style={{
          fontFamily: 'var(--cerk-font-rubric)',
          fontSize: 'var(--cerk-t-07)',
          lineHeight: 1.12,
          color: 'var(--cerk-ink-00)',
          marginBottom: 'var(--cerk-4)',
        }}
      >
        <Rubric
          style={{
            fontFamily: 'var(--cerk-font-initial)',
            fontSize: '1.6em',
            lineHeight: 0.6,
            verticalAlign: '-0.15em',
            marginRight: '0.06em',
          }}
        >
          {TODAY_TYPIKON.feast.charAt(0)}
        </Rubric>
        {TODAY_TYPIKON.feast.slice(1)}
      </h3>

      <p style={{ marginTop: 0, color: 'var(--cerk-text-mute)' }}>{TODAY_TYPIKON.rule}</p>

      <footer
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: 'var(--cerk-4)',
          borderTop: '1px solid var(--cerk-border)',
        }}
      >
        <span style={{ color: 'var(--cerk-text-helper)', fontSize: 'var(--cerk-t-02)' }}>
          Богослужения дня — на странице «Расписание»
        </span>
        <Icon name="orn-icxc" size={22} aria-label="IC XC NIKA" />
      </footer>
    </article>
  );
}
