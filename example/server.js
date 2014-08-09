// dependencies
var express = require('express')
  , fs = require('fs')
  , app
  , port
  , index;

port = Number(process.env.PORT || 8080);

if ( ! fs.existsSync('index.html')) {
  index = './example/index.html';
} else {
  index = './index.html';
}

app = express();
app.get('/*', function (req, res) {
  res.sendfile(index);
});

app.listen(port, function () {
  console.log('Listening on port ' + port);
});