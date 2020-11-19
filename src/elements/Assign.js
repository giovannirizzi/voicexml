'use strict';

const Node = require('./Node');
const model = require('../model');

class Assign extends Node {
	constructor(tagName, attrs, children) {
		super(tagName, attrs, children);

		this._name = this.attr('name');
		this._expr = this.attr('expr');
	}

	get name() {
		return this._name;
	}

	get expr() {
		return this._expr;
	}

	execute() {
		model.assign(this.name, model.evaluate(this.expr));
	}
}

Assign.TAG_NAME = 'assign';

module.exports = Assign;