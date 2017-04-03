'use strict';

/**
 * @ngdoc function
 * @name ticTacBoomFrontApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the ticTacBoomFrontApp
 */
angular.module('ticTacBoomFrontApp')
  .controller('ProfileCtrl', function ($rootScope, $scope, $location, profileService) {
  	if($rootScope.userConnected) {
  		profileService.retrieveData(function(success, data) {
  			if(success) {
  				$scope.games = data.games;
  				$scope.total = data.total;
  				$scope.wins = data.wins;
  			}
  		});
  	}
  	else {
  		$location.path('/');
  	}
  });
