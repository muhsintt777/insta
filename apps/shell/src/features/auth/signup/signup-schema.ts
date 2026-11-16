import { z } from 'zod';

const signupFormSchemaBase = z.object({
  fullName: z
    .string()
    .trim()
    .min(3, 'Full name must be at least 3 characters')
    .max(50, 'Full name must not exceed 50 characters')
    .transform((val) => val.replace(/\s+/g, ' ')),
  username: z
    .string()
    .trim()
    .min(3, 'Username must be at least 3 characters')
    .max(50, 'Username must not exceed 50 characters')
    .refine((val) => !/\s/.test(val), 'Username must not contain spaces'),
  email: z.string().trim().email('Invalid email address'),
  password: z
    .string()
    .trim()
    .min(6, 'Password must be at least 6 characters')
    .max(100, 'Password must not exceed 100 characters')
    .refine((val) => !/\s/.test(val), 'Password must not contain spaces'),
  confirmPassword: z
    .string()
    .trim()
    .min(6, 'Confirm password must be at least 6 characters')
    .max(100, 'Confirm password must not exceed 100 characters'),
  profileImage: z
    .union([z.instanceof(File), z.null()])
    .refine(
      (file) => !file || file.size <= 5 * 1024 * 1024,
      'Profile image size must be less than 5MB',
    ),
});

export const signupFormSchema = signupFormSchemaBase.refine(
  (data) => data.password === data.confirmPassword,
  {
    message: 'Passwords do not match',
    path: ['confirmPassword'], // Target field for error
  },
);

export type SignupFormSchema = z.infer<typeof signupFormSchema>;
