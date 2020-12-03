'use strict';

const uuid = require('uuid');
const Dialog = require('./Dialog');

class Form extends Dialog {
	constructor(tagName, attrs, children) {
		super(tagName, attrs, children);

	
	}

}

Form.TAG_NAME = 'form';

module.exports = Form;