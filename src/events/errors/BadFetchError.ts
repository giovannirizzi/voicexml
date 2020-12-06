
class BadFetchError {

	private readonly _message;

	public static readonly EVENT_TYPE = 'error.badfetch';

	constructor(message : string) {
		this._message = message;
	}

	get message(){
		return this._message;
	}
}

export { BadFetchError };