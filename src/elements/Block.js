'use strict';

const uuid = require('uuid');
const Element = require('./Element');
const model = require('../model');
const Scope = require('../Scope');
const FormItem = require('./FormItem');

class Block extends FormItem {
	constructor(tagName, attrs, children) {
		super(tagName, attrs, children);

	}

	execute() {
		try {
			this.setVisited();

			model.pushScope(Scope.ANONYMOUS);
			this.children.forEach(child =>  child.execute());
		} finally {
			model.popScope(Scope.ANONYMOUS);
		}
	}
}

Block.TAG_NAME = 'block';

module.exports = Block;