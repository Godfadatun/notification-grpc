import axios from 'axios';
import { INFO_BIP_BASE_URL, INFO_BIP_KEY } from '../utils/secrets';

interface ISmsMessage {
  body: string;
  to: string;
}

export async function infoBipSMS(data: ISmsMessage): Promise<void> {
  return axios.post(
    `${INFO_BIP_BASE_URL}/sms/2/text/advanced`,
    {
      messages: [
        {
          from: 'OurPass',
          destinations: [
            {
              to: data.to.replace('+', ''),
            },
          ],
          text: data.body,
        },
      ],
    },
    {
      headers: {
        Authorization: `App ${INFO_BIP_KEY}`,
      },
    },
  );
}
