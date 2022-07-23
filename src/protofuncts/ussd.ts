import { handleUnaryCall } from '@grpc/grpc-js';
import { Response } from '../utils/interfaces';
import { ussdVerifyPhoneNumberDTO } from '../dtos/ussd';
import { ussdVerifyPhoneNumberCONTROLLER } from '../controllers/ussd';

/**
 * A function that process the ussdVerifyPhoneNumberFUNCT GRPC call.
 * @param call this contains the GRPC request of type {@linkcode ussdVerifyPhoneNumberDTO}.
 * @param callback this is a function that is call to return a response.
 * @method {@linkcode ussdVerifyPhoneNumberController} controller function that process the request.
 * @returns the result {@linkcode Response} of the executed callback
 * @engineer Emmanuel Akinjole(Created)
 */
export const ussdVerifyPhoneNumberFUNCT: handleUnaryCall<ussdVerifyPhoneNumberDTO, Response> = async (call, callback) => {
  try {
    const response = await ussdVerifyPhoneNumberCONTROLLER(call.request);
    return callback(null, response);
  } catch (error: any) {
    return callback(error);
  }
};
