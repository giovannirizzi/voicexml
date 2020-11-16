'use strict';

const winston = require('winston');

winston.level = process.env['LEVEL'] || 'debug';

/* Start the web server to serve vxml files */
var connect = require('connect')
var serveStatic = require('serve-static');

var app = connect();
app.use(serveStatic("./test"));
app.listen(9000);


const session = new (require('./src/Session'))();

const uri = process.argv[2] || 'http://localhost:9000/index.vxml';

session.call(uri);