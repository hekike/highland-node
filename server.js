var fs = require('fs');

var _ = require('highland');
var WebSocketServer = require('ws').Server;
var websocket = require('websocket-stream');
var wss = new WebSocketServer({ port: 3000 });
var readFile = _.wrapCallback(fs.readFile);

wss.on('connection', function(ws) {
  var wsStream = websocket(ws);

  _(['cats1.json', 'cats2.json'])
    .map(readFile)
    .sequence()    
    .pipe(wsStream);
});
