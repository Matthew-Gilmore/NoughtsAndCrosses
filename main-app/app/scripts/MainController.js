var app = angular.module("MainApp", [] );

app.controller("MainController", function($http, $scope) {

    $scope.startNewGame = function(p1State, p2State) {
        $http.post("http://noughtsandcrosses:35000/api/v1.0/newgame", {player1: p1State, player2: p2State}, {withCredentials: true})
            .success(function(data, status, headers, config) {
                //alert(data.gameboard);
                //alert(data.outcome);

                if ((p1State === 'random' || p1State === 'pre-trained') && (p2State === 'random' || p2State === 'pre-trained')) {
                    alert(data.winner);
                }

                if (p1State === 'human') {
                    $scope.chooseMove();
                }

                populateBoard(data.gameboard);
            })
            .error(function(data, status, headers, config) {
                alert("Something went wrong.");
                alert(data);
            });
    };

    $scope.makeMove = function(pNumber, square) {
        $http.post("http://noughtsandcrosses:35000/api/v1.0/makemove", {playerNumber: pNumber, chosenSquare: square}, {withCredentials: true})
            .success(function(data, status, headers, config) {
                alert("Successful move");
                populateBoard(data.gameboard);
            })
            .error(function(data, status, headers, config) {
                alert("Something went wrong.");
                alert(data);
            });
    };

    var populateBoard = function(boardData) {

        $scope.board = [];

        for(var i=0;i<boardData.length;i++) {

            switch(boardData[i]) {
                case '0':
                    $scope.board[i] = "";
                    break;
                case '1':
                    $scope.board[i] = "X";
                    break;
                case '2':
                    $scope.board[i] = "O";
                    break;
            }
        }

    };

    $scope.chooseMove = function() {

        var pNumber = prompt("Please enter your player number.");

        while (!(pNumber === '1' || pNumber === '2')) {
            pNumber = prompt("Sorry, that's not a valid player number. Please enter either 1 or 2.");
        }

        var square = prompt("Which square would you like to fill in?");

        while (square < 0 || square > 8) {
            square = prompt("Sorry, that's not a valid square. Please enter a number between 0 and 8.");
        }

        $scope.makeMove(pNumber, square);
    };


});