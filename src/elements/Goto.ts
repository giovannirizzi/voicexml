'use strict';

import { Element } from '.';
import * as Events from '../events';
import logger from '../logger';
import { IExecutable , isExecutable, ExecutionResult} from './interfaces';


class Goto extends Element {

	private readonly _next;
	private readonly _nextItem;
	private readonly _expr;
	private readonly _exprItem;

	public static readonly TAG_NAME : string = 'goto';
	
	constructor(tagName : string, attrs : {}, children : Array<Element>) {
		super(tagName, attrs, children);

		this._next = this.attr('next');
		this._nextItem = this.attr('nextItem');
		this._expr =  this.attr('expr');
		this._exprItem = this.attr('exprItem');
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

	execute() : ExecutionResult {
	

		var res = new ExecutionResult();
		/*if ([this.next, this.nextItem, this.expr, this.exprItem].filter(v => v).length > 1) {
			throw new Events.Errors.BadFetchError(`one of 'next', 'nextItem', 'expr' or 'exprItem' should be specified.`);
		}

		var nextItem = this.nextItem || model.evaluate(this.exprItem);
		var next = this.next || model.evaluate(this.expr);
		*/

		if (this._nextItem) {
			res.nextFormItem = this._nextItem;
		}

		/*
		if (next !== undefined && next.startsWith('#')) {
			throw new Events.GotoNextFormEvent(next.substring(1));
		} else {
			throw new Events.GotoNextDocumentEvent(next);
		}*/

		return res;
	}
}

export {Goto};