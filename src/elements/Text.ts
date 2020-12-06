
import { Element } from '.';
import promptPlayer from '../promptPlayer';

class Text extends Element {

	private _text: string = "";

	public static readonly TAG_NAME : string = '__text__';

	constructor(tagName : string, attrs : {}, children : Array<Element>) {
		super(tagName, attrs, children);
	}

	//to initialize only 
	set text(text){
		if(this._text === "")
			this._text = text;
	}

	get text(){
		return this._text;
	}

	execute(player = promptPlayer) {
		if (this.text) {
			player(this.text);
		}
	}
}

export {Text};