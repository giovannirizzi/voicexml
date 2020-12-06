import { Dialog } from "../elements";

class GotoNextFormEvent {

	private readonly _nextForm;

	constructor(nextForm : string) {
		this._nextForm = nextForm;
	}

	get nextForm() {
		return this._nextForm;
	}
}

export { GotoNextFormEvent };