'use strict';

angular.module('ticTacBoomFrontApp')
	.controller('MainCtrl', function($rootScope, $cookies, $uibModal, $location, authentication) {

		$rootScope.updateConnectionAction = function() {
			console.log('currentUserId = ' + $cookies.get('playerId'));
			$rootScope.currentUserId = $cookies.get('playerId');
			if($rootScope.currentUserId) {
				$rootScope.ConnectionAction = 'Se déconnecter';
				$rootScope.userConnected = true;
			}
			else {
				$rootScope.ConnectionAction = 'Se connecter';	
				$rootScope.userConnected = false;
			}
		};

		$rootScope.updateConnectionAction();

		$rootScope.onConnectionAction = function() {

			if(!$rootScope.userConnected) {

				var modal = $uibModal.open({
					animation: false,
					ariaLabelledBy: 'modal-title',
					ariaDescribedBy: 'modal-body',
					templateUrl: 'views/loginModal.html',
					scope: $rootScope,
					controller: function($scope) {

						$scope.error = false;
						$scope.userEmail = '';
						$scope.userPassword = '';

						$scope.onCreateAccount = function() {
							modal.close();
							$location.path('createAccount');
						};

						$scope.onLogin = function() {
							authentication.authenticate(
								$scope.userEmail,
								$scope.userPassword,
								function(success, message) {
									if(success) {
										$rootScope.updateConnectionAction();
										modal.close();
									}
									else {
										console.log(message);
										$scope.error = true;
										$scope.userEmail = '';
										$scope.userPassword = '';
									}
								}
							);
						};

						$scope.onCancel = function() {
							modal.close();
						};
					},
					size: 'sm'
				});

				modal.result.then(function() {
					modal.close();
				}, function() {
					modal.close();
				});
			}
			else {
				var playerId = $cookies.get('playerId');
				authentication.logout(playerId);
				$cookies.remove('playerId');
				$location.path('/');
				$rootScope.updateConnectionAction();
			}
		};
});