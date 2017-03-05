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

    var execute = function(userData, callback) {
        userData = userData || {};
        var player = playerPool.getPlayer(userData.id);
        if(player) {
            playerPool.addPlayerSocket(player, socket);
            callback(player);
        }
        else console.log('Unknown user id: ' + userData.id);
    };

    socket.on('disconnect', function() {
        playerPool.removeSocket(socket);
    });

    socket.on('play', function(userData) {
        userData = userData || {};
        var player = playerPool.getOrCreatePlayer(userData.id, socket);
        console.log('playerId: ' + player.id);
        socket.emit('setPlayerId', player.id);        
    });

    socket.on('searchGame', function(userData) {
        console.log('searchGame');
        execute(userData, function(player) {
            var game;
            
            if(!(game = gamePool.getGame(userData.gameId))) {
                game = gamePool.getFreeGame();
            }

            if(game.canAdd(player)) {
                
                game.addPlayer(player);

                if(game.isReady())
                    game.notifyReady();
            } 
            else { 
                console.log('refresh');
                game.refresh(player);
            }
            
            console.log('gameSent: ' + game.id);
        });
    });
});


server.listen(3000, function () {
    console.log('Listening on port 3000\n\n\n');
});
