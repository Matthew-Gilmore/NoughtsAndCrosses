(function() {
    var app = angular.module("MainApp", ['ngRoute']);

    app.config(['$routeProvider', function ($routeProvider) {

        $routeProvider
            .when('/Users/matthew.gilmore/NoughtsAndCrosses/main-app/app/settings.html', {
                templateUrl: "../app/settings.html"
            })
            .otherwise({
                redirectTo: '/'
            });

    }]);
}());
