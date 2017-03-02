const uuid = require('uuid/v4');

exports.randomInt = function(low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low);
};

exports.Guid = function() {
	return uuid();
};