
import { Element } from './';
import model from '../model';
import promptPlayer from '../promptPlayer';

class Value extends Element {

	private readonly _expr;

	public static readonly TAG_NAME : string = 'value';

	constructor(tagName : string, attrs : {}, children : Array<Element>) {
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

export {Value};