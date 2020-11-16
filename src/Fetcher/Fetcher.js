'use strict';

const axios = require('axios');
const FetchError = require('../events/errors/FetchError');

class Fetcher {
	constructor() {}

	fetch(uri) {
			return axios.get(uri)
				.then(response => response.data)
				.catch(error => {
					return Promise.reject(
						new FetchError(error.message, uri)
						);
				});;
	}

}

module.exports = Fetcher;