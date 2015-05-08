(function(){
    'use strict';
    angular.module("Game.Proxy", []);
    angular.module("Game.Model", []);
    angular.module("Game", ['Game.Model', 'Game.Proxy', 'ngRoute']);
}());