'use strict';

/**
 * @ngdoc service
 * @name ticTacBoomFrontApp.profileService
 * @description
 * # profileService
 * Service in the ticTacBoomFrontApp.
 */
angular.module('ticTacBoomFrontApp')
  .service('profileService', function ($http, $cookies, Config) {
    this.retrieveData = function (callback) {
    	$http({       
            method: 'GET',       
            url: Config.serverBase + '/playerData',
            params: {
                playerId: $cookies.get('playerId'),
            }    
        }).then(
            function(success) {
                callback(true, success.data);      
            },
            function(error) {
                callback(false, error);
            }
        );
    };
  });
