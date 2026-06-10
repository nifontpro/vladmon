import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'motion/react';
import { notesFormSchema, type NotesFormValues } from '@/features/notes-form/lib/schema';
import { NOTE_KIND_LABEL, NOTE_PERIOD_LABEL } from '@/entities/note/types';
import { Button, Field, Input, Textarea, Banner } from '@/shared/ui';
import { Icon } from '@/shared/icons/sprite';

type Props = {
  awaitingBackend?: boolean;
};

export function NotesForm({ awaitingBackend = true }: Props) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<NotesFormValues>({
    resolver: zodResolver(notesFormSchema),
    defaultValues: {
      kind: 'health',
      period: 'liturgy',
      names: [{ value: '' }],
      note: '',
      email: '',
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'names',
  });

  const onSubmit = handleSubmit(() => {
    /* Реальная отправка появится после подключения Kotlin-бэкенда. */
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const kind = watch('kind');

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      style={{ display: 'flex', flexDirection: 'column', gap: 'var(--cerk-7)' }}
    >
      {awaitingBackend && (
        <Banner variant="lapis" title="Запись на поминовение скоро будет доступна">
          Форма работает локально для предварительного просмотра. Реальная отправка записок включится
          после подключения серверной части.
        </Banner>
      )}

      <fieldset
        style={{
          border: 0,
          padding: 0,
          margin: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--cerk-4)',
        }}
      >
        <legend
          className="h-eyebrow"
          style={{ marginBottom: 'var(--cerk-3)', display: 'block', float: 'none' }}
        >
          Тип записки
        </legend>
        <div style={{ display: 'flex', gap: 'var(--cerk-5)', flexWrap: 'wrap' }}>
          {(['health', 'repose'] as const).map((k) => (
            <label key={k} className="cerk-check radio">
              <input type="radio" value={k} {...register('kind')} />
              <span className="box" />
              <span>{NOTE_KIND_LABEL[k]}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <Field label="Период поминовения" error={errors.period?.message}>
        {(id, invalid) => (
          <select id={id} aria-invalid={invalid} className="cerk-select" {...register('period')}>
            {(['liturgy', 'sorokoust', 'month', 'half-year', 'year'] as const).map((p) => (
              <option key={p} value={p}>
                {NOTE_PERIOD_LABEL[p]}
              </option>
            ))}
          </select>
        )}
      </Field>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--cerk-3)' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            marginBottom: 'var(--cerk-2)',
          }}
        >
          <span className="h-eyebrow">
            Имена ({kind === 'health' ? 'о здравии' : 'о упокоении'})
          </span>
          <span className="helper">Только русские буквы, без титулований</span>
        </div>

        <AnimatePresence initial={false}>
          {fields.map((f, index) => (
            <motion.div
              key={f.id}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18, ease: [0.2, 0, 0, 1] }}
              style={{ display: 'flex', gap: 'var(--cerk-3)', alignItems: 'flex-start' }}
            >
              <div style={{ flex: 1 }}>
                <Field error={errors.names?.[index]?.value?.message}>
                  {(id, invalid) => (
                    <Input
                      id={id}
                      placeholder={`Имя ${index + 1}`}
                      aria-invalid={invalid}
                      autoComplete="off"
                      {...register(`names.${index}.value` as const)}
                    />
                  )}
                </Field>
              </div>
              {fields.length > 1 && (
                <Button
                  variant="ghost"
                  size="md"
                  aria-label="Удалить имя"
                  onClick={() => remove(index)}
                  style={{ flexShrink: 0 }}
                >
                  <Icon name="i-x" size={16} />
                </Button>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        <Button
          variant="secondary"
          size="sm"
          onClick={() => append({ value: '' })}
          disabled={fields.length >= 20}
          style={{ alignSelf: 'flex-start' }}
        >
          <Icon name="i-plus" size={14} />
          Добавить имя
        </Button>
        {typeof errors.names?.message === 'string' && (
          <span className="error">{errors.names.message}</span>
        )}
      </div>

      <Field label="Примечание" helper="Не обязательно" error={errors.note?.message}>
        {(id, invalid) => (
          <Textarea id={id} aria-invalid={invalid} maxLength={280} {...register('note')} />
        )}
      </Field>

      <Field
        label="Электронная почта для подтверждения"
        helper="Не обязательно — пришлём подтверждение, если укажете"
        error={errors.email?.message}
      >
        {(id, invalid) => (
          <Input
            id={id}
            type="email"
            placeholder="имя@example.ru"
            aria-invalid={invalid}
            autoComplete="email"
            {...register('email')}
          />
        )}
      </Field>

      <Button
        type="submit"
        size="lg"
        disabled={awaitingBackend || isSubmitting}
        aria-disabled={awaitingBackend}
      >
        Заказать поминовение
      </Button>
    </form>
  );
}
