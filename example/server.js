// dependencies
var express = require('express')
  , fs = require('fs')
  , path = require('path')
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
app.use('/components', express.static(path.join(__dirname, '..', 'bower_components')));
app.use('/dist', express.static(path.join(__dirname, '..', 'dist')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.get('/*', function (req, res) {
  res.sendfile(index);
});

app.listen(port, function () {
  console.log('Listening on port ' + port);
});