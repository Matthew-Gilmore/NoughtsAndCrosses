var app = angular.module("MainApp");

app.controller("MainController", function($http, $scope, $location) {

    var currentPlayer = 0;
    var gameActive = false;
    var p1State = 'human';
    var p2State = 'random';

    $scope.board = [];

    $scope.startNewGame = function() {
        $http.post("http://noughtsandcrosses:35000/api/v1.0/newgame", {player1: p1State, player2: p2State}, {withCredentials: true})
            .success(function(data, status, headers, config) {
                //alert(data.gameboard);
                //alert(data.outcome);

                populateBoard("000000000");

                if ((p1State === 'random' || p1State === 'pre-trained') && (p2State === 'random' || p2State === 'pre-trained')) {
                    populateBoard(data.gameboard);
                    alert("A winner is Player " + data.winner + "!");
                }

                gameActive = true;

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

        if (($scope.board[square] !== '1') && ($scope.board[square] !== '2') && (gameActive)) {

            $http.post("http://noughtsandcrosses:35000/api/v1.0/makemove",
                {playerNumber: currentPlayer, chosenSquare: square}, {withCredentials: true})
                .success(function (data, status, headers, config) {
                    populateBoard(data.gameboard);

                    if (currentPlayer === 1 && p2State === 'human') {
                        currentPlayer = 2;
                    }
                    else
                        if (currentPlayer === 2 && p1State === 'human') {
                            currentPlayer = 1;
                        }

                    if (data.outcome === 'Win') {
                        alert("A winner is Player " + data.winner + "!");
                        gameActive = false;
                    }
                    else if (data.outcome === 'Draw') {
                        alert("It's a tie!");
                        gameActive = false;
                    }
                })
                .error(function (data, status, headers, config) {
                    alert(data);
                });
        }
    };

    var populateBoard = function(boardData) {

        $scope.board = boardData;

        for(var i=0;i<boardData.length;i++) {

            switch(boardData[i]) {
                case '0':
                    document.getElementsByClassName("boardSquare")[i].classList.remove("nought");
                    document.getElementsByClassName("boardSquare")[i].classList.remove("cross");
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

        while (square < 0 || square > 8 || square % 1 !== 0) {
            square = prompt("Sorry, that's not a valid square. Please enter a number between 0 and 8.");
        }

        $scope.makeMove(square);
    };

    $scope.go = function(path) {

        $location.path(path);
    };
});
