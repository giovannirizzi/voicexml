'use strict';

const Dialog = require('./Dialog');

class Form extends Dialog {

	public static readonly TAG_NAME : string = 'form';

	constructor(tagName : string, attrs : {}, children : Array<Element>) {
		super(tagName, attrs, children);
	}

}

export {Form};