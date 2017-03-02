const Session       = require('express-session');
const MemoryStore   = require('session-memory-store')(Session);
const Utils         = require('./utils');


var app     = require('express')();
var server  = require('http').createServer(app);
var io      = require('socket.io')(server);
var session = Session({
        secret: 'MY-SECRET-TO-CHANGE',         
        resave: true,
        saveUninitialized: true
    });

app.use(session)

// Routes

.get('/play/:gameId', function(req,res) {
	res.end();
});


var gamePool   = new (require('./gamePool'))();
var playerPool = new (require('./playerPool'))();

io.on('connection', function(socket) {

    socket.on('play', function(userData) {
        var player;
        if(!userData || !(player = playerPool.getPlayer(userData.id))) {
            console.log('user created');
            player = playerPool.createPlayer();
        }
        console.log('playerId: ' + player.id);
        socket.emit('setPlayerId', player.id);        
    });

    // socket.on('searchGame', function(userData) {
    //     userData
    // });

    // socket.on('logout', function(userdata) {
    //  if (socket.handshake.session.userdata) {
    //      delete socket.handshake.session.userdata;
    //      socket.handshake.session.save();
    //  }
    // });



    // var userId = Utils.Guid();

    // var game = gamePool.getFreeGame();
    // if(!game) {
    //     game = gamePool.createGame();
    // }

    // game.addPlayer(userId);

    // if(game.ready()) {
    //     socket.emit('ready');
    // }
});


server.listen(3000, function () {
    console.log('Listening 3000');
});
