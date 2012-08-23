var express = require('express');

var app = express();
app.use(express.favicon());
app.use(express['static'](__dirname));
app.use(express.directory(__dirname));

if(!module.parent){
    app.use(express.logger());
    app.listen(5000);
    console.log('Test server started on port 5000');
}else{
    module.exports = app;
}