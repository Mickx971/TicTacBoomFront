'use strict';

/**
 * @ngdoc function
 * @name ticTacBoomFrontApp.controller:CreateaccountCtrl
 * @description
 * # CreateaccountCtrl
 * Controller of the ticTacBoomFrontApp
 */
angular.module('ticTacBoomFrontApp')
  .controller('CreateaccountCtrl', function ($scope, $rootScope, authentication, $location) {
  	
  	$scope.pseudo = $scope.userEmail = $scope.pwd1 = $scope.pwd2 = '';

  	var createAccountCallback = function() {
      $rootScope.updateConnectionAction();
		  $location.path('/');
  	};

  	$scope.createAccountAction = function() {

  		console.log('createUserAccount');

  		authentication.createUserAccount(
  			{ 
	  			email: $scope.userEmail, 
	  			password: $scope.pwd1, 
	  			pseudo: $scope.pseudo
  			}, 
  			createAccountCallback
		);
  	};

  });
