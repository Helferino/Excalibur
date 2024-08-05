import * as grpc from '@grpc/grpc-js';
import { smtpConfig, transporter } from './smtp';
import { EmailRequest, EmailResponse, EmailServiceClient } from 'common/protos/email';
import { renderTemplate } from './render';
import Mail from 'nodemailer/lib/mailer';

const PORT = process.env.PORT || 50051;

const SendEmail = (
  call: grpc.ServerUnaryCall<EmailRequest, EmailResponse>,
  callback: grpc.sendUnaryData<EmailResponse>
): void => {
  const { receiver, subject, body } = call.request;

  const email = { receiver, subject, body };
  const html = renderTemplate({ template: 'email', email });

  const mailOptions: Mail.Options = {
    from: smtpConfig.user,
    to: receiver,
    subject,
    html,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    const success = !error;
    const message = error ? error.message : info.response;
    callback(null, new EmailResponse({ success, message }));
  });
}

const server = new grpc.Server();

server.addService(EmailServiceClient.service, { SendEmail });
server.bindAsync(`0.0.0.0:${PORT}`, grpc.ServerCredentials.createInsecure(), () => {
  console.log(`gRPC server running on port ${PORT}`);
});
