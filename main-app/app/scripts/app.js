(function() {
    'use strict';
    angular.module("Game")
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider
                .when('/startup', {
                    templateUrl: "partials/startup.html"
                })
                .when('/gameBoard', {
                    templateUrl: "partials/gameBoard.html"
                })
                .when('/settings', {
                    templateUrl: "partials/settings.html"
                })
                .otherwise({
                    redirectTo: 'startup'
                });
    }]);
}());
