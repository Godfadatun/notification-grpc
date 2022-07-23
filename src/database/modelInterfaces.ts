export interface INotificationTokens {
  id: number;
  user_mobile: string;
  device_info: { deviceId: string };
  fcm_token: string;
  created_at: Date;
  updated_at: Date;
}

export interface IUser {
  id: number;
  email: string;
  phone_number: string;
  settings: {
    notificationsEnabled: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
}
