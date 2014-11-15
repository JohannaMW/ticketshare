(function () {
    angular
        .module('ticket.authentication', [
            'ticket.authentication.controllers',
            'ticket.authentication.services'
        ]);
    angular
        .module('ticket.authentication.controllers', []);

    angular
        .module('ticket.authentication.services', ['ngCookies']);
})();