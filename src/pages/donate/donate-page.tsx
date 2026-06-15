import { motion } from 'motion/react';
import { Link } from 'react-router';
import { DonationPanel } from '@/widgets/donation-panel/donation-panel';
import { MONASTERY, LEGAL } from '@/shared/config/meta';
import { ROUTES } from '@/shared/config/routes';
import { Icon, type IconName } from '@/shared/icons/sprite';

/**
 * Страница пожертвований — «витрина услуги» под требования модерации
 * интернет-эквайринга (ЮKassa): описание назначения платежа, выбор суммы,
 * явные ссылки на оферту и политику ПДн, реквизиты получателя как альтернатива.
 *
 * Сама оплата подключится после интеграции платёжного шлюза (см. ТЗ, часть 4):
 * до тех пор кнопка в DonationPanel заблокирована (awaitingPayment).
 */

const cardStyle = {
  background: 'var(--cerk-paper-00)',
  border: '1px solid var(--cerk-border)',
  padding: 'var(--cerk-6)',
  display: 'flex',
  flexDirection: 'column' as const,
  gap: 'var(--cerk-3)',
};

const PURPOSES: Array<{ icon: IconName; title: string; text: string }> = [
  {
    icon: 'i-candle',
    title: 'Богослужение и обитель',
    text: 'Содержание храмов, свечи, ладан, облачения, повседневные нужды братии и приём паломников.',
  },
  {
    icon: 'i-bell',
    title: 'Восстановление построек',
    text: 'Реставрация Владимирского собора и других зданий обители, поддержание святого источника.',
  },
  {
    icon: 'i-info',
    title: 'Дела милосердия',
    text: 'Благотворительная и просветительская деятельность, помощь нуждающимся прихожанам.',
  },
];

export function DonatePage() {
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
              <span className="h-eyebrow">Пожертвование</span>
            </div>
            <motion.h1
              className="h-section"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.2, 0, 0, 1] }}
            >
              Поддержать обитель
            </motion.h1>
          </div>
          <p style={{ color: 'var(--cerk-text-mute)' }}>
            Пожертвование — добровольный и безвозвратный дар на уставную деятельность обители.
            Жертвователь сам определяет сумму; взамен не передаётся никаких товаров или услуг. Каждое
            пожертвование идёт на богослужебную жизнь, восстановление храмов и дела милосердия.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 'var(--cerk-5)',
            marginBottom: 'var(--cerk-11)',
          }}
        >
          {PURPOSES.map((p) => (
            <div key={p.title} style={cardStyle}>
              <div style={{ color: 'var(--cerk-accent)' }}>
                <Icon name={p.icon} size={22} />
              </div>
              <span
                style={{
                  fontFamily: 'var(--cerk-font-rubric)',
                  fontSize: 'var(--cerk-t-05)',
                  color: 'var(--cerk-rub)',
                  lineHeight: 1.15,
                }}
              >
                {p.title}
              </span>
              <span
                style={{
                  fontFamily: 'var(--cerk-font-body)',
                  fontSize: 'var(--cerk-t-02)',
                  color: 'var(--cerk-text-mute)',
                  lineHeight: 1.55,
                }}
              >
                {p.text}
              </span>
            </div>
          ))}
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
            gap: 'var(--cerk-9)',
            alignItems: 'start',
          }}
          className="donate-grid"
        >
          <div>
            <DonationPanel />
            <p
              style={{
                marginTop: 'var(--cerk-4)',
                fontSize: 'var(--cerk-t-02)',
                color: 'var(--cerk-text-helper)',
                lineHeight: 1.55,
              }}
            >
              Нажимая «Пожертвовать», вы соглашаетесь с условиями{' '}
              <Link to={ROUTES.offer}>публичной оферты</Link> и{' '}
              <Link to={ROUTES.privacy}>политики обработки персональных данных</Link>.
            </p>
          </div>

          <article
            style={{
              background: 'var(--cerk-paper-00)',
              border: '1px solid var(--cerk-border)',
              padding: 'var(--cerk-7)',
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
              <span className="h-eyebrow">Перевод по реквизитам</span>
            </div>
            <p
              style={{
                fontSize: 'var(--cerk-t-02)',
                color: 'var(--cerk-text-mute)',
                marginBottom: 'var(--cerk-5)',
              }}
            >
              Если вам удобнее перевести пожертвование напрямую через банк, воспользуйтесь реквизитами
              получателя. В назначении платежа укажите: «{LEGAL.donationPurpose}».
            </p>
            <dl
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(150px, 200px) 1fr',
                gap: 'var(--cerk-2) var(--cerk-5)',
                fontFamily: 'var(--cerk-font-body)',
                fontSize: 'var(--cerk-t-02)',
                margin: 0,
              }}
            >
              <dt style={{ color: 'var(--cerk-text-helper)' }}>Получатель</dt>
              <dd style={{ margin: 0 }}>{b.legalName}</dd>

              <dt style={{ color: 'var(--cerk-text-helper)' }}>ИНН</dt>
              <dd style={{ margin: 0, fontFamily: 'var(--cerk-font-mono)' }}>{b.inn}</dd>

              <dt style={{ color: 'var(--cerk-text-helper)' }}>КПП</dt>
              <dd style={{ margin: 0, fontFamily: 'var(--cerk-font-mono)' }}>{b.kpp}</dd>

              <dt style={{ color: 'var(--cerk-text-helper)' }}>Расчётный счёт</dt>
              <dd style={{ margin: 0, fontFamily: 'var(--cerk-font-mono)' }}>{b.account}</dd>

              <dt style={{ color: 'var(--cerk-text-helper)' }}>Банк</dt>
              <dd style={{ margin: 0 }}>{b.bankName}</dd>

              <dt style={{ color: 'var(--cerk-text-helper)' }}>БИК</dt>
              <dd style={{ margin: 0, fontFamily: 'var(--cerk-font-mono)' }}>{b.bankBik}</dd>

              <dt style={{ color: 'var(--cerk-text-helper)' }}>Кор. счёт</dt>
              <dd style={{ margin: 0, fontFamily: 'var(--cerk-font-mono)' }}>
                {b.correspondentAccount}
              </dd>
            </dl>
          </article>
        </div>
      </div>
    </section>
  );
}
