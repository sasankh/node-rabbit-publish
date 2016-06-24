'use strict';

var Amqp = require('amqp-coffee');

var config = require(__base + '/server/config/config');
var logger = require(__base + '/server/init/logger').main;
var Pool = require('generic-pool').Pool;

var pool = new Pool({
  name     : 'queue',
  create   : function(callback) {
    var connection = new Amqp({
      host: config.rabbitmq.host,
      port: config.rabbitmq.port,
      login: config.rabbitmq.username,
      password: config.rabbitmq.password
    }, function(err, conn) {
      if(err) {
        logger.error("Could not initilizing rabbitmq. Detail : " + err + err.stack + err.message);
        callback(err, null);
      } else {
        logger.info("Rabbitmq Connection Initialized");
        callback(null, connection);
      }
    });
  },
  destroy  : function(client) { client.close(); },
  max      : parseInt(config.rabbitmq.max_connection),
  min      : 1,
  idleTimeoutMillis : 30000
});

module.exports.getPool = function() {
  return pool;
};