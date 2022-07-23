import { createConnection } from 'typeorm';
import { AMQP_CLIENT } from '../utils/secrets';
import { Consumer } from '../utils/Consumer';
import logger from '../utils/logger';
import { sendPushNotification } from '../utils/firebase';
import { getUserTokenData } from '../database/repositories/notificationtokens';
import { findUser } from '../database/repositories/user';

interface IPushNotification {
  title?: string;
  body: string;
  userMobile: string;
}

let connectionExists = false;
createConnection()
  .then(() => {
    connectionExists = true;
    logger.info('Database connected');
  })
  .catch(async (err) => {
    logger.error(`Could not connect to database ${JSON.stringify(err)}`);
    process.exit(1);
  });

export const pushNotificationConsumer = new Consumer(AMQP_CLIENT, 'pushNotificationQueue', async (msg) => {
  const channel = pushNotificationConsumer.getChannel();

  if (msg !== null) {
    if (!connectionExists) {
      await createConnection();
    }
    try {
      const content = msg.content.toString();
      const { userMobile, title = 'Our Pass', body }: IPushNotification = JSON.parse(content);

      const user = await findUser({ phone_number: userMobile }, ['settings']);
      if (user?.settings.notificationsEnabled) {
        const tokenData = await getUserTokenData({ user_mobile: userMobile });
        if (tokenData.length) {
          tokenData.forEach((data: { fcm_token: any }) => sendPushNotification({ token: data.fcm_token, body, title }));
        }
        logger.info('push notification sent');
      }
      channel.ack(msg);
    } catch (error) {
      channel.ack(msg);
      logger.info('Push notification error', error);
    }
  }
});

pushNotificationConsumer.start();
