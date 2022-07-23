import { handleUnaryCall } from '@grpc/grpc-js';
import { mailingCONTROLLER, storeUserFCMToken, updateUserFCMToken } from '../controllers/push';
import { tokenDetails, Response } from '../utils/interfaces';

export const saveUserPushNotificationToken: handleUnaryCall<tokenDetails, Response> = async (call, callback) => {
  try {
    const response = await storeUserFCMToken(call.request);
    return callback(null, response);
  } catch (error: any) {
    return callback(error);
  }
};

export const updateUserPushNotifToken: handleUnaryCall<tokenDetails, Response> = async (call, callback) => {
  try {
    const response = await updateUserFCMToken(call.request);
    return callback(null, response);
  } catch (error: any) {
    return callback(error);
  }
};

export const mailingFUNCT: handleUnaryCall<
  {
    purpose: string;
    recipientEmail: string;
    templateInfo: { [key: string]: string };
  },
  Response
> = async (call, callback) => {
  try {
    const response = await mailingCONTROLLER(call.request);
    return callback(null, response);
  } catch (error: any) {
    return callback(error);
  }
};
