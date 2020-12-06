
class GotoNextDocumentEvent {

	private readonly _uri;

	constructor(uri : string) {
		this._uri = uri;
	}

	get uri() {
		return this._uri;
	}
}

export { GotoNextDocumentEvent };