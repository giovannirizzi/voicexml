import { Element, Text } from '.';
import model from '../model';
import promptPlayer from '../promptPlayer';
import logger from '../logger';

class Prompt extends Element {

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

	//TODO sistemare
	execute() {
		var cond = model.evaluate(this.cond, true);

		if (cond) {
			promptPlayer(this.children.reduce((parts, child) => {
				(child as Text).execute((text : string) => parts.push(text as never));
				return parts
			}, []).join(''));
		} else {
			logger.debug("cond %s does not evaluates to a truthy value: skipping prompt", this.cond);
		}
	}
}

export {Prompt};