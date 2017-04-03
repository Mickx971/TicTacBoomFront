'use strict';

/**
 * @ngdoc overview
 * @name ticTacBoomFrontApp
 * @description
 * # ticTacBoomFrontApp
 *
 * Main module of the application.
 */
var app = angular
	.module('ticTacBoomFrontApp', [
		'ngAnimate',
		'ngCookies',
		'ngResource',
		'ngRoute',
		'ngSanitize',
		'ngMaterial',
		'btford.socket-io',
		'ui.bootstrap'
	]);

app.config(function ($routeProvider, $httpProvider) {
	$routeProvider
		.when('/play', {
			templateUrl: 'views/play.html',
			controller: 'PlayCtrl',
			controllerAs: 'play'
		})
		.when('/createAccount', {
		  templateUrl: 'views/createaccount.html',
		  controller: 'CreateaccountCtrl',
		  controllerAs: 'createAccount'
		})
		.when('/home', {
		  templateUrl: 'views/home.html',
		  controller: 'HomeCtrl',
		  controllerAs: 'home'
		})
		.when('/profile', {
			templateUrl: 'views/profile.html',
			controller: 'ProfileCtrl',
			controllerAs: 'profile'
		})
		.otherwise({
			redirectTo: '/home'
		});

	$httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
});









