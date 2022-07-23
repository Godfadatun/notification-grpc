import axios from 'axios';
import { DOJAH_APP_ID, DOJAH_BASE_URL, DOJAH_KEY } from '../utils/secrets';

interface ISmsMessage {
  body: string;
  to: string;
  otp?: string;
}

export async function dojahSMS(data: ISmsMessage): Promise<void> {
  return axios.post(
    `${DOJAH_BASE_URL}/api/v1/messaging/sms`,
    {
      sender_id: 'OurPass',
      destination: data.to.replace('+', ''),
      channel: 'sms',
      priority: true,
      message: data.body,
    },
    {
      headers: {
        Authorization: DOJAH_KEY,
        AppId: DOJAH_APP_ID,
      },
    },
  );
}

export async function dojahOTP(data: ISmsMessage): Promise<void> {
  return axios.post(
    `${DOJAH_BASE_URL}/api/v1/messaging/otp`,
    {
      otp: data.otp,
      channel: 'sms',
      priority: true,
      destination: data.to.replace('+', ''),
      sender_id: 'OurPass',
    },
    {
      headers: {
        Authorization: DOJAH_KEY,
        AppId: DOJAH_APP_ID,
      },
    },
  );
}
