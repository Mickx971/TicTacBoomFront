'use strict';

/**
 * @ngdoc service
 * @name ticTacBoomFrontApp.socket
 * @description
 * # socket
 * Factory in the ticTacBoomFrontApp.
 */

 angular.module('ticTacBoomFrontApp')
  .factory('socket', function (socketFactory, $cookies, $location, Config) {
    var socket = socketFactory({ioSocket: io.connect(Config.serverBase)});
    socket.sendMessage = function(messageType, message) {
		if(!message) {
			message = {};
		}
		message.id = $cookies.get('playerId');
		socket.emit(messageType, message);
	};
	var userId = $cookies.get('playerId');
	if(userId) {
		socket.sendMessage('play');
	}
	socket.on('gameJoined', function(gameData) {
		$cookies.put('gameId', gameData.gameId);
		$location.path('/play');
	});
	return socket;
  });
