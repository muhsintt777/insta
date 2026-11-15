import { z } from 'zod';
import { POST_IMAGE_MAX_SIZE_BYTES } from './post-constants';

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
        (file.type.startsWith('image/') &&
          file.size <= POST_IMAGE_MAX_SIZE_BYTES),
      {
        message: 'Image must be less than 2MB and of image type',
      },
    ),
});

export const editPostFormSchema = z.object({
  caption: z
    .string()
    .min(2, 'Caption is too small')
    .max(200, 'Caption is too long'),
});

export type PostFormSchema = z.infer<typeof postFormSchema>;
export type EditPostFormSchema = z.infer<typeof editPostFormSchema>;
