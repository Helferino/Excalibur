import { z } from 'zod';

export type FileUploadResponse = z.infer<typeof fileUploadResponseSchema>

export const fileUploadResponseSchema = z.object({
  originalname: z.string(),
  filename: z.string(),
  location: z.string()
});