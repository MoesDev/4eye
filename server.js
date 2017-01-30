var express = require('express');
var app = express();
var path = require('path');
var bodyparser = require('body-parser');

var client = require('guidebox')
var Guidebox = new client('4fdc1c317df16eac622649a5cf94f8b2b49b5e74');
movies = Guidebox.movies.list();

app.use(bodyparser.json());
app.use(express.static(path.join(__dirname, "./client")));
app.use(express.static(path.join(__dirname, './bower_components')));


app.listen(8000, function(){
    console.log('listening on port 8000');
});