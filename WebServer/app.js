/**
 * app.js
 *
 * Use `app.js` to run your app without `sails lift`.
 * To start the server, run: `node app.js`.
 *
 * This is handy in situations where the sails CLI is not relevant or useful.
 *
 * For example:
 *   => `node app.js`
 *   => `forever start app.js`
 *   => `node debug app.js`
 *   => `modulus deploy`
 *   => `heroku scale`
 *
 *
 * The same command-line arguments are supported, e.g.:
 * `node app.js --silent --port=80 --prod`
 */

// Ensure we're in the project directory, so relative paths work as expected
// no matter where we actually lift from.
process.chdir(__dirname);

// Ensure a "sails" can be located:
(function () {
	process.on('uncaughtException', function(err) {
	  console.log('Caught exception: ' + err);
	});

    var sails;
    try {
        sails = require('sails');
    } catch (e) {
        console.error('To run an app using `node app.js`, you usually need to have a version of `sails` installed in the same directory as your app.');
        console.error('To do that, run `npm install sails`');
        console.error('');
        console.error('Alternatively, if you have sails installed globally (i.e. you did `npm install -g sails`), you can use `sails lift`.');
        console.error('When you run `sails lift`, your app will still use a local `./node_modules/sails` dependency if it exists,');
        console.error('but if it doesn\'t, the app will run with the global sails instead!');
        return;
    }

    // Try to get `rc` dependency
    var rc;
    try {
        rc = require('rc');
    } catch (e0) {
        try {
            rc = require('sails/node_modules/rc');
        } catch (e1) {
            console.error('Could not find dependency: `rc`.');
            console.error('Your `.sailsrc` file(s) will be ignored.');
            console.error('To resolve this, run:');
            console.error('npm install rc --save');
            rc = function () {
                return {};
            };
        }
    }


    // Start server
    sails.lift(rc('sails'), function () {
        sails.webSocketServer = require('ws').Server;
        sails.wss = new sails.webSocketServer({port: 1338});
        sails.loggedInServers = [];
        sails.registeredServers = [];

        setInterval(function () {
            console.log("Logged in servers: " + sails.loggedInServers.length);
            console.log("Registered servers: " + sails.registeredServers.length);
        }, 5000)

        function authCheckServer(ws) {
            if (!ws.loggedInAsServer) throw "Not logged in";
        }

        var bcrypt = require('bcrypt');

        function login(ws, userObj) {
            if (sails.loggedInServers.indexOf(ws) < 0) {
                // TODO: connect with user model.
                User.findOneByEmail(userObj.email, function foundUser(err, user) {
                    bcrypt.compare(userObj.password, user.passwordHash, function (err, valid) {
                        if (err) {
                            ws.send('{"status":"error","action":"login"}');
                            throw "Invalid login credentials";
                        }
                        console.log("Login success")
                        ws.loggedIn = true;

                        if (user.type == User.UserType.gameServer) {
                            ws.loggedInAsServer = true;
                            ws.User=user;
                            sails.loggedInServers.push(ws);
                        }
                    });
                });
            }
        }
		
		function analytics(ws, gameAnalytics) {
			
		}

        function logout(ws) {
            try {
                delete ws.loggedInAsServer;
                sails.loggedInServers.splice(sails.loggedInServers.indexOf(ws), 1);
            } catch (e) {
                ws.send('{"status":"error","action":"logout"}');
                throw "Unable to logout";
            }
        }

        var socketId = 0;

        function register(ws, message) {
            if (sails.registeredServers.indexOf(ws) < 0) {
                ws.registered = true;
                ws.socketId = socketId++;
                ws.port = message.port;
                ws.map = message.map;
                ws.connectedPlayers = message.connectedPlayers;
                sails.registeredServers[ws.socketId] = ws;
            } else {
                ws.send('{"status":"error","action":"register"}');
                throw "Error registering";
            }
        }

        function unregister(ws) {
            try {
                delete ws.registered;
		sails.registeredServers.splice(sails.registeredServers.indexOf(ws), 1);
            } catch (e) {
                ws.send('{"status":"error","action":"unregister"}');
                throw "Error unregistering";
            }
        }

        function updateConnectedPlayers(ws) {
            if(ws.registered){
                ws.connectedPlayers = ws.connectedPlayers;
            } else {
                ws.send('{"status":"error","action":"updateConnectedPlayers"}');
                throw "Error updating players";
            }
        }


        sails.wss.on('connection', function (ws) {
            ws.on('message', function (message) {
                console.log('received: %s', message);
                message = JSON.parse(message);
                try {
                    switch (message.action) {
                        case "login":
                            // TODO add login param like name
                            var userObj = {email: message.email, password: message.password}
                            login(ws, userObj);
                            ws.send('{"status":"ok","action":"login"}');
                            break;
                        case "logout":
                            authCheckServer(ws);
                            logout(ws);
                            ws.send('{"status":"ok","action":"logout"}');
                            break;
                        // Waiting for players!
                        case "register":
                            // TODO add map param
                            authCheckServer(ws);
                            register(ws, message);
                            ws.send('{"status":"ok","action":"register"}');
                            break;
                        case "unregister":
                            authCheckServer(ws);
                            unregister(ws);
                            ws.send('{"status":"ok","action":"unregister"}');
                            break;
                        case "list":
                            // Ip address is at ws._socket.remoteAddress & remotePort or
                            // if router through nginx, use
                            // socket.upgradeReq.headers['x-forwarded-for'] || socket.upgradeReq.connection.remoteAddress
                            // could also use ws._socket.address()
                            console.log("==Logged In Servers==")
                            console.log(sails.loggedInServers)

                            console.log("==Registered In Servers==")
                            console.log(sails.registeredServers)
                            var servers = []
                            for(var x in sails.registeredServers){
                                servers.push({
                                    name:sails.registeredServers[x].User.name,
                                    ip:sails.registeredServers[x]._socket.remoteAddress,
                                    port:sails.registeredServers[x].port,
                                    map:sails.registeredServers[x].map,
                                    connectedPlayers:sails.registeredServers[x].connectedPlayers,
                                    id:sails.registeredServers[x].socketId
                                });
                            }
                            ws.send('{"status":"ok","servers":'+JSON.stringify(servers)+',"action":"list"}');
                            break;
                        case "updateConnectedPlayers":
                            authCheckServer(ws);
                            updateConnectedPlayers(ws);
                            ws.send('{"status":"ok","action":"updateConnectedPlayers"}');
                            break;
						case "analytics":
							var gameAnalytics = {freezeShootCount: message.freezeShootCount, freezeOpponentCount: message.freezeOpponentCount, superSpeedCount: message.superSpeedCount, unfreezeTeammateCount: message.unfreezeTeammateCount};
							console.log('game analytics: %s', gameAnalytics);
							analytics(ws, gameAnalytics);
							break;
                    }
                } catch (e) {
                    console.log("Error: " + e)
                }
            });
            ws.on('close', function () {
                try {
                    unregister(ws)
                    logout(ws)
                } catch (e) {
                    console.log("Error: " + e)
                }
            });
        });
    });
})();