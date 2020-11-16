'use strict';

console.log("ciao");

const Fetcher = require('./Fetcher');

module.exports = {
	Fetcher: Fetcher
};

var fetcher = new Fetcher;
fetcher.fetch("https://www.google.i")
    .then(content => console.log(content));
    //.catch(error => console.dir(error.toJSON()));

