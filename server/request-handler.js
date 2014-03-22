var httpHelpers = require('./http-helpers');
var connection = require('../SQL/persistent_server');


var messages = [{
  username: 'Josh',
  text: 'Hello Everyone',
  roomname: 'KitKat'
}];

var getMessages = function(request, response) {
  httpHelpers.sendResponse(response, {results: messages});
};

var postMessage = function(request, response) {

  httpHelpers.collectData(request, function(data) {
    var message = JSON.parse(data);
    connection.insertUser(message);
    connection.insertMessage(message);
    connection.insertRoom(message);
    messages.push(message);
    httpHelpers.sendResponse(response, null, 201);
  });
};

var options = function(request, response){
  httpHelpers.sendResponse(response);
};

var actions = {
  'GET' : getMessages,
  'POST': postMessage,
  'OPTIONS': options
};

exports.handler = function(request, response) {
  var action = actions[request.method];
  if (action){
    action(request, response);
  } else {
    httpHelpers.sendResponse(response, null, 404);
  }
};
