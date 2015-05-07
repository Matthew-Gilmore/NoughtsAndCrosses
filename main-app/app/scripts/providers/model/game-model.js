(function () {
    'use strict';
    angular.module("Game.Model")
        .factory("GameModel", ['$location', 'Proxy', function($location, proxy) {

            var GameModel = function() {

                this.gameActive = function() {

                    return proxy.gameActive;
                };

                this.currentPlayer = function() {

                    if (proxy.currentPlayer === 1) {
                        return proxy.p1Name;
                    }
                    else if(proxy.currentPlayer === 2) {
                        return proxy.p2Name;
                    }
                };

                this.startNewGame = function() {

                    return proxy.startNewGame();
                };

                this.makeMove = function(square) {

                    return proxy.makeMove(square);
                };

                this.clearBoard = function() {

                    return proxy.clearBoard();
                };

                this.go = function(path) {

                    proxy.p1State = 'human';
                    proxy.p2State = 'human';
                    $location.path(path);
                };

                this.goAndUpdatePlayers = function(path) {

                    proxy.p1State = document.getElementsByClassName("playerState")[0].innerHTML.toLowerCase();
                    proxy.p2State = document.getElementsByClassName("playerState")[1].innerHTML.toLowerCase();

                    $location.path(path);
                };

                this.changePlayerState = function(playerNumber) {

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

                this.updateSettings = function(p1Name, p2Name) {

                    if (p1Name != null) {
                        proxy.p1Name = p1Name;
                    }

                    if (p2Name != null) {
                        proxy.p2Name = p2Name;
                    }

                };
            };

            return new GameModel();
        }]);
})();