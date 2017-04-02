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

var gamePool   = new (require('./gamePool'))();
var playerPool = new (require('./playerPool'))();


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, set-cookie");
    next();
});

app.use(session)

// Routes

.get('/login?', function(req, res) {
    var email = req.query.email;
    var pwd = req.query.password;

    console.log(email);
    console.log(pwd);

    var player = playerPool.getOrCreatePlayer();
    console.log('login');
    res.json({playerId: player.id});
})

.get('/logout', function(req, res) {
    var player = playerPool.getPlayer(req.query.playerId);
    if(player) {
        console.log('logout: ' + player.id);
        gamePool.removePlayer(player.id);
        playerPool.removePlayer(player);
    }
})

.get('/signIn', function(req, res) {
    var email = req.query.email;
    var password = req.query.password;
    var pseudo = req.query.pseudo;

    console.log(email);
    console.log(password);
    console.log(pseudo);

    var player = playerPool.getOrCreatePlayer();
    res.json({playerId: player.id});
})

.get('/players', function(req, res) {
    res.json(playerPool.players.values());
});


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
        socket.emit('setPlayerId', player.id); 
        console.log('User setted: ' + player.id);       
    });

    socket.on('invitation', function(userData) {
        execute(userData, function(player) {
            var invited = playerPool.getPlayer(userData.invited);
            if(invited && !invited.isPlaying()) {
                gamePool.sendInvitation(player, invited);
            }
        });
    });

    socket.on('invitationAnswer', function(userData) {
        execute(userData, function(player) {
            var invitation = gamePool.getInvitation(userData.invitation.id);
            if(invitation && invitation.invited == player && invitation.isValid()) {
                invitation.onAnswer(userData.invitation.answer); 
            }
        });
    });

    socket.on('searchGame', function(userData) {
        execute(userData, function(player) {
            var game;
            
            if(!(game = gamePool.getGame(userData.gameId))) {
                game = gamePool.getFreeGame();
            }

            if(game.canAdd(player)) {
                
                gamePool.addGamePlayer(game, player);

                if(game.isReady()) {
                    game.notifyReady();
                }
            } 
            else { 
                console.log('refresh de ' + player.id);
                game.refresh(player);
            }
        });
    });

    socket.on('action', function(userData) {
        execute(userData, function(player) {
            console.log('Action: ' + userData.actionId);
            console.log('Player: ' + player.id);
            console.log('Game: ' + userData.gameId);
            console.log();

            var game = gamePool.getGame(userData.gameId);
            if(game) {
                game.play(player, userData.actionId, function(game, winner) {
                    gamePool.onGameFinished(game, winner);
                });
            }
        });
    });
});


server.listen(3000, function () {
    console.log('Listening on port 3000\n\n\n');
});
