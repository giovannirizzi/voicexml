

import axios from 'axios';
import { FetchError } from '../../events/errors';

class Fetcher {
	constructor() {}

	fetch(uri : string) {

		return axios.get(uri)
			.then(response => response.data)
			.catch(error => {
				return Promise.reject(
					new FetchError(error.message, uri)
					);
			});
	}
}

export = Fetcher;