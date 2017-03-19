'use strict';

angular.module('ticTacBoomFrontApp')
	.controller('MainCtrl', function($scope, $cookies, $uibModal, $location, authentication) {

		var updateConnectionAction = function() {
			if($cookies.get('playerId')) {
				$scope.ConnectionAction = 'Se déconnecter';
				$scope.userConnected = true;
			}
			else {
				$scope.ConnectionAction = 'Se connecter';	
				$scope.userConnected = false;
			}
		};

		updateConnectionAction();

		$scope.onConnectionAction = function() {

			if(!$scope.userConnected) {

				var modal = $uibModal.open({
					animation: true,
					ariaLabelledBy: 'modal-title',
					ariaDescribedBy: 'modal-body',
					templateUrl: 'views/loginModal.html',
					scope: $scope,
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
										updateConnectionAction();
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
				}, function() {
					modal.close();
				});
			}
			else {
				$cookies.remove('playerId');
				$location.path('/');
				updateConnectionAction();
			}
		};
});