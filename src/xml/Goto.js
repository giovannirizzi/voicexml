'use strict';

const winston = require('winston');

const Node = require('./Node');
const model = require('../model');
const Events = require('../event/');

class Goto extends Node {
	constructor(node, children) {
		super(node, children);

		this._next = this._attrs.next;
		this._nextItem = this._attrs._nextItem;
		this._expr = this._attrs._expr;
		this._exprItem = this._attrs._exprItem;
	}
		
	get next() {
		return this._next;
	}

	get nextItem() {
		return this._nextItem;
	}

	get expr() {
		return this._expr;
	}

	get exprItem() {
		return this._exprItem;
	}

	execute() {
	
		if ([this.next, this.nextItem, this.expr, this.exprItem].filter(v => v).length > 1) {
			throw new Events.Errors.BadFetchError(`one of 'next', 'nextItem', 'expr' or 'exprItem' should be specified.`);
		}

		var nextItem = this.nextItem || model.evaluate(this.exprItem);
		var next = this.next || model.evaluate(this.expr);

		if (nextItem) {
			throw new Events.GotoNextFormItemEvent(nextItem);
		}

		if (next !== undefined && next.startsWith('#')) {
			winston.debug("GotoNextFormEvent");
			throw new Events.GotoNextFormEvent(next.substring(1));
		} else {
			throw new Events.GotoNextDocumentEvent(next);
		}
	}
}

Goto.TAG_NAME = 'goto';

module.exports = Goto;