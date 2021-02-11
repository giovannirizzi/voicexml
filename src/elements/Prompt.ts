import { Element, Text } from '.';  
import logger from '../logger';
import { IExecutable , isExecutable, ExecutionResult} from './interfaces';

class Prompt extends Element implements IExecutable{

	private readonly _bargeIn;
	private readonly _bargeInType;
	private readonly _cond;
	private readonly _count;
	private readonly _timeout;

	public static readonly TAG_NAME : string = 'prompt';

	constructor(tagName : string, attrs : {}, children : Array<Element>) {
		super(tagName, attrs, children);

		this._bargeIn = this.attr('bargeIn');
		this._bargeInType = this.attr('bargeInType');
		this._cond = this.attr('cond');
		this._count = this.attr('count');
		this._timeout = this.attr('timeout');
	}
	
	//TODO EVALUATE COND
	execute(result : ExecutionResult){
		logger.warn(JSON.stringify(this.children));
		this.children
		.forEach((child : Element) => 
			{
				if(isExecutable(child)){
					child.execute(result);
				}
					
			});
	}

	get bargeIn() {
		return this._bargeIn;
	}

	get bargeInType() {
		return this._bargeInType;
	}

	get cond() {
		return this._cond;
	}

	get count() {
		return this._count;
	}

	get timeout() {
		return this._timeout;
	}
}

export {Prompt};