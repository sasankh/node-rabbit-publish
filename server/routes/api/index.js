'use strict';

//module with all the api routes
var apiRoutes = require(__base + '/server/routes/api/routes');

//
var health = require(__base + '/server/controllers/health');
var publisher = require(__base + '/server/controllers/publisher');

exports = module.exports = function(app) {

  //GET
  app.get(apiRoutes.healthCheck,health.checkServerStatus);

  //POST
  app.post(apiRoutes.queue1, publisher.queue1);


  //PUT


  //DEL


};
