import { z } from 'zod';

const USER_NAME_REGEX = /^[a-zA-Z]+(?: [a-zA-Z]+)*$/;

export const userEditSchema = z.object({
  fullName: z
    .string()
    .trim()
    .regex(USER_NAME_REGEX, 'Invalid fullname')
    .max(100, 'Fullname is too long'),
  bio: z.string().trim().max(200, 'Bio is too long'),
});

export type UserEditSchema = z.infer<typeof userEditSchema>;
