'use strict';

var mainLog = require( __base + '/server/init/logger').main;

module.exports.logRequest = function(functionName, restType, req) {

  mainLog.info('[' + req.requestId + ']: ' + req.ip_address + '/' + req.hostname + ' --> ' + restType + ' --> ' + functionName);

  if((functionName !== 'authentication') && (restType === 'POST' || restType === 'PUT')){
    mainLog.trace('['+req.requestId+']: ' + restType + ' --> ' + functionName +' --> Body - ' + JSON.stringify(req.body));
  }

};
