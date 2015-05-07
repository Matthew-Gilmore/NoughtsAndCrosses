(function () {
    'use strict';
    angular.module("Game.Proxy")
        .factory('Proxy', ['$http', function($http) {

            var GameProxy = function() {
                var me = this;
                me.currentPlayer = 0;
                me.p1State = 'human';
                me.p2State = 'human';
                me.p1Name = 'Player 1';
                me.p2Name = 'Player 2';

                me.gameActive = false;

                me.board = [];

                this.startNewGame = function () {

                    $http.post("http://noughtsandcrosses:35000/api/v1.0/newgame", {
                        player1: me.p1State,
                        player2: me.p2State
                    }, {withCredentials: true})
                        .success(function (data, status, headers, config) {

                            me.clearBoard();
                            populateBoard(data.gameboard);

                            if ((me.p1State === 'random' || me.p1State === 'pre-trained') && (me.p2State === 'random' || me.p2State === 'pre-trained')) {

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

                            if (me.p1State === 'human') {
                                me.currentPlayer = 1;
                            }
                            else {
                                me.currentPlayer = 2;
                            }

                        })
                        .error(function (data, status, headers, config) {
                            alert("Something went wrong.");
                            alert(data);
                        });
                };

                this.makeMove = function (square) {

                    if ((me.board[square] !== '1') && (me.board[square] !== '2') && (me.gameActive)) {

                        $http.post("http://noughtsandcrosses:35000/api/v1.0/makemove",
                            {playerNumber: me.currentPlayer, chosenSquare: square}, {withCredentials: true})
                            .success(function (data, status, headers, config) {
                                populateBoard(data.gameboard);

                                if (me.currentPlayer === 1 && me.p2State === 'human') {
                                    me.currentPlayer = 2;
                                }
                                else if (me.currentPlayer === 2 && me.p1State === 'human') {
                                    me.currentPlayer = 1;
                                }

                                if (data.outcome === 'Win') {

                                    if (data.winner === '1') {
                                        alert("A winner is " + me.p1Name + "!");
                                    } else {
                                        alert("A winner is " + me.p2Name + "!");
                                    }
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

                var populateBoard = function (boardData) {

                    me.board = boardData;

                    for (var i = 0; i < boardData.length; i++) {

                        switch (boardData[i]) {
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

                this.clearBoard = function () {

                    populateBoard("000000000");
                };
            };

            return new GameProxy();
        }]);
})();