(function () {
    'use strict';
    angular.module("MainApp")
        .factory("GameModel", ['$http', '$location', function($http, $location) {

            var GameModel = function() {

                var me = this;
                this.currentPlayer = 0;
                var p1State = 'human';
                var p2State = 'human';

                this.gameActive = false;

                this.board = [];

                this.startNewGame = function() {

                    $http.post("http://noughtsandcrosses:35000/api/v1.0/newgame", {player1: p1State, player2: p2State}, {withCredentials: true})
                        .success(function(data, status, headers, config) {

                            me.clearBoard();
                            populateBoard(data.gameboard);

                            if ((p1State === 'random' || p1State === 'pre-trained') && (p2State === 'random' || p2State === 'pre-trained')) {

                                if (data.outcome === 'Win') {
                                    alert("A winner is Player " + data.winner + "!");
                                }
                                else {
                                    alert("It's a tie!");
                                }
                            }
                            else {
                                me.gameActive = true;
                            }

                            if (p1State === 'human') {
                                me.currentPlayer = 1;
                            }
                            else {
                                me.currentPlayer = 2;
                            }

                        })
                        .error(function(data, status, headers, config) {
                            alert("Something went wrong.");
                            alert(data);
                        });
                };

                this.makeMove = function(square) {

                    if ((this.board[square] !== '1') && (this.board[square] !== '2') && (this.gameActive)) {

                        $http.post("http://noughtsandcrosses:35000/api/v1.0/makemove",
                            {playerNumber: this.currentPlayer, chosenSquare: square}, {withCredentials: true})
                            .success(function (data, status, headers, config) {
                                populateBoard(data.gameboard);

                                if (me.currentPlayer === 1 && p2State === 'human') {
                                    me.currentPlayer = 2;
                                }
                                else
                                if (me.currentPlayer === 2 && p1State === 'human') {
                                    me.currentPlayer = 1;
                                }

                                if (data.outcome === 'Win') {
                                    alert("A winner is Player " + data.winner + "!");
                                    me.gameActive = false;
                                }
                                else if (data.outcome === 'Draw') {
                                    alert("It's a tie!");
                                    me.gameActive = false;
                                }
                            })
                            .error(function (data, status, headers, config) {
                                alert(data);
                            });
                    }
                };

                var populateBoard = function(boardData) {

                    me.board = boardData;

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

                this.clearBoard = function() {

                    populateBoard("000000000");
                };

                this.go = function(path) {

                    p1State = 'human';
                    p2State = 'human';
                    $location.path(path);
                };

                this.goAndUpdatePlayers = function(path) {

                    p1State = document.getElementsByClassName("playerState")[0].innerHTML.toLowerCase();
                    p2State = document.getElementsByClassName("playerState")[1].innerHTML.toLowerCase();

                    $location.path(path);
                };

                this.changePlayerState = function(playerNumber) {

                    if (playerNumber === 1) {

                        p1State = changePlayerImage(playerNumber, p1State);
                    }
                    else if (playerNumber === 2) {

                        p2State = changePlayerImage(playerNumber, p2State);
                    }
                };

                var changePlayerImage = function(playerNumber, playerState) {

                    switch (playerState) {

                        case 'human':
                            playerState = 'random';
                            document.getElementsByClassName("playerState")[playerNumber-1].innerHTML = "Random";
                            document.getElementsByClassName("playerImage")[playerNumber-1].setAttribute("src", "images/bowser.png");
                            break;
                        case 'random':
                            playerState = 'pre-trained';
                            document.getElementsByClassName("playerState")[playerNumber-1].innerHTML = "Pre-trained";
                            document.getElementsByClassName("playerImage")[playerNumber-1].setAttribute("src", "images/rob.png");
                            break;
                        case 'pre-trained':
                            playerState = 'human';
                            document.getElementsByClassName("playerState")[playerNumber-1].innerHTML = "Human";
                            document.getElementsByClassName("playerImage")[playerNumber-1].setAttribute("src", "images/mario.png");
                            break;
                    }

                    return playerState;
                };
            };

            return new GameModel();
        }]);
})();