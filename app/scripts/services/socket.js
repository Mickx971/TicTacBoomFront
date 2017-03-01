'use strict';

/**
 * @ngdoc service
 * @name ticTacBoomFrontApp.socket
 * @description
 * # socket
 * Factory in the ticTacBoomFrontApp.
 */
 angular.module('ticTacBoomFrontApp')
  .factory('socket', function (socketFactory) {
    return socketFactory({ioSocket: 'http://localhost:3000'});
  });
