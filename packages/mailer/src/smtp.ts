import nodemailer from 'nodemailer';
import ini from 'ini';
import fs from 'fs';
import path from 'path';

type SMTPConfig = {
  host: string;
  port: number;
  user: string;
  pass: string;
}

export const getConfig = (): SMTPConfig => {
  const configPath = path.resolve(__dirname, '../config.ini');
  const configFile = fs.readFileSync(configPath, 'utf-8');
  const config = ini.parse(configFile);
  return config.smtp;
}

const smtpConfig = getConfig();

const transporter = nodemailer.createTransport({
  host: smtpConfig.host,
  port: smtpConfig.port,
  auth: {
    user: smtpConfig.user,
    pass: smtpConfig.pass,
  },
});

export { smtpConfig, transporter };