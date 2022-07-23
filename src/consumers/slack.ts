import { AMQP_CLIENT } from '../utils/secrets';
import { Consumer } from '../utils/Consumer';
import logger from '../utils/logger';
import { sendSlackMessage } from '../utils/slack';

interface ISlackMessage {
  body: any;
  feature: string;
}

export const slackConsumer = new Consumer(AMQP_CLIENT, 'slackQueue', async (msg) => {
  const channel = slackConsumer.getChannel();

  if (msg !== null) {
    try {
      const content = msg.content.toString();
      const { body, feature }: ISlackMessage = JSON.parse(content);

      await sendSlackMessage({ body, feature });
      channel.ack(msg);
    } catch (error) {
      channel.nack(msg);
      logger.info('Slack error', error);
    }
  }
});

slackConsumer.start();
