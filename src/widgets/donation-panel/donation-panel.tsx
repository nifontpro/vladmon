import { useState } from 'react';
import { Button, Banner } from '@/shared/ui';
import { Icon } from '@/shared/icons/sprite';
import { rub } from '@/shared/lib/money';

const PRESETS_RUB = [300, 500, 1000, 3000];

type Props = {
  /** заголовок программы, если жертвуем на целевой сбор */
  programTitle?: string;
  /** оплата ещё не подключена (нет интеграции ЮKassa) — кнопка заблокирована */
  awaitingPayment?: boolean;
};

/**
 * Панель пожертвования: пресет-суммы, своя сумма, ежемесячный платёж,
 * покрытие комиссии донором. Пока без боевой оплаты — кнопка отключена
 * до интеграции ЮKassa (см. ТЗ, часть 4). Логика выбора суммы — рабочая.
 */
export function DonationPanel({ programTitle, awaitingPayment = true }: Props) {
  const [preset, setPreset] = useState<number | 'custom'>(500);
  const [custom, setCustom] = useState('');
  const [monthly, setMonthly] = useState(false);
  const [coverFee, setCoverFee] = useState(false);

  const amountRub = preset === 'custom' ? Number(custom) || 0 : preset;
  const valid = amountRub >= 10;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--cerk-5)',
        background: 'var(--cerk-paper-00)',
        border: '1px solid var(--cerk-border)',
        padding: 'var(--cerk-6)',
      }}
    >
      <div className="h-eyebrow">
        {programTitle ? `Помочь: ${programTitle}` : 'Пожертвование обители'}
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--cerk-3)' }}>
        {PRESETS_RUB.map((p) => (
          <Button
            key={p}
            variant={preset === p ? 'gold' : 'secondary'}
            size="md"
            onClick={() => setPreset(p)}
            aria-pressed={preset === p}
          >
            {rub(p * 100)}
          </Button>
        ))}
        <Button
          variant={preset === 'custom' ? 'gold' : 'secondary'}
          size="md"
          onClick={() => setPreset('custom')}
          aria-pressed={preset === 'custom'}
        >
          Своя сумма
        </Button>
      </div>

      {preset === 'custom' && (
        <input
          className="cerk-input"
          inputMode="numeric"
          placeholder="Сумма в рублях"
          value={custom}
          onChange={(e) => setCustom(e.target.value.replace(/[^\d]/g, ''))}
          aria-label="Сумма пожертвования в рублях"
        />
      )}

      <label className="cerk-check">
        <input type="checkbox" checked={monthly} onChange={(e) => setMonthly(e.target.checked)} />
        <span className="box">
          <Icon name="i-check" size={12} />
        </span>
        <span>Жертвовать каждый месяц</span>
      </label>

      <label className="cerk-check">
        <input type="checkbox" checked={coverFee} onChange={(e) => setCoverFee(e.target.checked)} />
        <span className="box">
          <Icon name="i-check" size={12} />
        </span>
        <span>Добавить комиссию, чтобы обитель получила всю сумму</span>
      </label>

      <Button
        variant="rubric"
        size="lg"
        disabled={awaitingPayment || !valid}
        aria-disabled={awaitingPayment || !valid}
      >
        <Icon name="i-candle" size={18} />
        {monthly ? `Жертвовать ${rub(amountRub * 100)} в месяц` : `Пожертвовать ${rub(amountRub * 100)}`}
      </Button>

      {awaitingPayment && (
        <Banner variant="lapis" title="Приём пожертвований скоро откроется">
          Это предварительный просмотр. Оплата через СБП и банковские карты включится после интеграции
          платёжного шлюза (ЮKassa).
        </Banner>
      )}
    </div>
  );
}
