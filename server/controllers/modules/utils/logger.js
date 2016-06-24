'use strict';

var config = require(__base + '/server/config/config');

var main = require( __base + '/server/init/logger').main;
var auth = require( __base + '/server/init/logger').auth;
var healthcheck = require( __base + '/server/init/logger').healthcheck;
var http = require( __base + '/server/init/logger').http;

module.exports.info = function(requestId, functionName, message, traceDetail) {

  main.info('['+requestId+']: ' + functionName + ' --> ' + message);

  if(traceDetail){
    main.trace('['+requestId+']: ' + functionName + ' --> ' + message + '. Detail - ' + JSON.stringify(traceDetail));
  }
};

module.exports.debug = function(requestId, functionName, message, traceDetail) {

  main.debug('['+requestId+']: ' + functionName + ' --> ' + message);

  if(traceDetail){
    main.trace('['+requestId+']: ' + functionName + ' --> ' + message + '. Detail - ' + JSON.stringify(traceDetail));
  }
};

module.exports.warn = function(requestId, functionName, warnType, message, traceDetail) {

  main.warn('['+requestId+']: ' + warnType + ' --> ' + functionName + ' --> ' + message);

  if(traceDetail){
    main.trace('['+requestId+']: ' + warnType + ' --> ' + functionName + ' --> ' + message + '. Detail - ' + JSON.stringify(traceDetail));
  }
};

module.exports.error = function(requestId, functionName, errorType, message, traceDetail) {

  main.warn('['+requestId+']: ' + errorType + ' --> ' + functionName + ' --> ' + message);

  if(traceDetail){
    main.trace('['+requestId+']: ' + errorType + ' --> ' + functionName + ' --> ' + message + '. Detail - ' + JSON.stringify(traceDetail));
  }
};


/* log to auth and application*/
module.exports.authenticationlog = function(req, type) {

  var json_message = {};

  // mask password if not empty
  var pwd = (req.body.password === '' ? '' : 'XXXXXX');

  switch(type) {
    case 'AUTHENTICATION_FAILURE_UNKNOWN_USER':

      json_message = {
        't': 'AUTHENTICATION',
        'r': 'FAILURE_UNKNOWN_USER',
        'u': req.body.username,
        'p': pwd,
        'ip': req.ip
      };
      break;

    case 'AUTHENTICATION_FAILURE_INCORRECT_PASSWORD':
      json_message = {
        't': 'AUTHENTICATION',
        'r': 'FAILURE_INCORRECT_PASSWORD',
        'u': req.body.username,
        'p': pwd,
        'ip': req.ip
      };
      break;

    case 'AUTHENTICATION_SUCCESS':
      json_message = {
        't': 'AUTHENTICATION',
        'r': 'SUCCESS',
        'u': req.body.username,
        'p': pwd,
        'ip': req.ip
      };
      break;
  }

  // log body
  var body = config.application+'-auth:' + type + ' ' + JSON.stringify(json_message);

  main.debug(body);
  auth.info(body);
};
