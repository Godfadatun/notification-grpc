export interface Response {
  success: boolean;
  message?: string;
  error?: any;
}

export interface tokenDetails {
  userMobile: string;
  fcmToken: string;
  deviceInfo: {
    deviceId: string;
  };
}
