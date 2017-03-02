var app 	= require('express')(),
	server  = require('http').createServer(app),
	io 		= require('socket.io')(server),
	session = require('express-session')({
		secret: 'MY-SECRET-TO-CHANGE',
		resave: true,
		saveUninitialized: true
	}),
sharedsession = require('express-socket.io-session');

var gamePool = new (require('./gamePool'))();

app.use(session)

// Routes

.get('/play/:gameId', function(req,res) {
	if(req.session.id)
		console.log(req.session.id);
	res.end();
});

// Share session with io sockets
io.of('/play').use(sharedsession(session, { autoSave: true }));

io.of('/play').on('connection', function(socket) {
    // Accept a login event with user's data
    // socket.on('login', function(userdata) {
    // 	socket.handshake.session.userdata = userdata;
    // 	socket.handshake.session.save();
    // });

    // socket.on('logout', function(userdata) {
    // 	if (socket.handshake.session.userdata) {
    // 		delete socket.handshake.session.userdata;
    // 		socket.handshake.session.save();
    // 	}
    // });

    var game = gamePool.getFreeGame();
    if(!game) {
        game = gamePool.createGame();
    }

    game.addPlayer(socket.handshake.session.id);

    if(game.ready()) {
        socket.emit('');
    }

    console.log('User id: ' + socket.handshake.session.id);
    console.log('Game id: ' + game.id + '\n');
});

server.listen(3000, function () {
	console.log('Listening 3000')
});
