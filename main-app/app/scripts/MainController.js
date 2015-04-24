var app = angular.module("MainApp", [] );

app.controller("MainController", function($http, $scope) {

    var currentPlayer = 0;
    var p1State = 'human';
    var p2State = 'random';

    $scope.startNewGame = function() {
        $http.post("http://noughtsandcrosses:35000/api/v1.0/newgame", {player1: p1State, player2: p2State}, {withCredentials: true})
            .success(function(data, status, headers, config) {
                //alert(data.gameboard);
                //alert(data.outcome);

                if ((p1State === 'random' || p1State === 'pre-trained') && (p2State === 'random' || p2State === 'pre-trained')) {
                    populateBoard(data.gameboard);
                    alert("A winner is Player " + data.winner + "!");
                }

                if (p1State === 'human') {
                    currentPlayer = 1;
                    $scope.chooseMove();
                }
                else {
                    currentPlayer = 2;
                }

            })
            .error(function(data, status, headers, config) {
                alert("Something went wrong.");
                alert(data);
            });
    };

    $scope.makeMove = function(square) {
        $http.post("http://noughtsandcrosses:35000/api/v1.0/makemove", {playerNumber: currentPlayer, chosenSquare: square}, {withCredentials: true})
            .success(function(data, status, headers, config) {
                populateBoard(data.gameboard);

                if (currentPlayer === 1 && p2State === 'human') {
                    currentPlayer = 2;
                }
                else if (currentPlayer === 2 && p1State === 'human') {
                    currentPlayer = 1;
                }

                if (data.outcome === 'Win') {
                    alert("A winner is Player " + data.winner + "!");
                }
                else if (data.outcome === 'Draw') {
                    alert("It's a tie!");
                }
            })
            .error(function(data, status, headers, config) {
                alert(data);
            });
    };

    var populateBoard = function(boardData) {

        $scope.board = [];

        for(var i=0;i<boardData.length;i++) {

            switch(boardData[i]) {
                case '0':
                    break;
                case '1':
                    document.getElementsByClassName("boardSquare")[i].classList.add("cross");
                    break;
                case '2':
                    document.getElementsByClassName("boardSquare")[i].classList.add("nought");
                    break;
            }
        }

    };

    $scope.chooseMove = function() {

        var square = prompt("Which square would you like to fill in?");

        while (square < 0 || square > 8) {
            square = prompt("Sorry, that's not a valid square. Please enter a number between 0 and 8.");
        }

        $scope.makeMove(square);
    };


});
