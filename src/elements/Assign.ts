import model from '../model';
import { Element } from '.';

class Assign extends Element {

	private readonly _name;
	private readonly _expr;

	public static readonly TAG_NAME : string = 'assign';

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
		model.assign(this.name, model.evaluate(this.expr));
	}
}

export { Assign };