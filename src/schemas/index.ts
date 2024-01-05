import { z } from 'zod';

export const SignUpSchema = z.object({
  name: z.string().regex(/^[a-zA-Z0-9\s]+$/gm, {
    message: 'Allowed only lowercase, uppercase letters, numbers and spaces.',
  }),
  username: z
    .string()
    .max(10)
    .regex(/^[a-z_]+$/gm, {
      message: 'Allowed only lowercase letters and underscores.',
    }),
  email: z
    .string()
    .min(1, { message: 'This field has to be filled.' })
    .email({ message: 'Invalid email address.' }),
  password: z.string().min(6, { message: 'Minimum 6 characters.' }),
  repeatPassword: z.string(),
});

export const SignInSchema = z.object({
  signin: z.string(),
  password: z.string(),
});
