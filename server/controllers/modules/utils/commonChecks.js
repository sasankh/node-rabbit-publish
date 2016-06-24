'use strict';

var Q = require('q');

var logger = require(__base + '/server/controllers/modules/utils/logger');

module.exports.checkIfJsonRequest = function(req) {

  logger.debug(req.requestId,'checkIfJsonRequest','invoked');

  var deferred = Q.defer();
  var body = req.body;

  if(req.is('application/json') === false) {
    logger.warn(req.requestId,'checkIfJsonRequest','Warn-check','Incoming request (Content-Type) is not application/json.');
    deferred.reject({ message: 'Incoming request (Content-Type) is not application/json.'});
  } else {
    try {
      var msg = JSON.parse(JSON.stringify(req.body));
      deferred.resolve(req);
    } catch(e) {
      logger.warn(req.requestId,'checkIfJsonRequest','Warn-check','Content (content-body) is not JSON type.');
      deferred.reject({message: 'Content (content-body) is not JSON type.'});
    }
  }
  return deferred.promise;
};
