(function () {
  'use strict';

  const services = {};

  app.setService = function (name, service) {
    services[name] = service;
  };

  app.getService = function (name) {
    return services[name];
  };

})();
