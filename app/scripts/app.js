'use strict';

/**
 * @ngdoc overview
 * @name ticTacBoomFrontApp
 * @description
 * # ticTacBoomFrontApp
 *
 * Main module of the application.
 */
angular
  .module('ticTacBoomFrontApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'btford.socket-io',
    'oc.lazyLoad',
    'ui.bootstrap'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      // .when('/', {
      //   templateUrl: 'views/main.html',
      //   controller: 'MainCtrl',
      //   controllerAs: 'main'
      // })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/play/:gameId', {
        templateUrl: 'views/play.html',
        controller: 'PlayCtrl',
        controllerAs: 'play'
      })
      .otherwise({
        redirectTo: '/play/0'
      });
  });
