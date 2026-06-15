import { useState } from 'react';
import { NavLink, Link } from 'react-router';
import { motion } from 'motion/react';
import { NAV_ITEMS, ROUTES } from '@/shared/config/routes';
import { MONASTERY } from '@/shared/config/meta';
import { Icon } from '@/shared/icons/sprite';
import { Button, LinkButton } from '@/shared/ui';
import { cn } from '@/shared/lib/cn';

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="page-header">
      <div className="page">
        <nav
          aria-label="Главная навигация"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'var(--cerk-6)',
          }}
        >
          <Link
            to={ROUTES.home}
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: 'var(--cerk-3)',
              fontFamily: 'var(--cerk-font-rubric)',
              fontSize: 'var(--cerk-t-06)',
              color: 'var(--cerk-rub)',
              letterSpacing: '0.02em',
              textDecoration: 'none',
            }}
          >
            <span
              style={{
                width: 28,
                height: 28,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--cerk-rub)',
              }}
            >
              <Icon name="orn-cross-8" size={26} />
            </span>
            <span>{MONASTERY.nameShort}</span>
            <span
              style={{
                fontFamily: 'var(--cerk-font-body)',
                fontSize: 'var(--cerk-t-01)',
                letterSpacing: '0.15em',
                color: 'var(--cerk-text-helper)',
                textTransform: 'uppercase',
                paddingLeft: 'var(--cerk-3)',
                borderLeft: '1px solid var(--cerk-border)',
                marginLeft: 'var(--cerk-3)',
                position: 'relative',
                top: -2,
              }}
              className="hidden md:inline"
            >
              монастырь · обитель
            </span>
          </Link>

          <ul
            className="hidden lg:flex"
            style={{
              listStyle: 'none',
              gap: 'var(--cerk-5)',
              margin: 0,
              padding: 0,
              flexWrap: 'nowrap',
            }}
          >
            {NAV_ITEMS.map((item) => (
              <li key={item.key}>
                <NavLink
                  to={item.to}
                  end={item.key === 'home'}
                  className={({ isActive }) => cn('nav-item', isActive && 'is-active')}
                  style={{
                    color: 'var(--cerk-text-mute)',
                    textDecoration: 'none',
                    fontSize: 'var(--cerk-t-03)',
                    fontFamily: 'var(--cerk-font-ui)',
                    fontWeight: 500,
                    position: 'relative',
                    padding: 'var(--cerk-3) 0',
                    display: 'inline-block',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {({ isActive }) => (
                    <>
                      <span style={{ color: isActive ? 'var(--cerk-rub)' : undefined }}>
                        {item.label}
                      </span>
                      {isActive && (
                        <motion.span
                          layoutId="nav-underline"
                          style={{
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            bottom: 0,
                            height: 2,
                            background: 'var(--cerk-rub)',
                          }}
                          transition={{ duration: 0.28, ease: [0.2, 0, 0, 1] }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          <div style={{ display: 'flex', gap: 'var(--cerk-3)', alignItems: 'center' }}>
            <LinkButton
              to={ROUTES.donate}
              variant="rubric"
              size="sm"
              className="hidden md:inline-flex"
            >
              <Icon name="i-candle" size={16} />
              Пожертвовать
            </LinkButton>
            <Button
              variant="ghost"
              size="sm"
              aria-label="Поиск"
              disabled
              aria-disabled
              title="Поиск появится позже"
              className="hidden md:inline-flex"
            >
              <Icon name="i-search" size={16} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              aria-label="Открыть меню"
              className="lg:hidden"
              onClick={() => setMenuOpen((v) => !v)}
            >
              <Icon name="i-menu" size={18} />
            </Button>
          </div>
        </nav>

        {menuOpen && (
          <motion.ul
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: [0.2, 0, 0, 1] }}
            style={{
              listStyle: 'none',
              padding: 'var(--cerk-4) 0 0',
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--cerk-2)',
            }}
            className="lg:hidden"
          >
            {NAV_ITEMS.map((item) => (
              <li key={item.key}>
                <NavLink
                  to={item.to}
                  end={item.key === 'home'}
                  onClick={() => setMenuOpen(false)}
                  style={({ isActive }) => ({
                    display: 'block',
                    padding: 'var(--cerk-3) 0',
                    fontFamily: isActive ? 'var(--cerk-font-rubric)' : 'var(--cerk-font-ui)',
                    color: isActive ? 'var(--cerk-rub)' : 'var(--cerk-text-mute)',
                    textDecoration: 'none',
                    borderLeft: isActive ? '2px solid var(--cerk-rub)' : '2px solid transparent',
                    paddingLeft: 'var(--cerk-4)',
                  })}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
            <li style={{ marginTop: 'var(--cerk-3)', paddingLeft: 'var(--cerk-4)' }}>
              <LinkButton
                to={ROUTES.donate}
                variant="rubric"
                size="md"
                onClick={() => setMenuOpen(false)}
              >
                <Icon name="i-candle" size={16} />
                Пожертвовать
              </LinkButton>
            </li>
          </motion.ul>
        )}
      </div>
    </header>
  );
}
