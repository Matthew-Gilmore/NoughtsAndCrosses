(function() {
    'use strict';
    angular.module("MainApp")
        .controller("MainController", [ '$http', '$scope', '$location', 'NAndCModel', function($http, $scope, $location, NAndCModel) {

            $scope.model = NAndCModel;

        }]);
}());
