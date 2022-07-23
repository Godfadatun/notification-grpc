/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

export const sendObjectResponse = (message: string, data?: any): { success: boolean; message: string; data?: any } => {
  return {
    success: true,
    message,
    data,
  };
};

export const BadRequestException = (error: string, data?: any): { success: boolean; error: string; data?: any } => {
  return {
    success: false,
    error,
    data,
  };
};

export const FormatResponseFromBusinessService = (data: any): { success: boolean; error: string; data?: any } => {
  return { success: data.status, ...data, status: undefined };
};
