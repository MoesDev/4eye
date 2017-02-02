var express  = require( 'express' ),
    bp       = require('body-parser'),
    path     = require( 'path' ),
    root     = __dirname,
    port     = process.env.PORT || 8000,
    app      = express(),
    pg       = require('pg');
// var mongoose = require('mongoose');
// const db = new pg.Pool(require('./server/config/pg-orm.js'));
// const base_routes = require('./server/config/routes.js')(db);
const logger = require('morgan');

app.use(logger('dev'));
app.use(bp.json());
app.use(bp.urlencoded({ extended: false }));
// require("./server/config/routes.js")(app);

require('./server/routes')(app);
app.use( express.static( path.join( root, 'client' )));
app.use( express.static( path.join( root, 'bower_components' )));

app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning of everything backend.',
}));




module.exports = app;