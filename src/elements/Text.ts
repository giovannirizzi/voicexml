
import { Element } from '.';
import {IExecutable, ExecutionResult} from './interfaces';

class Text extends Element implements IExecutable{

	private _text: string = "";

	public static readonly TAG_NAME : string = '__text__';

	constructor(tagName : string, attrs : {}, children : Array<Element>) {
		super(tagName, attrs, children);
	}

	execute(): ExecutionResult {
		let res = new ExecutionResult();
		res.appendSpeachableOutput(this.text);
		return res;
	}

	//to initialize only 
	set text(text){
		if(this._text === "")
			this._text = text;
	}

	get text(){
		return this._text;
	}
}

export {Text};