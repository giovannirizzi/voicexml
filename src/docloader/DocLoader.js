'use strict';

const fetcher = require('./fetcher');
const parser = require('./parser/');

class DocLoader {
	constructor() {}

	loadDocument(uri) {

        return fetcher.fetch(uri)
			.then(content => parser.parse(content))
			.catch(error => {

                //TODO REJECT WITH A CUSTOM ERROR
            });	
	}

}

module.exports = DocLoader;