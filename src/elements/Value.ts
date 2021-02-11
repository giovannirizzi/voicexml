
import { Element } from './';
import { ExecutionResult, IExecutable } from './interfaces';

class Value extends Element implements IExecutable{

	private readonly _expr;

	public static readonly TAG_NAME : string = 'value';

	constructor(tagName : string, attrs : {}, children : Array<Element>) {
		super(tagName, attrs, children);

		this._expr = this.attr('expr');
	}

	//TODO
	execute(result : ExecutionResult) {
	}

	get expr() {
		return this._expr;
	}

}

export {Value};