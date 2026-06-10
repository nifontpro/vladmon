import { motion } from 'motion/react';
import { Link } from 'react-router';
import { MONASTERY_TIMELINE, MONASTERY } from '@/shared/config/meta';
import { HISTORY_SECTIONS } from '@/shared/config/routes';
import { Timeline } from '@/widgets/timeline/timeline';
import { OrnamentBand } from '@/widgets/ornament-band/ornament-band';
import { Dropcap, Banner } from '@/shared/ui';
import { Icon } from '@/shared/icons/sprite';

export function HistoryPage() {
  return (
    <>
      <div className="page" style={{ paddingTop: 'var(--cerk-7)' }}>
        <OrnamentBand symbol="orn-hairline" ariaLabel="" />
      </div>

      <section className="section" style={{ paddingTop: 'var(--cerk-9)', borderTop: 0 }}>
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
                  II.
                </span>
                <span className="h-eyebrow">История обители</span>
              </div>
              <motion.h1
                className="h-section"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: [0.2, 0, 0, 1] }}
              >
                Три века у Владимирского источника
              </motion.h1>
            </div>
            <div>
              <Banner variant="gold" title="Основано на исторических источниках">
                Хронология опирается на дипломную работу А. В. Буяновой (2013) и юбилейные книги
                Большевьясского монастыря (Саранск, 2013 и 2016). Современные данные о братии и
                расписании уточняются у настоятеля.
              </Banner>
            </div>
          </div>

          <article
            style={{
              background: 'var(--cerk-paper-00)',
              border: '1px solid var(--cerk-border)',
              padding: 'var(--cerk-9) var(--cerk-9)',
              fontSize: 'var(--cerk-t-04)',
              lineHeight: 1.7,
              color: 'var(--cerk-ink-00)',
              marginBottom: 'var(--cerk-11)',
            }}
          >
            <p>
              <Dropcap>В</Dropcap> 1691 году двое благочестивых старцев — Иоанн и Тихон — пришли в
              непроходимый лес на правом берегу реки Вьяс и поставили над пробивавшимся из пригорка
              ключом принесённую с собой Владимирскую икону Божией Матери. Они срубили над
              источником деревянную часовню, а рядом — несколько келий. С этого события и ведёт
              начало {MONASTERY.name}.
            </p>
            <p>
              По челобитной владельца здешних земель графа Гавриила Ивановича Головкина 22 января
              1713 года Пётр I указом повелел соорудить на ключе церковь Живоносного Источника —
              этим годом часто датируют официальное учреждение обители. Расцвет наступил в
              середине XIX века при игумене Киприане (1851–1874): тщанием графини Софьи Борх,
              урождённой Лаваль, был выстроен каменный пятиглавый Владимирский собор. К началу XX
              века в монастыре действовали два соборных храма, четырёхъярусная колокольня и
              благоустроенная ярмарочная площадь.
            </p>
            <p style={{ marginBottom: 0 }}>
              После закрытия монастырей Пензенской губернии в 1918 году монашеская жизнь в обители
              ещё несколько лет теплилась благодаря архимандриту Геронтию (Титову), но в 1925 году
              пустынь была окончательно разогнана. Главную святыню — чудотворную Владимирскую
              икону — спасли верующие. Она восемьдесят лет хранилась в соседнем селе Лесной Вьяс,
              и 6 июля 2011 года крестным ходом вернулась на своё историческое место.
            </p>
          </article>

          <div
            style={{
              marginBottom: 'var(--cerk-11)',
            }}
          >
            <div className="eyebrow-row" style={{ marginBottom: 'var(--cerk-5)' }}>
              <span
                style={{
                  fontFamily: 'var(--cerk-font-rubric)',
                  fontSize: 'var(--cerk-t-06)',
                  color: 'var(--cerk-rub)',
                }}
              >
                §
              </span>
              <span className="h-eyebrow">Развернуть подробно</span>
            </div>
            <h2
              className="h-section"
              style={{ fontSize: 'var(--cerk-t-07)', marginBottom: 'var(--cerk-7)' }}
            >
              Пять глав истории
            </h2>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: 'var(--cerk-5)',
              }}
            >
              {HISTORY_SECTIONS.map((s, i) => (
                <motion.div
                  key={s.key}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.4, delay: i * 0.04, ease: [0.2, 0, 0, 1] }}
                >
                  <Link
                    to={s.to}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 'var(--cerk-3)',
                      background: 'var(--cerk-paper-00)',
                      border: '1px solid var(--cerk-border)',
                      padding: 'var(--cerk-7)',
                      textDecoration: 'none',
                      color: 'inherit',
                      height: '100%',
                      transition:
                        'border-color var(--cerk-dur-2) var(--cerk-ease), background var(--cerk-dur-2) var(--cerk-ease)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--cerk-border-strong)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--cerk-border)';
                    }}
                  >
                    <div
                      style={{
                        fontFamily: 'var(--cerk-font-ui)',
                        fontSize: 'var(--cerk-t-01)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.22em',
                        color: 'var(--cerk-text-helper)',
                      }}
                    >
                      Глава {i + 1} · {s.period}
                    </div>
                    <h3
                      style={{
                        fontFamily: 'var(--cerk-font-rubric)',
                        fontSize: 'var(--cerk-t-06)',
                        color: 'var(--cerk-rub)',
                        lineHeight: 1.15,
                        margin: 0,
                      }}
                    >
                      {s.title}
                    </h3>
                    <p
                      style={{
                        margin: 0,
                        color: 'var(--cerk-text-mute)',
                        fontSize: 'var(--cerk-t-03)',
                        lineHeight: 1.6,
                      }}
                    >
                      {s.summary}
                    </p>
                    <div
                      style={{
                        marginTop: 'auto',
                        paddingTop: 'var(--cerk-4)',
                        color: 'var(--cerk-accent)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 6,
                        fontFamily: 'var(--cerk-font-ui)',
                        fontWeight: 500,
                      }}
                    >
                      Читать дальше
                      <Icon name="i-arrow-r" size={14} />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="page" style={{ maxWidth: 880 }}>
          <div className="eyebrow-row" style={{ marginBottom: 'var(--cerk-6)' }}>
            <span
              style={{
                fontFamily: 'var(--cerk-font-rubric)',
                fontSize: 'var(--cerk-t-06)',
                color: 'var(--cerk-rub)',
              }}
            >
              ‡
            </span>
            <span className="h-eyebrow">Хронология</span>
          </div>
          <Timeline events={MONASTERY_TIMELINE} />
        </div>
      </section>
    </>
  );
}
