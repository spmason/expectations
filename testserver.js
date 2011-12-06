var express = require('express');

var app = express.createServer(
    express.logger(),
    express['static'](__dirname),
    express.directory(__dirname)
);

app.listen(5000);
console.log('Test server started on port 5000');