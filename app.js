var util = require('util');
var stream = require('stream');

var _ = require('highland');
var websocket = require('websocket-stream');

var catWS = websocket('ws://localhost:3000');
var toConsole = new stream.Writable({ objectMode: true });
toConsole._write = function (data, encoding, done) {
  console.log(data);
  done();
};

_(catWS)
  .map(JSON.parse)
  .sequence()
  .filter(function (cat) {
    return cat.age < 3;
  })
  .map(util.format)
  .pipe(toConsole);
