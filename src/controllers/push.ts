import joi from 'joi';
import { tokenDetails, Response } from '../utils/interfaces';
import { saveUserTokenData, modifyUserTokenData, getUserTokenFromDatabase } from '../database/repositories/notificationtokens';
import { sendEmail } from '../utils/mailgun';

export const storeUserFCMToken = async (tokenData: tokenDetails): Promise<Response> => {
  const { userMobile, fcmToken, deviceInfo } = tokenData;
  const schema = joi.object({
    userMobile: joi
      .string()
      .regex(/^234[789][01]\d{8}$/)
      .required(),
    fcmToken: joi.string().required(),
    deviceInfo: joi
      .object({
        deviceId: joi.string(),
      })
      .required(),
  });

  const validation = schema.validate(tokenData);
  if (validation.error) {
    return {
      success: false,
      error: validation.error.message,
    };
  }
  await saveUserTokenData({
    user_mobile: userMobile,
    fcm_token: fcmToken,
    device_info: deviceInfo,
  });
  return {
    success: true,
    message: 'Notification token saved successfully',
  };
};

export const updateUserFCMToken = async (tokenData: tokenDetails): Promise<Response> => {
  const { userMobile, fcmToken, deviceInfo } = tokenData;
  const schema = joi.object({
    userMobile: joi
      .string()
      .regex(/^234[789][01]\d{8}$/)
      .required(),
    fcmToken: joi.string().required(),
    deviceInfo: joi
      .object({
        deviceId: joi.string(),
      })
      .required(),
  });

  const validation = schema.validate(tokenData);
  if (validation.error) {
    return {
      success: false,
      error: validation.error.message,
    };
  }
  const token = await getUserTokenFromDatabase({ user_mobile: userMobile, device_info: deviceInfo });
  if (!token) {
    await saveUserTokenData({
      user_mobile: userMobile,
      fcm_token: fcmToken,
      device_info: deviceInfo,
    });
  } else {
    await modifyUserTokenData(
      { user_mobile: userMobile, device_info: deviceInfo },
      {
        fcm_token: fcmToken,
      },
    );
  }
  return {
    success: true,
    message: 'Notification token updated successfully',
  };
};

export const mailingCONTROLLER = async ({
  purpose,
  recipientEmail,
  templateInfo,
}: {
  purpose: string;
  recipientEmail: string;
  templateInfo: { [key: string]: string };
}): Promise<Response> => {
  sendEmail({
    recipientEmail,
    purpose,
    templateInfo,
  });
  return {
    success: true,
    message: 'Mail sent successfully',
  };
};
