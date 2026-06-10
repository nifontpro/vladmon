import { motion } from 'motion/react';
import { MONASTERY } from '@/shared/config/meta';
import { Icon } from '@/shared/icons/sprite';

const card = {
  background: 'var(--cerk-paper-00)',
  border: '1px solid var(--cerk-border)',
  padding: 'var(--cerk-7)',
  display: 'flex',
  flexDirection: 'column' as const,
  gap: 'var(--cerk-3)',
};

const eyebrow = {
  fontFamily: 'var(--cerk-font-ui)',
  fontSize: 'var(--cerk-t-02)',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.22em',
  color: 'var(--cerk-text-helper)',
  fontWeight: 600,
};

const value = {
  fontFamily: 'var(--cerk-font-rubric)',
  fontSize: 'var(--cerk-t-06)',
  color: 'var(--cerk-rub)',
  lineHeight: 1.1,
};

const note = {
  fontFamily: 'var(--cerk-font-body)',
  fontSize: 'var(--cerk-t-02)',
  color: 'var(--cerk-text-helper)',
};

export function ContactsPage() {
  const a = MONASTERY.address;
  const c = MONASTERY.contacts;
  const b = MONASTERY.bank;
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
              <span className="h-eyebrow">Контакты и реквизиты</span>
            </div>
            <motion.h1
              className="h-section"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.2, 0, 0, 1] }}
            >
              Как связаться с обителью
            </motion.h1>
          </div>
          <p style={{ color: 'var(--cerk-text-mute)' }}>
            Канцелярия работает ежедневно, кроме престольных праздников. Письма по почте принимаем
            постоянно.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 'var(--cerk-5)',
          }}
        >
          <div style={card}>
            <div style={{ color: 'var(--cerk-accent)' }}>
              <Icon name="i-calendar" size={22} />
            </div>
            <span style={eyebrow}>Адрес</span>
            <span style={value}>{a.city}</span>
            <span style={note}>
              {a.region} · {a.street} · {a.postcode}
            </span>
          </div>

          <div style={card}>
            <div style={{ color: 'var(--cerk-accent)' }}>
              <Icon name="i-bell" size={22} />
            </div>
            <span style={eyebrow}>Канцелярия</span>
            <a href={`tel:${c.phone.replace(/[^+\d]/g, '')}`} style={value}>
              {c.phone}
            </a>
            <span style={note}>{c.phoneNote}</span>
          </div>

          <div style={card}>
            <div style={{ color: 'var(--cerk-accent)' }}>
              <Icon name="i-info" size={22} />
            </div>
            <span style={eyebrow}>Электронная почта</span>
            <a href={`mailto:${c.email}`} style={value}>
              {c.email}
            </a>
            <span style={note}>{c.emailNote}</span>
          </div>

          <div style={card}>
            <div style={{ color: 'var(--cerk-accent)' }}>
              <Icon name="i-candle" size={22} />
            </div>
            <span style={eyebrow}>Записки и требы</span>
            <a href={`mailto:${c.bookings}`} style={value}>
              {c.bookings}
            </a>
            <span style={note}>{c.bookingsNote}</span>
          </div>
        </div>

        <article
          style={{
            background: 'var(--cerk-paper-00)',
            border: '1px solid var(--cerk-border)',
            padding: 'var(--cerk-7)',
            marginTop: 'var(--cerk-9)',
          }}
        >
          <div className="eyebrow-row">
            <span
              style={{
                fontFamily: 'var(--cerk-font-rubric)',
                fontSize: 'var(--cerk-t-06)',
                color: 'var(--cerk-rub)',
              }}
            >
              §
            </span>
            <span className="h-eyebrow">Реквизиты для пожертвований</span>
          </div>
          <dl
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(180px, 220px) 1fr',
              gap: 'var(--cerk-2) var(--cerk-5)',
              fontFamily: 'var(--cerk-font-body)',
              fontSize: 'var(--cerk-t-03)',
              margin: 0,
            }}
          >
            <dt style={{ color: 'var(--cerk-text-helper)' }}>Получатель</dt>
            <dd style={{ margin: 0 }}>{b.legalName}</dd>

            <dt style={{ color: 'var(--cerk-text-helper)' }}>ИНН</dt>
            <dd style={{ margin: 0, fontFamily: 'var(--cerk-font-mono)' }}>{b.inn}</dd>

            <dt style={{ color: 'var(--cerk-text-helper)' }}>КПП</dt>
            <dd style={{ margin: 0, fontFamily: 'var(--cerk-font-mono)' }}>{b.kpp}</dd>

            <dt style={{ color: 'var(--cerk-text-helper)' }}>ОГРН</dt>
            <dd style={{ margin: 0, fontFamily: 'var(--cerk-font-mono)' }}>{b.ogrn}</dd>

            <dt style={{ color: 'var(--cerk-text-helper)' }}>Расчётный счёт</dt>
            <dd style={{ margin: 0, fontFamily: 'var(--cerk-font-mono)' }}>{b.account}</dd>

            <dt style={{ color: 'var(--cerk-text-helper)' }}>Банк</dt>
            <dd style={{ margin: 0 }}>{b.bankName}</dd>

            <dt style={{ color: 'var(--cerk-text-helper)' }}>БИК</dt>
            <dd style={{ margin: 0, fontFamily: 'var(--cerk-font-mono)' }}>{b.bankBik}</dd>

            <dt style={{ color: 'var(--cerk-text-helper)' }}>Кор. счёт</dt>
            <dd style={{ margin: 0, fontFamily: 'var(--cerk-font-mono)' }}>{b.correspondentAccount}</dd>
          </dl>
        </article>
      </div>
    </section>
  );
}
