import { Element, Text } from '.';
import model from '../model';
import promptPlayer from '../promptPlayer';
import logger from '../logger';
import { ISpeachable , isSpeachable} from './interfaces';

class Prompt extends Element implements ISpeachable{

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
	getSpeachableOutput(): string {

		var output : string = "";

		//var cond = model.evaluate(this.cond, true);
		var cond = true;

		if (cond) {
			this.children
			.forEach((child : Element) => 
				{
					if(isSpeachable(child))
						output += child.getSpeachableOutput();
				});
		} 
		else {
			logger.debug("cond %s does not evaluates to a truthy value: skipping prompt", this.cond);
		}

		return output;
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