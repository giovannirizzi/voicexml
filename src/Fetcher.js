'use strict';

const Bluebird = require('bluebird');
const fetch = require('node-fetch');
const winston = require('winston');
fetch.Promise = Bluebird;

class Fetcher {
	constructor() {}

	fetch(uri) {
		var text = fetch('https://raw.githubusercontent.com/paracycle/voicexml/master/test/index.vxml')
			.then(response => response.text());

		return text
	}
}

module.exports = Fetcher;