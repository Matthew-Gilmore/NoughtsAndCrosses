(function () {
    'use strict';
    angular.module("Game.Model")
        .factory("GameModel", ['$location', 'Proxy', function($location, proxy) {

            var GameModel = function() {

                var me = this;

                me.gameActive = function() {

                    return proxy.gameActive;
                };

                me.currentPlayer = function() {

                    if (proxy.currentPlayer === 1) {
                        return proxy.p1Name;
                    }
                    else if(proxy.currentPlayer === 2) {
                        return proxy.p2Name;
                    }
                };

                me.p1Symbol = function() {

                    return proxy.p1Symbol;
                };

                me.p2Symbol = function() {

                    return proxy.p2Symbol;
                };

                me.soundOn = function() {

                    return proxy.soundOn;
                };

                me.startNewGame = function() {

                    return proxy.startNewGame();
                };

                me.makeMove = function(square) {

                    return proxy.makeMove(square);
                };

                me.clearBoard = function() {

                    return proxy.clearBoard();
                };

                me.go = function(path, resetPlayers, clearBoard) {

                    if (resetPlayers === true) {

                        proxy.p1State = 'human';
                        proxy.p2State = 'human';
                    }

                    $location.path(path);

                    if (clearBoard === true) {

                        proxy.clearBoard();
                        proxy.gameActive = false;
                    }
                };

                me.leavePageConfirm = function(path, resetPlayers) {

                    var choice = confirm("Navigating away from this page will reset the game. Are you sure you want to continue?");

                    if (choice === true) {

                        me.go(path, resetPlayers, true);
                    }
                };

                me.changePlayerState = function(playerNumber) {

                    if (playerNumber === 1) {

                        proxy.p1State = changePlayerImage(playerNumber, proxy.p1State);
                    }
                    else if (playerNumber === 2) {

                        proxy.p2State = changePlayerImage(playerNumber, proxy.p2State);
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

                me.updateSettings = function(p1Name, p2Name, symbolOption, soundOption) {

                    if (p1Name) {

                        proxy.p1Name = p1Name;
                    }

                    if (p2Name) {

                        proxy.p2Name = p2Name;
                    }

                    if (symbolOption) {

                        proxy.p1Symbol = symbolOption;

                        if (proxy.p1Symbol === 'nought') {

                            proxy.p2Symbol = 'cross';
                        }
                        else if (proxy.p1Symbol === 'cross') {

                            proxy.p2Symbol = 'nought';
                        }
                    }

                    if (soundOption) {

                        proxy.soundOn = (soundOption === 'true');
                    }
                };
            };

            return new GameModel();
        }]);
})();