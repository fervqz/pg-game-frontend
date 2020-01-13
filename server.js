const http = require('http');
const fs = require('fs');
const port = 9001;

const mimeType = {
  'html': 'text/html',
  'js': 'text/javascript',
  'json': 'application/json',
  'css': 'text/css',
  'ttf': 'aplication/font-sfnt',
  'ico': 'image/x-icon',
  'png': 'image/png',
  'jpg': 'image/jpeg',
  'wav': 'audio/wav',
  'mp3': 'audio/mpeg',
  'svg': 'image/svg+xml',
  'pdf': 'application/pdf',
  'doc': 'application/msword',
  'eot': 'appliaction/vnd.ms-fontobject',
  'gif': 'image/gif',
  'mp3': 'audio/mp3'
};

const getLastItem = array => array[array.length - 1]

const server = http.createServer((req, res) => {

  const file = req.url === "/" ? "/index.html" : req.url;
  const pathname = __dirname + file;
  const fileExtension = getLastItem(pathname.split("."));

  fs.readFile(pathname, function (err, data) {

    if (err) {
      res.statusCode = 404;
      res.end("File not found");
    } else {
      res.setHeader('Content-type', mimeType[fileExtension]);
      res.end(data);
    }
  });
});

server.listen(parseInt(port));
console.log(`Server listening on port ${port}`);