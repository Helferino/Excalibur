import { z } from 'zod';
import { fileUploadResponseSchema } from './api';
import { emailSchema, sendEmailSchema } from 'common/validators';

export type EmailForm = z.infer<typeof emailFormSchema>;
export type Attachment = z.infer<typeof attachmentSchema>;

export const attachmentSchema = z.object({
  id: z.string(),
  file: z.instanceof(File),
  uploadResponse: fileUploadResponseSchema.optional()
});

export const emailFormSchema = z.object({
  ccs: z.array(emailSchema),
  attachments: z.array(attachmentSchema).max(5, { message: 'Maximum 5 attachments allowed' }),
}).merge(sendEmailSchema);