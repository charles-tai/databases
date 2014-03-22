exports.headers = {
  'Content-Type': 'application/json',
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};

exports.sendResponse = function(response, object, statuscode){
  statuscode = statuscode || 200;
  response.writeHead(statuscode, exports.headers);
  response.end(JSON.stringify(object));
};

exports.collectData = function(request, callback){
  var data = '';
  request.on('data', function(chunk){
    data += chunk;
  });
  request.on('end', function(){
    callback(data);
  });
};
