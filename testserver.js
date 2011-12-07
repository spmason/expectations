var express = require('express');

var app = express.createServer(
    express.favicon(),
    express['static'](__dirname),
    express.directory(__dirname)
);

if(!module.parent){
    app.use(express.logger());
    app.listen(5000);
    console.log('Test server started on port 5000');
}else{
    module.exports = app;
}