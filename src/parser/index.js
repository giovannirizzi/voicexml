'use strict';

var connect = require('connect')
var serveStatic = require('serve-static');

var app = connect();
app.use(serveStatic("./test"));
app.listen(9000);


const fetcher = require('../fetcher');

const Parser = require('./Parser');
const parser = new Parser();

fetcher.fetch('http://localhost:9000/index.vxml')
    .then(data => parser.parse(data))
    .then(data => console.dir(JSON.stringify(data)));

