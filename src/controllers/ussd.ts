import joi from 'joi';
import { ussdVerifyPhoneNumberDTO } from '../dtos/ussd';
import { sendObjectResponse, BadRequestException, FormatResponseFromBusinessService } from '../utils/helpers';
import { Response } from '../utils/interfaces';
import logger from '../utils/logger';
import { usersRPC, businessRPC } from '../utils/serviceClients';
import { ussdVerifyPhoneNumbeSCHEMA } from '../schemas/ussd';

/**
 * A function that verify phone number with ussd.
 * @param payload this is an object of type {@linkcode ussdVerifyPhoneNumberDTO}.
 * @validorSchema {@linkcode createPaymentPageSCHEMA} for validation payload
 * @grpcCall ``usersRPC.findUserFUNCT`` a service call that return one user record.
 * @grpcCall ``usersRPC.verifyPhoneOTPFUNCT`` a service call verify phone of a user.
 * @grpcCall ``businessRPC.verifyPhoneOTPFUNCT`` a service call verify phone of a business owner .
 * @method {@linkcode FormatResponseFromBusinessService}  format the response.
 * @method {@linkcode sendObjectResponse} send a success response .
 * @method {@linkcode BadRequestException} send an error response .
 * @returns the response of type {@linkcode ControllerResponse}
 * @engineer Emmanuel Akinjole(Created)
 */
export const ussdVerifyPhoneNumberCONTROLLER = async (payload: ussdVerifyPhoneNumberDTO): Promise<Response> => {
  try {
    const { phoneNumber } = payload;
    const schema = joi.object(ussdVerifyPhoneNumbeSCHEMA);
    const validation = schema.validate({ phoneNumber });
    if (validation.error) return BadRequestException(validation.error.message);
    // GET USER BY PHONE NUMBER
    const result = FormatResponseFromBusinessService(
      await usersRPC.findUserFUNCT({
        userMobile: phoneNumber.replace('+', ''),
      }),
    );
    if (!result || !result.success) return BadRequestException(`Create an account on OurPass to verify phone number using USSD`);
    if (!result.data.verified) return BadRequestException('Verify your email address to proceed');
    if (result.data.verifiedPhoneNumber) return BadRequestException('Phone number already verified');
    // BUSINESS VERIFICATION
    if (result.data.isMerchant) {
      const verificationResponse = FormatResponseFromBusinessService(
        await businessRPC.verifyPhoneOTPFUNCT({
          userId: result.data.id,
          phoneToken: `OURPASS_${result.data.phoneNumber}`,
        }),
      );

      if (!verificationResponse.success) {
        logger.error(verificationResponse.error);
        return BadRequestException('Unable to verify phone number');
      }
    }
    // USER VERIFICATION
    if (!result.data.isMerchant) {
      const verificationResponse = FormatResponseFromBusinessService(
        await usersRPC.verifyPhoneOTPFUNCT({
          userId: result.data.id,
          phoneToken: `OURPASS_${result.data.phoneNumber}`,
        }),
      );

      if (!verificationResponse.success) {
        logger.error(verificationResponse.error);
        return BadRequestException('Unable to verify phone number');
      }
    }

    return sendObjectResponse('Verification Successful!');
  } catch (e: any) {
    logger.error(e.message);
    return BadRequestException('Unable to verify phone number');
  }
};
