import { z } from 'zod';

export const emailSchema = z.string({ message: 'Email is required' }).email({ message: "Invalid email format" });

export const sendEmailSchema = z.object({
  subject: z.string({ message: 'Subject is required' }).min(5),
  receiver: emailSchema,
  body: z.string({ message: 'Email body is required' }).min(10),
});