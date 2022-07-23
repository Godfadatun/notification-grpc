/* eslint-disable @typescript-eslint/no-var-requires */
const { join } = require('path');

module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  logging: false,
  entities: [join(__dirname, '/dist/database/models/**/*.js')],
  migrations: [join(__dirname, '/dist/database/migration/**/*.js')],
  subscribers: [join(__dirname, '/dist/database/subscriber/**/*.js')],
  cli: {
    entitiesDir: 'src/database/models',
    migrationsDir: 'src/database/migration',
    subscribersDir: 'src/database/subscriber',
  },
};
