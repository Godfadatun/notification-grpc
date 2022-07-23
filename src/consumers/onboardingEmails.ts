/* eslint-disable no-duplicate-case */
/* eslint-disable no-case-declarations */
import { AMQP_CLIENT } from '../utils/secrets';
import { Consumer } from '../utils/Consumer';
import logger from '../utils/logger';
import { sendEmail } from '../utils/mailgun';
import onboardingTemplates from '../mock/onboardingTemplates.json';

interface IEmailMessage {
  purpose: string;
  recipientEmail: string;
  templateInfo: { [key: string]: string };
  mailProvider: string;
  emailType?: string;
  activationDate?: string;
}

export const onboardingEmailConsumer = new Consumer(AMQP_CLIENT, 'onboardingEmailQueue', async (msg) => {
  const channel = onboardingEmailConsumer.getChannel();
  if (msg !== null) {
    try {
      const content = msg.content.toString();
      const { recipientEmail, templateInfo, mailProvider, emailType }: IEmailMessage = JSON.parse(content);
      switch (emailType) {
        case 'shopper_after_signup':
          const shopperAfterSignup = onboardingTemplates.shopper_after_signup;
          // eslint-disable-next-line no-restricted-syntax
          for (const emailTemp of shopperAfterSignup) {
            // eslint-disable-next-line no-await-in-loop
            await sendEmail({
              recipientEmail,
              purpose: emailTemp.temp_name,
              templateInfo,
              mailProvider,
              timeFrame: emailTemp.time_frame,
            });
          }
          break;
        case 'shopper_after_fund_wallet':
          const shopperAfterFundWallet = onboardingTemplates.shopper_after_fund_wallet;
          // eslint-disable-next-line no-restricted-syntax
          for (const emailTemp of shopperAfterFundWallet) {
            // eslint-disable-next-line no-await-in-loop
            await sendEmail({
              recipientEmail,
              purpose: emailTemp.temp_name,
              templateInfo,
              mailProvider,
              timeFrame: emailTemp.time_frame,
            });
          }
          break;
        case 'merchant_after_signup':
          const merchantAfterSignup = onboardingTemplates.merchant_after_signup;
          // eslint-disable-next-line no-restricted-syntax
          for (const emailTemp of merchantAfterSignup) {
            // eslint-disable-next-line no-await-in-loop
            await sendEmail({
              recipientEmail,
              purpose: emailTemp.temp_name,
              templateInfo,
              mailProvider,
              timeFrame: emailTemp.time_frame,
            });
          }
          break;

        case 'merchant_after_kyc_completed':
          const merchantAfterKycCompleted = onboardingTemplates.merchant_after_kyc_completed;
          // eslint-disable-next-line no-restricted-syntax
          for (const emailTemp of merchantAfterKycCompleted) {
            // eslint-disable-next-line no-await-in-loop
            await sendEmail({
              recipientEmail,
              purpose: emailTemp.temp_name,
              templateInfo,
              mailProvider,
              timeFrame: emailTemp.time_frame,
            });
          }
          break;

        case 'merchant_after_first_sales':
          const merchantAfterFirstSales = onboardingTemplates.merchant_after_first_sales;
          // eslint-disable-next-line no-restricted-syntax
          for (const emailTemp of merchantAfterFirstSales) {
            // eslint-disable-next-line no-await-in-loop
            await sendEmail({
              recipientEmail,
              purpose: emailTemp.temp_name,
              templateInfo,
              mailProvider,
              timeFrame: emailTemp.time_frame,
            });
          }
          break;
        default:
          throw new Error(`The email type for onboarding was not found`);
      }
      channel.ack(msg);
    } catch (error) {
      channel.nack(msg, false, true);
      logger.info('Email error', error);
    }
  }
});

onboardingEmailConsumer.start();
