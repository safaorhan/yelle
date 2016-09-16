// production.js
var deployd = require('deployd');

var server = deployd({
  port: process.env.PORT || 80,
  env: 'production',        // Change to development to remove the dashboard auth.
  db: {
    host: 'localhost',      // Our mongo instance runs in our server itself. Remember? (127.0.0.1)
    port: 27017,            // Update this line,
    name: 'dbname',         // this line,
    credentials: {
      username: 'username',  // this line,
      password: 'password'   // and this line.
    }
  }
});

server.listen();

server.on('listening', function() {
  console.log("Server is listening");
});

server.on('error', function(err) {
  console.error(err);
  process.nextTick(function() { // Give the server a chance to return an error
    process.exit();
  });
});
