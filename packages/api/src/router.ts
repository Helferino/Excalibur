import * as grpc from '@grpc/grpc-js';
import express, { Request, Response } from 'express'
import { EmailRequest, EmailServiceClient } from 'common/protos/email';
import { sendEmailSchema } from 'common/src/validators';

const MAILER_URL = process.env.MAILER_URL || 'localhost:50051';

const router = express.Router();
const client = new EmailServiceClient(MAILER_URL, grpc.credentials.createInsecure());

router.post('/mail', (req: Request, res: Response) => {
  const { success, data, error } = sendEmailSchema.safeParse(req.body);
  if (!success) {
    return res.status(400).json({ error: error });
  }

  const emailRequest = new EmailRequest(data);

  client.SendEmail(emailRequest, (error, response) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json({ message: 'Email sent successfully' });
  });
});

export default router;
