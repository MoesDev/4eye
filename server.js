
'use strict';
// var client = require('guidebox')
// var Guidebox = new client('4fdc1c317df16eac622649a5cf94f8b2b49b5e74');
// movies = Guidebox.movies.list();

var express  = require( 'express' ),
    bp       = require('body-parser'),
    path     = require( 'path' ),
    root     = __dirname,
    port     = process.env.PORT || 8000,
    app      = express(),
    pg       = require('pg');
// var mongoose = require('mongoose');
const db = new pg.Pool(require('./server/config/pg-orm.js'));
const base_routes = require('./server/config/routes.js')(db);
const logger = require('morgan');

app.use(logger('dev'));
app.use(bp.json());
app.use(bp.urlencoded({ extended: false }));
// require("./server/config/routes.js")(app);


app.use( express.static( path.join( root, 'client' )));
app.use( express.static( path.join( root, 'bower_components' )));


app.use('/', base_routes);

app.listen( port, function() {
  console.log( `server running on port ${ port }` );
});