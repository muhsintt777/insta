import { z } from 'zod';

export const commentFormSchema = z.object({
  comment: z
    .string()
    .min(1, 'Comment is too small')
    .max(100, 'Comment is too long'),
});

export type CommentFormSchema = z.infer<typeof commentFormSchema>;
