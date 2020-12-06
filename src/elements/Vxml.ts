'use strict';

import { Element } from './';

class Vxml extends Element {

	private readonly _version: string;
	private readonly _base: string;
	private readonly _lang : string;
	private readonly _application : string;

	public static readonly TAG_NAME : string = 'vxml';

	constructor(tagName : string, attrs : {}, children : Array<Element>) {
		super(tagName, attrs, children);

		this._version = this.attr('version');
		this._base = this.attr('base');
		this._lang = this.attr('lang');
		this._application = this.attr('application');
	}

	get version() {
		return this._version;
	}

	get base() {
		return this._base;
	}

	get lang() {
		return this._lang;
	}

	get application() {
		return this._application;
	}
}

export { Vxml };
