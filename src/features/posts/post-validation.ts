import { z } from 'zod';

export const postFormSchema = z.object({
  caption: z
    .string()
    .min(2, 'Caption is too small')
    .max(200, 'Caption is too long'),
  image: z
    .instanceof(File)
    .refine(
      (file) =>
        !file ||
        (file.type.startsWith('image/') && file.size <= 2 * 1024 * 1024),
      {
        message: 'Image must be less than 2MB and of image type',
      },
    ),
});
export type PostFormSchema = z.infer<typeof postFormSchema>;
