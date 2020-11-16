'use strict';

const EVENT_TYPE = 'error.fetch';

class FetchError {
	constructor(message, uri) {
        this._message = message;
        this._uri = uri;
    }
    get message(){
        return this._message;
    }

    get uri(){
        return this._uri;
    }
}

module.exports = FetchError;