import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginValues } from '@/features/auth/lib/schema';
import { Button, Field, Input, Banner } from '@/shared/ui';

type Props = {
  /** Если true — кнопка submit disabled, отображается баннер «ожидает сервер». */
  awaitingBackend?: boolean;
};

export function LoginForm({ awaitingBackend = true }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
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
        <Banner variant="lapis" title="Вход скоро будет доступен">
          Авторизация подключится после развёртывания серверной части. Сейчас форма отображается
          для предварительного просмотра.
        </Banner>
      )}

      <Field label="Электронная почта" error={errors.email?.message}>
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

      <Field label="Пароль" error={errors.password?.message}>
        {(id, invalid) => (
          <Input
            id={id}
            type="password"
            autoComplete="current-password"
            aria-invalid={invalid}
            {...register('password')}
          />
        )}
      </Field>

      <Button type="submit" disabled={awaitingBackend || isSubmitting} aria-disabled={awaitingBackend}>
        Войти
      </Button>
    </form>
  );
}
