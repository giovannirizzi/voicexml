'use strict';

const Node = require('./Node');
const model = require('../model');
const fetcher = require('../fetcher/');

class Script extends Node {
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