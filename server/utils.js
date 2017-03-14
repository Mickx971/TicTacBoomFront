const uuid = require('uuid/v4');

exports.randomInt = function(low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low);
};

exports.sendMessage = function(player, messageType, messageData) {
	player.sockets.forEach(s => {
		try { 
			s.emit(messageType, messageData);
		}
		catch(err) {
			console.log(err);
		}
	});
};

exports.Guid = function() {
	return uuid();
};