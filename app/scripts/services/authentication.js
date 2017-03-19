'use strict';

/**
 * @ngdoc service
 * @name ticTacBoomFrontApp.authentication
 * @description
 * # authentication
 * Service in the ticTacBoomFrontApp.
 */
 angular.module('ticTacBoomFrontApp')
 .service('authentication', function ($http, $cookies, Config) {
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
                $cookies.put('playerId', success.data.playerId);
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
                $cookies.put('playerId', success.data.playerId);
                callback(true, success);      
            },
            function(error) {
                callback(false, error);
            }
        );
    };
 });
