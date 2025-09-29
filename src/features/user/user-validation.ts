import { z } from 'zod';

export const userEditSchema = z.object({
  fullname: z
    .string()
    .min(1, 'Fullname is too small')
    .max(100, 'Fullname is too long'),
  bio: z
    .string()
    .min(1, 'Bio is too small')
    .max(200, 'Bio is too long')
    .nullable(),
});

export type UserEditSchema = z.infer<typeof userEditSchema>;
