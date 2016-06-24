'use strict';

var healthlog = require(__base + '/server/init/logger').healthcheck;

var config = require(__base + '/server/config/config');
var rabbitmq = require(__base + '/server/init/queue').getPool();

// export functions
module.exports = {
  queue1 : queue1
};

/**
* Function Name: queue1
* @api public
* Description: The function puts the supplied body in the rabbit queue1
**/
function queue1(req, res){

  healthlog.debug('[' + req.requestId + ']: ' + 'queue1 --> invoked');

  res.set('Content-Type', 'application/json');

  rabbitmq.acquire(function(err, client) {

    if(err) {
      res.status(200).send({"message":"Failed to add to the queue"});
    } else {
      
      /* --- without bind -- Does not work if not binded before*/      
      // client.publish('amq.direct', config.rabbitmq.rabbit_queue1, JSON.stringify(req.body), { confirm: true }, function(err1) {
      //   rabbitmq.release(client);

      //   if(err1) {
      //     res.status(200).send({"message":"Failed to add to the queue"});
      //   } else {
      //     res.status(200).send({"message":"Add to the queue"});
      //   }
      // });

      /* --- without bind --*/


      /* --- with declare and bind --> if the queue is not declared--*/

  // client.queue({"queue":config.rabbitmq.rabbit_queue1},function(e, q) {
  //   q.declare(function(){
  //     q.bind("amq.direct", config.rabbitmq.rabbit_queue1, function(){

  //     client.publish('amq.direct', config.rabbitmq.rabbit_queue1, JSON.stringify(req.body), { confirm: true }, function(err1) {
  //       rabbitmq.release(client);

  //       if(err1) {
  //         res.status(200).send({"message":"Failed to add to the queue"});
  //       } else {
  //         res.status(200).send({"message":"Add to the queue"});
  //       }
  //     });

  //     });
  //   });
  // });

      /* --- with declare and bind --*/


      /* --- with bind --> if the queue already exist--*/

  client.queue({"queue":config.rabbitmq.rabbit_queue1},function(e, q) {

      q.bind("amq.direct", config.rabbitmq.rabbit_queue1, function(){

      client.publish('amq.direct', config.rabbitmq.rabbit_queue1, JSON.stringify(req.body), { confirm: true }, function(err1) {
        rabbitmq.release(client);

        if(err1) {
          res.status(200).send({"message":"Failed to add to the queue"});
        } else {
          res.status(200).send({"message":"Add to the queue"});
        }
      });

      });
  });

      /* --- with bind --*/

    }

  });

}