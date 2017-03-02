const uuid = require('uuid/v1');

exports.randomInt = function(low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low);
};

exports.Guid = function() {
	return uuid();
};