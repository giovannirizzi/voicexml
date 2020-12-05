'use strict';

const Element = require('./Element');
const model = require('../model');
const promptPlayer = require('../promptPlayer');

class Value extends Element {
	constructor(tagName, attrs, children) {
		super(tagName, attrs, children);

		this._expr = this.attr('expr');
	}

	get expr() {
		return this._expr;
	}

	execute(player = promptPlayer) {
		player(` ${model.evaluate(this.expr)} `);
	}
}

Value.TAG_NAME = 'value';

module.exports = Value;