import { registerAs } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

export const smtpConfig = registerAs('smtp', () => {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT, 10) || 587;
  const secure = false;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;
  const fromName = process.env.SMTP_FROM_NAME;

  const transport = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
  });

  // TODO для просмотра в браузере
  // nodemailer.createTransport({
  //   host: 'localhost',
  //   port: 1025,
  //   ignoreTLS: true,
  //   secure: false,
  //   auth: {
  //     user,
  //     pass,
  //   }
  // })

  return {
    transport,
    fromName,
    fromEmail: user,
  };
});
