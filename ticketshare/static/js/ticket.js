(function () {
  'use strict';

  angular
    .module('ticket', [
      'ticket.routes',
      'ticket.authentication'
    ]);

  angular
    .module('ticket.routes', ['ngRoute']);
})();