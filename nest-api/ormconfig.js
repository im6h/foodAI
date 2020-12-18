require('dotenv').config();

const { join } = require('path');
module.exports = {
  type: 'mysql',
  url: process.env.DATABASE_URL,
  database: process.env.DATABASE_NAME,
  entities: [join(__dirname, '**/**.entity{.ts,.js}')],
  charset: 'utf8mb4',
  synchronize: true, // auto migration
  logging: !process.env.NODE_ENV || process.env.NODE_ENV === 'local',
  seeds: ['src/**/*.seed.ts'],
  factories: ['src/**/*.factory.ts'],
};
