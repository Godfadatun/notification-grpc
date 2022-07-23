import axios from 'axios';
import { SLACK_TOKEN } from './secrets';

function getSlackDetailsByFeature(feature: string, body: any): any {
  const slackBlocks = [];

  switch (feature) {
    case 'bank_transfer':
      slackBlocks.push({
        type: 'section',
        text: {
          text: `A Bank Transfer error occurred. Details are: \n\n *Account name*: ${body.accountName} \n *Account number*: ${body.accountNumber} \n *Processor Response*: ${body.processorResponse}`,
          type: 'mrkdwn',
        },
        fields: [
          {
            type: 'mrkdwn',
            text: '*Bank Name*',
          },
          {
            type: 'plain_text',
            text: `${body.bankName}`,
          },
          {
            type: 'mrkdwn',
            text: '*Reference*',
          },
          {
            type: 'plain_text',
            text: `${body.reference}`,
          },
          {
            type: 'mrkdwn',
            text: '*Amount*',
          },
          {
            type: 'plain_text',
            text: `${body.amount}`,
          },
          {
            type: 'mrkdwn',
            text: '*User Mobile*',
          },
          {
            type: 'plain_text',
            text: `${body.userMobile}`,
          },
        ],
      });
      return {
        channel: 'failed_bank_transfer',
        blocks: slackBlocks,
      };
    default:
      throw new Error('slack channel not available');
  }
}

export const sendSlackMessage = async ({ body, feature }: { body: any; feature: string }): Promise<any> => {
  const { channel, blocks } = getSlackDetailsByFeature(feature, body);
  await axios.post(
    'https://slack.com/api/chat.postMessage',
    {
      channel,
      blocks,
    },
    { headers: { authorization: `Bearer ${SLACK_TOKEN}` } },
  );
  return { success: true };
};
