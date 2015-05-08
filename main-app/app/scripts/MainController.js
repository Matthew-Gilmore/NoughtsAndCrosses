(function() {
    'use strict';
    angular.module("Game")
        .controller("MainController", ['$scope', 'GameModel', function($scope, GameModel) {

            $scope.model = GameModel;

        }]);
}());
