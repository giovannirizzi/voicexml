import model from '../model';
import { Element, FormItem } from '.';
import Scope from '../Scope';
import { IExecutable, isExecutable, ExecutionResult} from './interfaces';

class Block extends FormItem implements IExecutable{

	public static readonly TAG_NAME : string = 'block';

	constructor(tagName : string, attrs : {}, children : Array<Element>) {
		super(tagName, attrs, children);
	}

	execute(): ExecutionResult {

		let res = new ExecutionResult();

		try {
			model.pushScope(Scope.ANONYMOUS);

			//TODO: filter child with condition evaluated to false
			this.children.forEach((child : Element) => {

				let out : string = "";

				if(isExecutable(child))
					out = child.execute().speachableOutput;

				res.appendSpeachableOutput(out);
			});

		} finally {
			model.popScope();
		}

		return res;
	}
}

export { Block };