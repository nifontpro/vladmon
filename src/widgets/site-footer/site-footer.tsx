import { Link } from 'react-router';
import { MONASTERY } from '@/shared/config/meta';
import { ROUTES } from '@/shared/config/routes';
import { Icon } from '@/shared/icons/sprite';

export function SiteFooter() {
  const c = MONASTERY.contacts;
  const b = MONASTERY.bank;
  const a = MONASTERY.address;
  return (
    <footer className="page-footer">
      <div className="page">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 'var(--cerk-9)',
            paddingBottom: 'var(--cerk-7)',
          }}
        >
          <div>
            <div
              className="h-eyebrow"
              style={{ display: 'block', marginBottom: 'var(--cerk-3)' }}
            >
              Обитель
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 8 }}>
              <Icon name="orn-cross-8" size={18} aria-label="" />
              <span
                style={{
                  fontFamily: 'var(--cerk-font-rubric)',
                  color: 'var(--cerk-rub)',
                  fontSize: 'var(--cerk-t-04)',
                }}
              >
                {MONASTERY.name}
              </span>
            </div>
            <p style={{ marginTop: 0, color: 'var(--cerk-text-helper)' }}>
              {a.street}, {a.city}
              <br />
              {a.region}, {a.postcode}
            </p>
          </div>

          <div>
            <div
              className="h-eyebrow"
              style={{ display: 'block', marginBottom: 'var(--cerk-3)' }}
            >
              Связь
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, lineHeight: 1.7 }}>
              <li>
                <a href={`tel:${c.phone.replace(/[^+\d]/g, '')}`}>{c.phone}</a>
                <div style={{ color: 'var(--cerk-text-helper)', fontSize: 'var(--cerk-t-01)' }}>
                  {c.phoneNote}
                </div>
              </li>
              <li style={{ marginTop: 'var(--cerk-3)' }}>
                <a href={`mailto:${c.email}`}>{c.email}</a>
                <div style={{ color: 'var(--cerk-text-helper)', fontSize: 'var(--cerk-t-01)' }}>
                  {c.emailNote}
                </div>
              </li>
              <li style={{ marginTop: 'var(--cerk-3)' }}>
                <a href={`mailto:${c.bookings}`}>{c.bookings}</a>
                <div style={{ color: 'var(--cerk-text-helper)', fontSize: 'var(--cerk-t-01)' }}>
                  {c.bookingsNote}
                </div>
              </li>
            </ul>
          </div>

          <div>
            <div
              className="h-eyebrow"
              style={{ display: 'block', marginBottom: 'var(--cerk-3)' }}
            >
              Реквизиты
            </div>
            <div style={{ fontSize: 'var(--cerk-t-02)', color: 'var(--cerk-text-mute)', lineHeight: 1.6 }}>
              {b.legalName}
              <br />
              ИНН {b.inn} · КПП {b.kpp}
              <br />
              ОГРН {b.ogrn}
            </div>
          </div>
        </div>

        <nav
          style={{
            borderTop: '1px solid var(--cerk-border)',
            paddingTop: 'var(--cerk-5)',
            paddingBottom: 'var(--cerk-4)',
            display: 'flex',
            gap: 'var(--cerk-6)',
            flexWrap: 'wrap',
            fontSize: 'var(--cerk-t-02)',
          }}
        >
          <Link to={ROUTES.donate}>Пожертвовать</Link>
          <Link to={ROUTES.archive}>Архив документов</Link>
          <Link to={ROUTES.offer}>Публичная оферта</Link>
          <Link to={ROUTES.privacy}>Политика обработки персональных данных</Link>
          <Link to={ROUTES.contacts}>Контакты и реквизиты</Link>
        </nav>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: 'var(--cerk-4)',
            flexWrap: 'wrap',
            color: 'var(--cerk-text-helper)',
            fontSize: 'var(--cerk-t-01)',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}
        >
          <span>
            © {new Date().getFullYear()} {MONASTERY.name}
          </span>
          <span>основана в {MONASTERY.founded} году</span>
        </div>
      </div>
    </footer>
  );
}
