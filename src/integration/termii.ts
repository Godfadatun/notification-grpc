import axios from 'axios';
import { TERMII_BASE_URL, TERMII_KEY } from '../utils/secrets';

interface ISmsMessage {
  body: string;
  to: string;
}

export async function termiiSMS(data: ISmsMessage): Promise<void> {
  return axios.post(`${TERMII_BASE_URL}/api/sms/send`, {
    to: data.to.replace('+', ''),
    // from: 'N-Alert',
    from: 'OurPass',
    sms: data.body,
    type: 'plain',
    // channel: 'dnd',
    channel: 'international',
    api_key: TERMII_KEY,
  });
}
