/**
 * Created by matthew.gilmore on 20/04/2015.
 */
var app = angular.module("MainApp", [] );

app.controller("MainController", function($http, $scope) {
    $scope.post = function() {
        $http.post("http://noughtsandcrosses:35000/api/v1.0/newgame", {player1:'random', player2:'random'})
            .success(function(data, status, headers, config) {
                alert(data.gameboard);
                alert(data.outcome);
                alert(data.winner);
            })
            .error(function(data, status, headers, config) {
                alert("Something went wrong.");
                alert(data);
            });
    }
});