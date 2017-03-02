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
    return socketFactory({ioSocket: io.connect('http://localhost:3000/play')});
  });
