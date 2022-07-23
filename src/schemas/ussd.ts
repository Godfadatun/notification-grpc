import joi from 'joi';

export const ussdVerifyPhoneNumbeSCHEMA = {
  phoneNumber: joi
    .string()
    .regex(/^234[789][01]\d{8}$/)
    .required(),
};
