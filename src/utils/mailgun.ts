/* eslint-disable import/no-extraneous-dependencies */
import FormData from 'form-data';
import inlineCss from 'inline-css';
import Mailgun from 'mailgun.js';
import moment from 'moment';
// eslint-disable-next-line import/no-extraneous-dependencies
import nodeMailer from 'nodemailer';
import { renderFile } from 'pug';
import { MAILGUN_KEY, MAILGUN_PASS, MAILGUN_USER } from './secrets';

const EMAIL_TEMPLATES_PATH = `${process.cwd()}/templates`;

export const transporter = nodeMailer.createTransport({
  host: 'smtp.mailgun.org',
  port: 465,
  secure: true,
  tls: { ciphers: 'SSLv3' },
  auth: { user: MAILGUN_USER, pass: MAILGUN_PASS },
});
const mailgum = new Mailgun(FormData);
const mailgumMsg = mailgum.client({ username: 'api', key: MAILGUN_KEY });

/**
 * A Function that return subject and template path.
 * @param purpose the mailing purpose.
 * @returns subject and template path.
 * @engineer Adebayo Opesanya(Created), Daniel Adegoke(Updated), Bardeson Lucky(Updated), Emmanuel Akinjole(Updated)
 */
export function getTemplateAndSubjectFromPurpose(purpose: string, templateInfo: { [key: string]: string }): { subject: string; template: string } {
  switch (purpose) {
    case 'order_received':
      return { subject: 'Your order has been received', template: `${EMAIL_TEMPLATES_PATH}/order_received.pug` };
    case 'payment_processed_successfully':
      return { subject: 'Your payment was successfully processed', template: `${EMAIL_TEMPLATES_PATH}/payment_processed_successfully.pug` };
    case 'vendor_account_created':
      return { subject: 'Vendor Account Created', template: `${EMAIL_TEMPLATES_PATH}/vendor.pug` };
    case 'account_email_activate':
      return { subject: 'Activate your Account', template: `${EMAIL_TEMPLATES_PATH}/activation.pug` };
    case 'welcome_user':
      return { subject: 'Welcome to OurPass', template: `${EMAIL_TEMPLATES_PATH}/welcome.pug` };
    case 'otp_validate':
      return { subject: 'OTP verification', template: `${EMAIL_TEMPLATES_PATH}/welcome.pug` };
    case 'invite_user':
      return { subject: 'Business Invite', template: `${EMAIL_TEMPLATES_PATH}/invite_user.pug` };
    case 'failed_bank_transfer':
      return { subject: 'Failed Bank Transfer, URGENT!!!', template: `${EMAIL_TEMPLATES_PATH}/failed_bank_transfer.pug` };
    case 'partial_user_initial_checkout':
      return {
        subject: `${templateInfo.firstName}, Congratulations on Checking out with OurPass!`,
        template: `${EMAIL_TEMPLATES_PATH}/partial_user_initial_checkout.pug`,
      };
    case 'qr_kit_request_vendor':
      return {
        subject: `QR Kit Request Received!`,
        template: `${EMAIL_TEMPLATES_PATH}/qr_kit_request_vendor.pug`,
      };
    case 'qr_kit_request_admin':
      return {
        subject: `New QR Kit request!`,
        template: `${EMAIL_TEMPLATES_PATH}/qr_kit_request_admin.pug`,
      };
    case 'shopper_email_on_signup':
      return {
        subject: `Shopper signup!`,
        template: `${EMAIL_TEMPLATES_PATH}/shopper_email_on_signup.pug`,
      };
    case 'ceo_email_after_signup':
      return {
        subject: `Welcome email by CEO!`,
        template: `${EMAIL_TEMPLATES_PATH}/ceo_email_after_signup.pug`,
      };
    case 'welcome_to_ourpass_email':
      return {
        subject: `Welcome email!`,
        template: `${EMAIL_TEMPLATES_PATH}/welcome_to_ourpass_email.pug`,
      };
    case 'accepting_payments_email':
      return {
        subject: `Accepting Payments with OurPass💰`,
        template: `${EMAIL_TEMPLATES_PATH}/accepting_payments_email.pug`,
      };
    case 'collecting_delivery_info':
      return {
        subject: `Accepting Payments with OurPass💰`,
        template: `${EMAIL_TEMPLATES_PATH}/collecting_delivery_info.pug`,
      };
    case 'email_on_signup':
      return {
        subject: `Welcome email!`,
        template: `${EMAIL_TEMPLATES_PATH}/email_on_signup.pug`,
      };
    case 'merchant_invite_team':
      return {
        subject: `Inviting your team`,
        template: `${EMAIL_TEMPLATES_PATH}/merchant_invite_team.pug`,
      };
    case 'merchant_know_your_customer':
      return {
        subject: `Easiest way to know your customer`,
        template: `${EMAIL_TEMPLATES_PATH}/merchant_know_your_customer.pug`,
      };
    case 'merchant_welcome_to_ourpass_email':
      return {
        subject: `Welcome to OurPass💰`,
        template: `${EMAIL_TEMPLATES_PATH}/merchant_welcome_to_ourpass_email.pug`,
      };
    case 'merchant_accepting_payments_email':
      return {
        subject: `Accepting Payments with OurPass💰`,
        template: `${EMAIL_TEMPLATES_PATH}/merchant_accepting_payments_email.pug`,
      };
    case 'merchant_collecting_delivery_info':
      return {
        subject: `Collecting Delivery Info`,
        template: `${EMAIL_TEMPLATES_PATH}/merchant_collecting_delivery_info.pug`,
      };
    case 'merchant_payment_link_QR_code':
      return {
        subject: `Receive money with Payment link and QR code`,
        template: `${EMAIL_TEMPLATES_PATH}/merchant_payment_link_QR_code.pug`,
      };
    case 'shopper_pay_bills':
      return {
        subject: `Pay Bills`,
        template: `${EMAIL_TEMPLATES_PATH}/shopper_pay_bills.pug`,
      };
    case 'shopper_fund_wallet':
      return {
        subject: `Fund your wallet!`,
        template: `${EMAIL_TEMPLATES_PATH}/shopper_fund_wallet.pug`,
      };
    case 'shopper_link_debit_card':
      return {
        subject: `Link your debit card`,
        template: `${EMAIL_TEMPLATES_PATH}/shopper_link_debit_card.pug`,
      };
    case 'shopper_send_request_money':
      return {
        subject: `Send request money`,
        template: `${EMAIL_TEMPLATES_PATH}/shopper_send_request_money.pug`,
      };
    case 'shopper_welcome_to_ourpass_email':
      return {
        subject: `Welcome to OurPass💰`,
        template: `${EMAIL_TEMPLATES_PATH}/shopper_welcome_to_ourpass_email.pug`,
      };
    case 'twitter_space_22_04':
      return {
        subject: `Learn & Grow with OurPass`,
        template: `${EMAIL_TEMPLATES_PATH}/twitter_space_22_04.pug`,
      };
    case 'twitter_space_19_05':
      return {
        subject: `Guarantee Sales for your Business`,
        template: `${EMAIL_TEMPLATES_PATH}/twitter_space_19_05.pug`,
      };
    default:
      throw new Error(`The template ${purpose} was not found`);
  }
}

const dateToUtc = (date: any, timeFrame: any): string => {
  const [value, type] = timeFrame.split(' ');
  date.add(value, type);
  const DATE_RFC2822 = 'ddd, DD MMM YYYY HH:mm:ss [GMT]';
  const utcDate = date.utc().format(DATE_RFC2822);
  return utcDate;
};

/**
 * A Function that send email.
 * @param payload an object that contains {recipientEmail: string;purpose: string;templateInfo: { [key: string]: string }}.
 * @returns a promise of any.
 * @engineer Adebayo Opesanya(Created), Daniel Adegoke(Updated), Bardeson Lucky(Updated), Emmanuel Akinjole(Updated), Taiwo Fayipe(Updated)
 */
export const sendEmail = async ({
  recipientEmail,
  purpose,
  templateInfo,
  mailProvider = 'nodeMailer',
  timeFrame,
}: {
  recipientEmail: string;
  purpose: string;
  templateInfo: { [key: string]: any };
  mailProvider?: string;
  timeFrame?: string;
}): Promise<any> => {
  try {
    const { template, subject } = getTemplateAndSubjectFromPurpose(purpose, templateInfo);
    if (mailProvider === 'nodeMailer') {
      return transporter.sendMail({
        to: recipientEmail,
        from: {
          name: templateInfo?.extra?.from?.name || 'OurPass',
          address: 'info@ourpass.co',
        },
        html: await inlineCss(renderFile(template, { ...templateInfo, _subject: subject }), {
          url: '/',
          removeStyleTags: false,
        }),
        subject,
      });
    }
    if (mailProvider === 'mailGun') {
      const activationDate = moment();
      const messageData = {
        from: 'info@ourpass.co',
        to: recipientEmail,
        subject,
        html: await inlineCss(renderFile(template, { ...templateInfo, _subject: subject }), {
          url: '/',
          removeStyleTags: false,
        }),
        'o:deliverytime': dateToUtc(activationDate, timeFrame),
      };

      const response = await mailgumMsg.messages.create('ourpass.co', messageData);
      return response;
    }
    return false;
  } catch (error: any) {
    throw new Error(error);
  }
};
