'use strict';

const Node = require('./Node');
const model = require('../model');

class Var extends Node {
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
		model.create(this.name, model.evaluate(this.expr));
	}
}

Var.TAG_NAME = 'var';

module.exports = Var;