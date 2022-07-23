import * as env from 'env-var';
import dotenv from 'dotenv';

dotenv.config();

export const NODE_ENV = env.get('NODE_ENV').required().asEnum(['production', 'beta', 'staging', 'development']);
export const ENVIRONMENT_TYPE = env.get('ENVIRONMENT_TYPE').required().asEnum(['live', 'sandbox']);

export const AMQP_CLIENT = env.get('AMQP_CLIENT').required().asString();
export const TERMII_KEY = env.get('TERMII_KEY').required().asString();
export const MAILGUN_PASS = env.get('MAILGUN_PASS').required().asString();
export const MAILGUN_USER = env.get('MAILGUN_USER').required().asString();
export const MAILGUN_KEY = env.get('MAILGUN_KEY').required().asString();
export const SLACK_TOKEN = env.get('SLACK_TOKEN').required().asString();
export const FIREBASE_CONFIG_PATH = env.get('FIREBASE_CONFIG_PATH').required().asString();
export const FIREBASE_PROJECT_ID = env.get('FIREBASE_PROJECT_ID').required().asString();

export const DB_NAME = env.get('DB_NAME').required().asString();
export const DB_HOST = env.get('DB_HOST').required().asString();
export const DB_PORT = env.get('DB_PORT').required().asString();
export const DB_USERNAME = env.get('DB_USERNAME').required().asString();
export const DB_PASSWORD = env.get('DB_PASSWORD').required().asString();

export const DOJAH_KEY = env.get('DOJAH_KEY').required().asString();
export const DOJAH_APP_ID = env.get('DOJAH_APP_ID').required().asString();
export const DOJAH_BASE_URL = env.get('DOJAH_BASE_URL').required().asString();
export const TERMII_BASE_URL = env.get('TERMII_BASE_URL').required().asString();
export const INFO_BIP_BASE_URL = env.get('INFO_BIP_BASE_URL').required().asString();
export const INFO_BIP_KEY = env.get('INFO_BIP_KEY').required().asString();
export const SMS_HANDLER = env.get('SMS_HANDLER').required().asString();

export const SERVICE_IP = env.get('SERVICE_IP').required().asString();
export const SERVICE_PORT = env.get('SERVICE_PORT').required().asString();
export const PROTO_LOCATION = env.get('PROTO_LOCATION').required().asString();

export const USERS_PROTO_LOCATION = env.get('USERS_PROTO_LOCATION').required().asString();
export const USERS_SERVICE_IP = env.get('USERS_SERVICE_IP').required().asString();
export const USERS_SERVICE_PORT = env.get('USERS_SERVICE_PORT').required().asString();

export const BUSINESS_PROTO_LOCATION = env.get('BUSINESS_PROTO_LOCATION').required().asString();
export const BUSINESS_SERVICE_IP = env.get('BUSINESS_SERVICE_IP').required().asString();
export const BUSINESS_SERVICE_PORT = env.get('BUSINESS_SERVICE_PORT').required().asString();
