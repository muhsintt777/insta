import { z } from 'zod';
import { REGEX } from 'configs/constants';

export const userEditSchema = z.object({
  fullName: z
    .string()
    .trim()
    .regex(REGEX.name, 'Invalid fullname')
    .max(100, 'Fullname is too long'),
  bio: z.string().trim().max(200, 'Bio is too long'),
});

export type UserEditSchema = z.infer<typeof userEditSchema>;
