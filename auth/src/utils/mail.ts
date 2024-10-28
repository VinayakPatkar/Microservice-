import nodemailer from 'nodemailer';

import { HOST, MAIL_PASS, MAIL_PORT, MAIL_USER } from '../config';
class Mail {
  sendOptions: { from: string };
  client: any;
  constructor() {
    this.client = nodemailer.createTransport({
    secure: true,
    host: HOST,
    port: MAIL_PORT,
    auth: {
        user: MAIL_USER,
        pass: MAIL_PASS 
    }
  });
  this.sendOptions = {
  from: MAIL_USER
  }}
  async sendMail(mailOptions: any) {
    try {
        const response = await this.client.sendMail(mailOptions);
        return response;
    } catch (error) {
        console.error('Failed to send email: ', error);
        throw new Error('Email failed to send.');
    }
  }

  async send(data: any) {
    const mailOptions = {
      to: data.to,
      subject: data.subject,
      from : this.sendOptions.from,
      html: data.html
    }
    try {
      const response = await this.sendMail(mailOptions);
      return response;
      } catch (error) {
        console.error('Error in prepping email.', error);
          throw new Error('Error in prepping email.');
      }
  }
}

export default new Mail();
