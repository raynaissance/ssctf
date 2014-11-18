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
(function() {
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
      rc = function () { return {}; };
    }
  }


  // Start server
  sails.lift(rc('sails'), function(){
      sails.webSocketServer = require('ws').Server;
      sails.wss = new sails.webSocketServer({port: 1338});
      sails.loggedInServers = [];
      sails.registeredServers = [];

      setInterval(function(){
          console.log("Logged in servers: "+sails.loggedInServers.length);
          console.log("Registered servers: "+sails.registeredServers.length);
      }, 5000)

      function authCheck(ws){
          if(!ws.loggedIn) throw "Not logged in";
      }
      function login(ws){
          if (sails.loggedInServers.indexOf(ws) < 0) {
              // TODO: connect with user model.
              ws.loggedIn = true;
              sails.loggedInServers.push(ws);
          }
      }
      function logout(ws){
          delete ws.loggedIn;
          sails.loggedInServers.splice(sails.loggedInServers.indexOf(ws), 1);
      }
      function register(ws){
          if (sails.registeredServers.indexOf(ws) < 0) {
              ws.registered = true;
              sails.registeredServers.push(ws);
          }
      }
      function unregister(ws){
          delete ws.registered;
          sails.registeredServers = sails.registeredServers.splice(sails.registeredServers.indexOf(ws), 1);
      }



      sails.wss.on('connection', function(ws) {
          ws.on('message', function(message) {
              console.log('received: %s', message);
              message = JSON.parse(message);
              try {
                  switch (message.action) {
                      case "login":
                          login(ws);
                          ws.send('{"status":"ok"}');
                          break;
                      case "logout":
                          authCheck(ws);
                          logout(ws);
                          ws.send('{"status":"ok"}');
                          break;
                      // Waiting for players!
                      case "register":
                          authCheck(ws);
                          register(ws);
                          ws.send('{"status":"ok"}');
                          break;
                      case "unregister":
                          authCheck(ws);
                          unregister(ws);
                          ws.send('{"status":"ok"}');
                          break;
                      case "list":
                          console.log("==Logged In Servers==")
                          console.log(sails.loggedInServers)

                          console.log("==Registered In Servers==")
                          console.log(sails.registeredServers)
                          break;
                  }
              } catch(e){
                  console.log("Error: "+e)
              }
          });
          ws.on('close', function() {
              try {
                  unregister(ws)
                  logout(ws)
              } catch(e) {
                  console.log("Error: "+e)
              }
          });
      });
  });
})();