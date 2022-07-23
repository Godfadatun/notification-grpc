import axios from 'axios';
import { AMQP_CLIENT, TERMII_KEY } from '../utils/secrets';
import { Consumer } from '../utils/Consumer';
import logger from '../utils/logger';

interface ISmsMessage {
  body: string;
  to: string;
}

export const whatsAppConsumer = new Consumer(AMQP_CLIENT, 'whatsapp', async (msg) => {
  const channel = whatsAppConsumer.getChannel();

  if (msg !== null) {
    try {
      const content = msg.content.toString();
      const messageObject: ISmsMessage = JSON.parse(content);

      await axios.post('https://termii.com/api/sms/send', {
        to: messageObject.to.replace('+', ''),
        from: 'OurPass',
        sms: messageObject.body,
        type: 'plain',
        channel: 'whatsapp',
        api_key: TERMII_KEY,
      });
      channel.ack(msg);
    } catch (error: any) {
      channel.ack(msg);
      logger.info('WHATSAPP error', error.response.data);
    }
  }
});

whatsAppConsumer.start();
