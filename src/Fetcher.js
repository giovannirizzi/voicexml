'use strict';

const axios = require('axios');
const path = require('path')
const fsp = require('fs').promises;

class Fetcher {
	constructor() {}

	fetch(uri) {
			return axios.get(uri)
				.then(response => response.data);
	}

}

module.exports = Fetcher;