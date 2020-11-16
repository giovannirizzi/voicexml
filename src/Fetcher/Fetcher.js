'use strict';

const axios = require('axios');

class Fetcher {
	constructor() {}

	fetch(uri) {
			return axios.get(uri)
				.then(response => response.data);
	}

}

module.exports = Fetcher;