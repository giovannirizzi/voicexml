'use strict';

const Element = require('./Element');
const model = require('../model');
const fetcher = require('../docloader/fetcher/');

class Script extends Element {
	constructor(tagName, attrs, children) {
		super(tagName, attrs, children);

		this._src = this.attr('src');
	}

	get src() {
		return this._src;
	}

	execute() {
		if (this.src) {
			fetcher.fetch(this.src)
			.then(data => this._evaluate(data))
			.catch(error => {});
		} else {
			this._evaluate();
		}
	}

	_evaluate(script = this.text) {
		model.evaluate(script);
	}
}

Script.TAG_NAME = 'script';

module.exports = Script;