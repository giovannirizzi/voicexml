'use strict';

const Form = require('./Form');
const Menu = undefined; //require('./Menu');

class Document {
	constructor(vxmlElement) {
    
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
