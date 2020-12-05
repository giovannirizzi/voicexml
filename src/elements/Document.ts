'use strict';

import Form from './Form';
import Vxml from './Vxml';

const Menu = undefined; //require('./Menu');

class Document {

	private readonly _vxml : Vxml;
	private _dialogs : Dialogs[];

	constructor(vxmlElement : Vxml) {
    
		this._vxml = vxmlElement;
	}

	get dialogs() {
		if (!this._dialogs) {
			this._dialogs = this._vxml
				.children
				.filter(node => node.oneOf(Form, Menu));
		}

		return this._dialogs;
	}

	getDialogById(id) {
		return this.dialogs.find(dialog => dialog.id === id);
	}

}

module.exports = Document;
