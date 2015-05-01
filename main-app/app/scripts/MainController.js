(function() {
    'use strict';
    angular.module("MainApp")
        .controller("MainController", ['$scope', 'GameModel', function($scope, GameModel) {

            $scope.model = GameModel;

        }]);
}());
