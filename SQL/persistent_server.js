var mysql = require('mysql');
var chatServer = require('../server/basic-server');
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
  dbConnection.query('INSERT INTO User SET ?', user, function(err, result) {
    console.log('user inserted');
  });
};

exports.insertMessage = function(message){
  var userId;
  console.log('USERNAME: ' + message.username);
  dbConnection.query('SELECT id FROM User WHERE username = ' + dbConnection.escape(message.username), function(err, result){
    userId = result[0];
    console.log(result);
  });
  var text = {Text: message.text, CreatedAt: new Date(), id_User: userId};
  dbConnection.query('INSERT INTO Messages SET ?', text, function(err, result) {
    console.log('user inserted');
  });
};

exports.insertRoom = function(message){
  var userId;
  dbConnection.query('SELECT id FROM User WHERE username = ' + dbConnection.escape(message.username), function(err, result){
    userId = result[0];
    console.log(result);
  });
  var room = {roomname: message.roomname, id_User: userId};
  dbConnection.query('INSERT INTO Room SET ?', room, function(err, result) {
    console.log('user inserted');
  });
};
