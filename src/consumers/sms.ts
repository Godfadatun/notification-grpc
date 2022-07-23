import { AMQP_CLIENT, SMS_HANDLER } from '../utils/secrets';
import { Consumer } from '../utils/Consumer';
import logger from '../utils/logger';
import { dojahSMS } from '../integration/dojah';
import { infoBipSMS } from '../integration/infobip';
import { termiiSMS } from '../integration/termii';

interface ISmsMessage {
  body: string;
  to: string;
}

export const smsConsumer = new Consumer(AMQP_CLIENT, 'smsQueue', async (msg) => {
  const channel = smsConsumer.getChannel();

  if (msg !== null) {
    try {
      const content = msg.content.toString();
      const messageObject: ISmsMessage = JSON.parse(content);
      switch (SMS_HANDLER) {
        case 'dojah':
          await dojahSMS(messageObject);
          break;
        case 'infobip':
          await infoBipSMS(messageObject);
          break;
        case 'termii':
          await termiiSMS(messageObject);
          break;
        default:
          await termiiSMS(messageObject);
          break;
      }
      channel.ack(msg);
    } catch (error) {
      channel.ack(msg);
      logger.info('SMS error', error);
    }
  }
});

smsConsumer.start();
