import model from '../model';
import { Element, FormItem } from '.';
import Scope from '../Scope';
import { ISpeachable, isSpeachable} from './interfaces';

class Block extends FormItem implements ISpeachable{

	public static readonly TAG_NAME : string = 'block';

	constructor(tagName : string, attrs : {}, children : Array<Element>) {
		super(tagName, attrs, children);
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
		
		return output;
	}

	//TODO
	execute() {
		try {
			this.setVisited();

			model.pushScope(Scope.ANONYMOUS);
			this.children.forEach((child : any) =>  child.execute());
		} finally {
			model.popScope();
		}
	}
}

export { Block };