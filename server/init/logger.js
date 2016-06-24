'use strict';

var log4js = require('log4js');

// logger
log4js.configure('./server/config/log.json');

module.exports = {
  main: log4js.getLogger('application'),
  healthcheck: log4js.getLogger('health-check'),
  auth: log4js.getLogger('authentication-authorization'),
  http: log4js.getLogger('http')
};
