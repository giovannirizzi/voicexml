
class FetchError {

    private readonly _message;
    private readonly _uri;

    public static readonly EVENT_TYPE = 'error.fetch';

	constructor(message : string, uri : string) {

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

export { FetchError };