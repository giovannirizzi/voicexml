

import { Element } from '.';
import model from '../model';
import docloader from '../docloader';
import { isExecutable } from './interfaces';

/*


class Script extends Element{

	private readonly _src : string;

	public static readonly TAG_NAME : string = 'script';

	constructor(tagName : string, attrs : {}, children : Array<Element>) {
		super(tagName, attrs, children);

		this._src = this.attr('src');
	}

	get src() {
		return this._src;
	}

	//TODO
	execute() : ExecutionResult{
		if (this.src) {
			docloader.fetcher.fetch(this.src)
			.then((data : string) => this._evaluate(data))
			.catch((error : any) => {});
		} else {
			this._evaluate();
		}
	}

	//TODO this.attr('text') non va bene; sta nel child Text
	_evaluate(script : string = this.attr('text')) {
		model.evaluate(script);
	}
}
*/
class Script extends Element{};

export{ Script };