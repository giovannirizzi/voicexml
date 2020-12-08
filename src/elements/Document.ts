
import DocumentState from '../datatypes/DocumentState';
import {Dialog, Vxml} from './';

class Document {

	private readonly _vxml : Vxml;
	private _dialogs : Array<Dialog>;
	private _initialState : DocumentState;

	constructor(vxmlElement : Vxml) {
    
		this._vxml = vxmlElement;
		
		this._initialState = new DocumentState();

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

	get initialState(){
		return this._initialState;
	}

}

export { Document };
