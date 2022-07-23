import { AMQP_CLIENT } from '../utils/secrets';
import { Consumer } from '../utils/Consumer';
import logger from '../utils/logger';
import { dojahOTP } from '../integration/dojah';

interface IOTPMessage {
  body: string;
  to: string;
  otp?: string;
}

export const otpConsumer = new Consumer(AMQP_CLIENT, 'otpQueue', async (msg) => {
  const channel = otpConsumer.getChannel();

  if (msg !== null) {
    try {
      const content = msg.content.toString();
      const messageObject: IOTPMessage = JSON.parse(content);
      await dojahOTP(messageObject);
      channel.ack(msg);
    } catch (error) {
      channel.ack(msg);
      logger.info('SMS error', error);
    }
  }
});

otpConsumer.start();
