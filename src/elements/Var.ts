import { Element } from './';
import { IExecutable, ExecutionResult } from './interfaces';

class Var extends Element implements IExecutable{

	private readonly _name;
	private readonly _expr;

	public static readonly TAG_NAME : string = 'var';

	constructor(tagName : string, attrs : {}, children : Array<Element>) {
		super(tagName, attrs, children);

		this._name = this.attr('name');
		this._expr = this.attr('expr');
	
	}
	execute(): ExecutionResult {
		return new ExecutionResult();
	}

	get name() {
		return this._name;
	}

	get expr() {
		return this._expr;
	}

}

export { Var };