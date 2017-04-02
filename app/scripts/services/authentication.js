'use strict';

/**
 * @ngdoc service
 * @name ticTacBoomFrontApp.authentication
 * @description
 * # authentication
 * Service in the ticTacBoomFrontApp.
 */
 angular.module('ticTacBoomFrontApp')
 .service('authentication', function ($http, $cookies, Config, socket) {

    var onConnection = function(data) {
        $cookies.put('playerId', data.playerId);
        socket.on('setPlayerId', function(id) {
            console.log('setPlayerId: ' + id);
            $cookies.put('playerId', id);
        });
        socket.sendMessage('play');
    };

    this.authenticate = function(email, password, callback) {
        $http({       
            method: 'GET',       
            url: Config.serverBase + '/login',
            params: {
                email: email,
                password: password
            }    
        }).then(
            function(success) {
                onConnection(success.data);
                callback(true, success);      
            },
            function(error) {
                callback(false, error);
            }
        );
    };

    this.createUserAccount = function(data, callback) {
        $http({       
            method: 'GET',       
            url: Config.serverBase + '/signIn',
            params: {
                email: data.email,
                password: data.password,
                pseudo: data.pseudo
            }    
        }).then(
            function(success) {
                onConnection(success.data);
                callback(true, success);      
            },
            function(error) {
                callback(false, error);
            }
        );
    };

    this.logout = function(playerId, callback) {
        $http({       
            method: 'GET',       
            url: Config.serverBase + '/logout',
            params: {
                playerId: playerId,
            }    
        }).then(
            function(success) {
                if(callback) {
                    callback(true, success);      
                }
            },
            function(error) {
                if(callback) {
                    callback(false, error);
                }
            }
        );
    };
 });
