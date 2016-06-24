'use strict';

// configuration for local environment
// the configuration will be repeated for all envs
// local, test, dev, stage and production

exports.application =  process.env.APPLICATION || 'placeholder-for-application-name';

exports.app = {
  port: process.env.PORT || 3000,
  cryptoKey: process.env.CRYPTOKEY || 'placeholder-for-cryptokey',
  env: process.env.ENVIRONMENT || 'placeholder-for-deployment-environment'
};

exports.mysql = {
  host: process.env.MYSQL_HOST || 'placeholder-for-mysql-host',
  user: process.env.MYSQL_USER || 'placeholder-for-mysql-user',
  password: process.env.MYSQL_PASS || 'placeholder-for-mysql-password',
  database: process.env.MYSQL_DB || 'placeholder-for-mysql-database',
  port: process.env.MYSQL_PORT || 'placeholder-for-mysql-port'
};

exports.rabbitmq = {
  host : process.env.RABBIT_HOST,
  port : process.env.RABBIT_PORT,
  username : process.env.RABBIT_USERNAME,
  password : process.env.RABBIT_PASSWORD,
  max_connection : process.env.RABBIT_MAX_CONNECTION,
  rabbit_queue1 : process.env.RABBIT_QUEUE1
};
