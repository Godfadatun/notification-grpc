/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-dynamic-require */
import axios from 'axios';
import { google } from 'googleapis';
import { FIREBASE_CONFIG_PATH, FIREBASE_PROJECT_ID } from './secrets';

const key = require(FIREBASE_CONFIG_PATH);

async function generateAccessToken() {
  const scope = ['https://www.googleapis.com/auth/firebase.messaging'];
  const jwtClient = new google.auth.JWT(key.client_email, FIREBASE_CONFIG_PATH, key.private_key, scope);
  const token = await jwtClient.authorize();
  return token.access_token;
}

export const sendPushNotification = async ({ token, body, title }: { token: string; body: string; title: string }): Promise<any> => {
  await axios.post(
    `https://fcm.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}/messages:send`,
    {
      message: {
        token,
        notification: {
          body,
          title,
        },
      },
    },
    { headers: { authorization: `Bearer ${await generateAccessToken()}` } },
  );
  return { success: true };
};
