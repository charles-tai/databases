var mysql = require('mysql');
var chatServer = require('../server/basic-server');
var httpHelpers = require('../server/http-helpers');
/* If the node mysql module is not found on your system, you may
 * need to do an "sudo npm install -g mysql". */

/* You'll need to fill the following out with your mysql username and password.
 * database: "chat" specifies that we're using the database called
 * "chat", which we created by running schema.sql.*/
var dbConnection = mysql.createConnection({
  user: "tootsie",
  password: "rolls",
  database: "chat"
});

dbConnection.connect();
/* Now you can make queries to the Mysql database using the
 * dbConnection.query() method.
 * See https://github.com/felixge/node-mysql for more details about
 * using this module.*/

/* You already know how to create an http server from the previous
 * assignment; you can re-use most of that code here. */


exports.insertUser = function(message){
  var user = {username: message.username};
  dbConnection.query('SELECT id FROM User WHERE username = ' + dbConnection.escape(message.username), function(err, result){
    if (!result.length){
      dbConnection.query('INSERT INTO User SET ?', user, function(err, result) {
        console.log('user inserted');
        insertRoom(message);
      });
    } else {
      insertRoom(message);
    }
  });
};

var insertMessage = function(message){
  dbConnection.query('SELECT id FROM User WHERE username = ' + dbConnection.escape(message.username), function(err, result){
    var userId = result[0].id;
    dbConnection.query('SELECT id FROM Room WHERE roomname = '+ dbConnection.escape(message.roomname), function(err, result){
      var roomId = result[0].id;
      var text = { Text: message.text, CreatedAt: new Date(), id_User: userId, id_Room: roomId };
      dbConnection.query('INSERT INTO Messages SET ?', text, function(err, result) {
        console.log('message inserted');
      });
    });
  });
};

var insertRoom = function(message){
  dbConnection.query('SELECT id FROM User WHERE username = ' + dbConnection.escape(message.username), function(err, result){
    var userId = result[0].id;
    var room = { roomname: message.roomname, id_User: userId };
    dbConnection.query('SELECT id FROM Room WHERE roomname = ' + dbConnection.escape(message.roomname), function(err, result){
      if (!result.length){
        dbConnection.query('INSERT INTO Room SET ?', room, function(err, result) {
          console.log('room inserted');
          insertMessage(message);
        });
      } else {
        insertMessage(message);
      }
    });
  });

};

exports.getMessages = function(response){
  var users, rooms, messages;
  dbConnection.query('SELECT username, id FROM User', function(err, results){
    if (err) { return; }
    users = results;
    dbConnection.query('SELECT roomname, id_User, id FROM Room', function(err, results){
      rooms = results;
      dbConnection.query('SELECT Text, CreatedAt, id_User, id_Room FROM Messages', function(err, results){
        messages = results;
        console.log(messages);
        for (var i = 0; i < messages.length; i++){
          for (var k = 0; k < users.length; k++){
            for (var y = 0; y < rooms.length; y++){
              // console.log('message user id: ', messages[i].id_User);
              // console.log('user id: ', users[k]);
              // console.log('message id: ', messages[i].id);
              // console.log('room message id: ', rooms[y].id_Message);
              // console.log('END');
              if (messages[i].id_User === users[k].id && messages[i].id_Room === rooms[y].id) {

                // console.log('username: ', users[k].username);
                // console.log('roomname: ', rooms[y].roomname);
                messages[i].username = users[k].username;
                messages[i].roomname = rooms[y].roomname;
                // console.log('-------roomname and username addition to the message------------------')
                // console.log('messages: ', messages[i]);
                // console.log('END');
              }
            }
          }
        }
        httpHelpers.sendResponse(response, {results: messages});
      });
    });
  });

};
