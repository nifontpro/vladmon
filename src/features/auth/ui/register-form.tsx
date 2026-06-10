import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, type RegisterValues } from '@/features/auth/lib/schema';
import { Button, Field, Input, Banner } from '@/shared/ui';
import { Icon } from '@/shared/icons/sprite';

type Props = {
  awaitingBackend?: boolean;
};

export function RegisterForm({ awaitingBackend = true }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { email: '', password: '', passwordConfirm: '', consent: false },
  });

  const onSubmit = handleSubmit(() => {
    /* Реальная отправка появится после подключения Kotlin-бэкенда. */
  });

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      style={{ display: 'flex', flexDirection: 'column', gap: 'var(--cerk-5)' }}
    >
      {awaitingBackend && (
        <Banner variant="lapis" title="Регистрация скоро будет доступна">
          Сейчас включена регистрация по электронной почте. После добавления серверной части
          подключим вход по SMS-коду.
        </Banner>
      )}

      <Field label="Электронная почта" required error={errors.email?.message}>
        {(id, invalid) => (
          <Input
            id={id}
            type="email"
            autoComplete="email"
            aria-invalid={invalid}
            placeholder="имя@example.ru"
            {...register('email')}
          />
        )}
      </Field>

      <Field label="Пароль" required error={errors.password?.message} helper="Не короче 8 символов">
        {(id, invalid) => (
          <Input
            id={id}
            type="password"
            autoComplete="new-password"
            aria-invalid={invalid}
            {...register('password')}
          />
        )}
      </Field>

      <Field label="Повторите пароль" required error={errors.passwordConfirm?.message}>
        {(id, invalid) => (
          <Input
            id={id}
            type="password"
            autoComplete="new-password"
            aria-invalid={invalid}
            {...register('passwordConfirm')}
          />
        )}
      </Field>

      <label className="cerk-check">
        <input type="checkbox" {...register('consent')} />
        <span className="box">
          <Icon name="i-check" size={14} />
        </span>
        <span>
          Согласен на обработку персональных данных.{' '}
          {errors.consent?.message && (
            <span style={{ color: 'var(--cerk-error)' }}>({errors.consent.message})</span>
          )}
        </span>
      </label>

      <Button
        type="submit"
        disabled={awaitingBackend || isSubmitting}
        aria-disabled={awaitingBackend}
      >
        Зарегистрироваться
      </Button>
    </form>
  );
}
