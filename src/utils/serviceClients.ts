/* eslint-disable import/first */
import dotenv from 'dotenv';
import caller from 'grpc-caller';

dotenv.config();

import {
  USERS_PROTO_LOCATION,
  USERS_SERVICE_IP,
  USERS_SERVICE_PORT,
  BUSINESS_PROTO_LOCATION,
  BUSINESS_SERVICE_IP,
  BUSINESS_SERVICE_PORT,
} from './secrets';

export const businessRPC = caller(`${BUSINESS_SERVICE_IP}:${BUSINESS_SERVICE_PORT}`, BUSINESS_PROTO_LOCATION, 'Business');
export const usersRPC = caller(`${USERS_SERVICE_IP}:${USERS_SERVICE_PORT}`, USERS_PROTO_LOCATION, 'Users');
