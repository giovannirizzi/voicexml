'use strict';

import { Element } from './';
import model from '../model';

class Var extends Element {

	private readonly _name;
	private readonly _expr;

	public static readonly TAG_NAME : string = 'var';

	constructor(tagName : string, attrs : {}, children : Array<Element>) {
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

export { Var };