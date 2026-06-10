import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().min(1, 'Введите электронную почту').email('Некорректный адрес'),
  password: z.string().min(8, 'Пароль не короче 8 символов'),
});

export const registerSchema = z
  .object({
    email: z.string().min(1, 'Введите электронную почту').email('Некорректный адрес'),
    password: z.string().min(8, 'Пароль не короче 8 символов'),
    passwordConfirm: z.string().min(8, 'Подтвердите пароль'),
    consent: z.boolean().refine((v) => v === true, { message: 'Требуется согласие' }),
  })
  .refine((d) => d.password === d.passwordConfirm, {
    path: ['passwordConfirm'],
    message: 'Пароли не совпадают',
  });

export type LoginValues = z.infer<typeof loginSchema>;
export type RegisterValues = z.infer<typeof registerSchema>;
