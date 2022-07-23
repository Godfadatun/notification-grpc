/* eslint-disable import/first */
import dotenv from 'dotenv';
import * as grpc from '@grpc/grpc-js';
import { loadSync } from '@grpc/proto-loader';
import { createConnection } from 'typeorm';
import { saveUserPushNotificationToken, updateUserPushNotifToken, mailingFUNCT } from './protofuncts/push';

dotenv.config();

import logger from './utils/logger';
import { PROTO_LOCATION, SERVICE_IP, SERVICE_PORT } from './utils/secrets';
import { ussdVerifyPhoneNumberFUNCT } from './protofuncts/ussd';

const packageDefinition = loadSync(`${PROTO_LOCATION}/notifications.proto`, { defaults: false });
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const pkg = grpc.loadPackageDefinition(packageDefinition).notifications as any;

function startServer(): void {
  createConnection()
    .then(() => logger.info('Database connected'))
    .catch((err) => {
      logger.error('Database connection failed');
      logger.error(JSON.stringify(err));
      process.exit(1);
    });

  const server = new grpc.Server();
  server.addService(pkg.Notifications.service, {
    saveUserPushNotificationToken,
    updateUserPushNotifToken,
    mailingFUNCT,
    ussdVerifyPhoneNumberFUNCT,
  });
  server.bindAsync(`0.0.0.0:50005`, grpc.ServerCredentials.createInsecure(), () => {
    server.start();
    logger.info(`Service started successfully on ${SERVICE_IP}:${SERVICE_PORT}`);
  });
}

startServer();
