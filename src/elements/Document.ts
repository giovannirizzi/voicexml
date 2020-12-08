
import {Dialog, Vxml} from './';

class Document {

	private readonly _vxml : Vxml;
	private _dialogs : Array<Dialog>;

	constructor(vxmlElement : Vxml) {
    
		this._vxml = vxmlElement;

		this._dialogs = this._vxml
				.children
				.filter(node => node instanceof Dialog) as Array<Dialog>;
	}

	get dialogs() {
		return this._dialogs;
	}

	getDialogById(id : string) : Dialog | undefined{
		return this.dialogs.find(dialog => dialog.id === id);
	}

}

export { Document };
