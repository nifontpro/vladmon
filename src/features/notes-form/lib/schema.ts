import { z } from 'zod';

export const NOTE_KIND = ['health', 'repose'] as const;
export const NOTE_PERIOD = ['liturgy', 'sorokoust', 'month', 'half-year', 'year'] as const;

const russianNameRegex = /^[А-Яа-яЁё\s-]+$/u;

export const notesFormSchema = z.object({
  kind: z.enum(NOTE_KIND),
  period: z.enum(NOTE_PERIOD),
  names: z
    .array(
      z.object({
        value: z
          .string()
          .trim()
          .min(2, 'Имя слишком короткое')
          .max(48, 'Имя слишком длинное')
          .regex(russianNameRegex, 'Только русские буквы, пробелы и дефисы'),
      }),
    )
    .min(1, 'Укажите хотя бы одно имя')
    .max(20, 'Не более 20 имён в одной записке'),
  note: z.string().max(280, 'Не более 280 символов').optional(),
  email: z
    .string()
    .email('Некорректный адрес')
    .optional()
    .or(z.literal('')),
});

export type NotesFormValues = z.infer<typeof notesFormSchema>;
