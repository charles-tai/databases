/* Import node's http module: */
var http = require('http');
var fs = require('fs');
var request = require('./request-handler');
var httpHelpers = require('./http-helpers');
var url = require('url')

// var request = require('./request-handler');

/* Every server needs to listen on a port with a unique number. The
 * standard port for HTTP servers is port 80, but that port is
 * normally already claimed by another server and/or not accessible
 * so we'll use a higher port number that is not likely to be taken: */
var port = 3000;

/* For now, since you're running this server on your local machine,
 * we'll have it listen on the IP address 127.0.0.1, which is a
 * special address that always refers to localhost. */
var ip = "127.0.0.1";

var serveIndex = function(request, response){
  console.log(request.url);
  fs.readFile('../client/index.html', function(err, data){
    var hdrs = httpHelpers.headers;
    hdrs['Content-Type'] = 'text/html';
    response.writeHead(200, hdrs);
    response.write(data);
    response.end();
  });
};

var routes = {
  '/classes/messages': request.handler,
  '/' : serveIndex,
};

var router = function(request, response) {
  console.log("Serving request type " + request.method + " for url " + request.url);

  var parsedUri = url.parse(request.url);
  console.log(parsedUri.pathname);
  var route = routes[parsedUri.pathname];
  if (route){
    route(request, response);
  } else {
    httpHelpers.sendResponse(response, null, 404);
  }
};

/* We use node's http module to create a server. Note, we called it 'server', but
we could have called it anything (myServer, blahblah, etc.). The function we pass it (handleRequest)
will, unsurprisingly, handle all incoming requests. (ps: 'handleRequest' is in the 'request-handler' file).
Lastly, we tell the server we made to listen on the given port and IP. */
var server = http.createServer(router);
console.log('Listening on http://' + ip + ':' + port);
server.listen(port, ip);



/* To start this server, run:
     node basic-server.js
 *  on the command line.

 * To connect to the server, load http://127.0.0.1:8080 in your web
 * browser.

 * server.listen() will continue running as long as there is the
 * possibility of serving more requests. To stop your server, hit
 * Ctrl-C on the command line. */
