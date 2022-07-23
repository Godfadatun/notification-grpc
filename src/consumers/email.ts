/* eslint-disable no-duplicate-case */
/* eslint-disable no-case-declarations */
import { AMQP_CLIENT } from '../utils/secrets';
import { Consumer } from '../utils/Consumer';
import logger from '../utils/logger';
import { sendEmail } from '../utils/mailgun';

interface IEmailMessage {
  purpose: string;
  recipientEmail: string;
  templateInfo: { [key: string]: string };
  mailProvider: string;
}

export const emailConsumer = new Consumer(AMQP_CLIENT, 'emailQueue', async (msg) => {
  const channel = emailConsumer.getChannel();
  if (msg !== null) {
    try {
      const content = msg.content.toString();
      const { recipientEmail, purpose, templateInfo, mailProvider }: IEmailMessage = JSON.parse(content);
      await sendEmail({ recipientEmail, purpose, templateInfo, mailProvider });
      channel.ack(msg);
    } catch (error) {
      channel.nack(msg, false, true);
      logger.info('Email error', error);
    }
  }
});

emailConsumer.start();
