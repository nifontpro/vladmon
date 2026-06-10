import { Link } from 'react-router';
import { ROUTES } from '@/shared/config/routes';
import { Rubric } from '@/shared/ui';

export function NotFoundPage() {
  return (
    <section className="section" style={{ borderTop: 0, paddingTop: 'var(--cerk-13)' }}>
      <div className="page" style={{ textAlign: 'center' }}>
        <div
          style={{
            fontFamily: 'var(--cerk-font-initial)',
            fontSize: 'var(--cerk-t-13)',
            color: 'var(--cerk-rub)',
            lineHeight: 1,
          }}
        >
          404
        </div>
        <h1 className="h-section" style={{ marginTop: 'var(--cerk-6)' }}>
          Страница не обретена
        </h1>
        <p style={{ marginTop: 'var(--cerk-4)', color: 'var(--cerk-text-mute)', marginInline: 'auto' }}>
          Возможно, ссылка устарела или была введена неверно.
        </p>
        <p style={{ marginTop: 'var(--cerk-6)' }}>
          <Link to={ROUTES.home}>
            <Rubric>Вернуться</Rubric> на главную
          </Link>
        </p>
      </div>
    </section>
  );
}
