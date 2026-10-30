import * as z from 'zod/mini';
import { minLength } from 'zod/mini';

export const signInSchema = z.object({
  email: z.email('Informe um e-mail válido'),
  password: z.string().check(minLength(8, 'A senha deve ter no mínimo 8 caracteres')),
});

export type SignInSchema = z.infer<typeof signInSchema>;
