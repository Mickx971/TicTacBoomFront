'use strict';

/**
 * @ngdoc service
 * @name ticTacBoomFrontApp.socket
 * @description
 * # socket
 * Factory in the ticTacBoomFrontApp.
 */

 angular.module('ticTacBoomFrontApp')
  .factory('socket', function (socketFactory, $cookies, Config) {
    var socket = socketFactory({ioSocket: io.connect(Config.serverBase)});
    socket.sendMessage = function(messageType, message) {
		if(!message) {
			message = {};
		}
		message.id = $cookies.get('playerId');
		socket.emit(messageType, message);
	};
	return socket;
  });
