import { motion } from 'motion/react';
import { Link } from 'react-router';
import { MONASTERY } from '@/shared/config/meta';
import { ROUTES } from '@/shared/config/routes';
import { LinkButton, Rubric } from '@/shared/ui';
import { Icon } from '@/shared/icons/sprite';
import { OrnamentBand } from '@/widgets/ornament-band/ornament-band';
import { TodayCard } from '@/widgets/today-card/today-card';

const PROMO = [
  {
    to: ROUTES.history,
    icon: 'i-book' as const,
    title: 'История обители',
    body: 'Более трёх веков молитвы у источника Владимирской иконы — от старцев Иоанна и Тихона до наших дней.',
  },
  {
    to: ROUTES.schedule,
    icon: 'i-calendar' as const,
    title: 'Расписание богослужений',
    body: 'Литургии, всенощные и молебны на ближайшую неделю.',
  },
  {
    to: ROUTES.notes,
    icon: 'i-candle' as const,
    title: 'Записки и поминовение',
    body: 'Заказ записок о здравии и о упокоении на разные периоды.',
  },
];

export function HomePage() {
  return (
    <>
      <div className="page" style={{ paddingTop: 'var(--cerk-7)' }}>
        <OrnamentBand symbol="orn-knot-band" ariaLabel="Орнамент-плетёнка" />
      </div>

      <section className="section" style={{ paddingTop: 'var(--cerk-9)', borderTop: 0 }}>
        <div className="page">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr)',
              gap: 'var(--cerk-11)',
              alignItems: 'start',
            }}
            className="hero-grid"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.2, 0, 0, 1] }}
            >
              <div className="eyebrow-row">
                <Icon name="orn-icxc" size={32} aria-label="" />
                <span className="h-eyebrow">{MONASTERY.patron}</span>
              </div>
              <h1 className="h-display" style={{ marginTop: 'var(--cerk-4)' }}>
                <Rubric
                  style={{
                    fontFamily: 'var(--cerk-font-initial)',
                    fontSize: '1.15em',
                    lineHeight: 0.7,
                    paddingRight: '0.05em',
                  }}
                >
                  {MONASTERY.nameShort.charAt(0)}
                </Rubric>
                {MONASTERY.nameShort.slice(1)} —
                <br />
                <span style={{ color: 'var(--cerk-ink-00)' }}>обитель в облачении</span>
                <br />
                <span style={{ color: 'var(--cerk-ink-00)' }}>времени и молитвы.</span>
              </h1>

              <p className="lede" style={{ marginTop: 'var(--cerk-7)' }}>
                {MONASTERY.shortDescription}
              </p>

              <div
                style={{
                  display: 'flex',
                  gap: 'var(--cerk-4)',
                  marginTop: 'var(--cerk-8)',
                  flexWrap: 'wrap',
                }}
              >
                <LinkButton to={ROUTES.history} variant="primary" size="lg">
                  Узнать историю
                  <Icon name="i-arrow-r" size={16} className="icon" />
                </LinkButton>
                <LinkButton to={ROUTES.donate} variant="rubric" size="lg">
                  <Icon name="i-candle" size={16} />
                  Поддержать обитель
                </LinkButton>
                <LinkButton to={ROUTES.schedule} variant="secondary" size="lg">
                  Расписание служб
                </LinkButton>
              </div>

              <dl
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                  gap: 'var(--cerk-5)',
                  marginTop: 'var(--cerk-10)',
                  paddingTop: 'var(--cerk-6)',
                  borderTop: '1px solid var(--cerk-border)',
                  fontFamily: 'var(--cerk-font-body)',
                }}
              >
                <div>
                  <dt
                    style={{
                      fontSize: 'var(--cerk-t-01)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.18em',
                      color: 'var(--cerk-text-helper)',
                    }}
                  >
                    Основание
                  </dt>
                  <dd
                    style={{
                      margin: '6px 0 0',
                      fontFamily: 'var(--cerk-font-rubric)',
                      color: 'var(--cerk-rub)',
                      fontSize: 'var(--cerk-t-09)',
                      lineHeight: 1,
                    }}
                  >
                    {MONASTERY.founded}
                  </dd>
                </div>
                <div>
                  <dt
                    style={{
                      fontSize: 'var(--cerk-t-01)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.18em',
                      color: 'var(--cerk-text-helper)',
                    }}
                  >
                    Веков
                  </dt>
                  <dd
                    style={{
                      margin: '6px 0 0',
                      fontFamily: 'var(--cerk-font-rubric)',
                      color: 'var(--cerk-rub)',
                      fontSize: 'var(--cerk-t-09)',
                      lineHeight: 1,
                    }}
                  >
                    {Math.floor((new Date().getFullYear() - MONASTERY.founded) / 100)}
                  </dd>
                </div>
                <div>
                  <dt
                    style={{
                      fontSize: 'var(--cerk-t-01)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.18em',
                      color: 'var(--cerk-text-helper)',
                    }}
                  >
                    Святыня
                  </dt>
                  <dd
                    style={{
                      margin: '6px 0 0',
                      fontFamily: 'var(--cerk-font-rubric)',
                      color: 'var(--cerk-rub)',
                      fontSize: 'var(--cerk-t-05)',
                      lineHeight: 1.1,
                    }}
                  >
                    Владимирская
                  </dd>
                </div>
              </dl>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08, ease: [0.2, 0, 0, 1] }}
            >
              <TodayCard />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section">
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
                  I.
                </span>
                <span className="h-eyebrow">Куда зайти на сайт</span>
              </div>
              <h2 className="h-section">Три главных раздела</h2>
            </div>
            <p style={{ color: 'var(--cerk-text-mute)' }}>
              История, расписание и записки — центральные части жизни монастыря, отражённые здесь.
              Если ищете контакты или реквизиты — внизу есть подробная страница и они также есть в
              подвале.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 'var(--cerk-5)',
            }}
          >
            {PROMO.map((p, i) => (
              <motion.div
                key={p.to}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: i * 0.04, ease: [0.2, 0, 0, 1] }}
              >
                <Link
                  to={p.to}
                  style={{
                    display: 'block',
                    background: 'var(--cerk-paper-00)',
                    border: '1px solid var(--cerk-border)',
                    padding: 'var(--cerk-7)',
                    textDecoration: 'none',
                    color: 'inherit',
                    transition: 'border-color var(--cerk-dur-2) var(--cerk-ease), background var(--cerk-dur-2) var(--cerk-ease), transform var(--cerk-dur-1) var(--cerk-ease)',
                    height: '100%',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--cerk-border-strong)';
                    e.currentTarget.style.background = 'var(--cerk-paper-00)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--cerk-border)';
                  }}
                >
                  <div style={{ color: 'var(--cerk-rub)', marginBottom: 'var(--cerk-4)' }}>
                    <Icon name={p.icon} size={28} />
                  </div>
                  <h3
                    style={{
                      fontFamily: 'var(--cerk-font-rubric)',
                      fontSize: 'var(--cerk-t-06)',
                      color: 'var(--cerk-rub)',
                      marginBottom: 'var(--cerk-3)',
                    }}
                  >
                    {p.title}
                  </h3>
                  <p style={{ margin: 0, color: 'var(--cerk-text-mute)' }}>{p.body}</p>
                  <div
                    style={{
                      marginTop: 'var(--cerk-5)',
                      color: 'var(--cerk-accent)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      fontFamily: 'var(--cerk-font-ui)',
                      fontWeight: 500,
                    }}
                  >
                    Перейти
                    <Icon name="i-arrow-r" size={14} />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="page">
          <div
            style={{
              background: 'var(--cerk-paper-00)',
              border: '1px solid var(--cerk-border)',
              padding: 'var(--cerk-9)',
              display: 'flex',
              flexWrap: 'wrap',
              gap: 'var(--cerk-7)',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ flex: '1 1 340px' }}>
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
                <span className="h-eyebrow">Помощь обители</span>
              </div>
              <h2 className="h-section" style={{ marginBottom: 'var(--cerk-4)' }}>
                Ваше пожертвование хранит обитель
              </h2>
              <p style={{ margin: 0, color: 'var(--cerk-text-mute)', maxWidth: '52ch' }}>
                Содержание храмов, восстановление построек и дела милосердия совершаются на
                добровольные пожертвования. Поддержать монастырь можно онлайн или переводом по
                реквизитам.
              </p>
            </div>
            <div
              style={{
                display: 'flex',
                gap: 'var(--cerk-4)',
                flexWrap: 'wrap',
              }}
            >
              <LinkButton to={ROUTES.donate} variant="rubric" size="lg">
                <Icon name="i-candle" size={18} />
                Пожертвовать
              </LinkButton>
              <LinkButton to={ROUTES.programs} variant="secondary" size="lg">
                Целевые программы
              </LinkButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
