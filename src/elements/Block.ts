//import model from '../model';
import { Element, FormItem } from '.';
import Scope from '../Scope';
import * as Events from '../events';
import { IExecutable, isExecutable, ExecutionResult} from './interfaces';
import logger from '../logger';

class Block extends FormItem implements IExecutable{

	public static readonly TAG_NAME : string = 'block';

	constructor(tagName : string, attrs : {}, children : Array<Element>) {
		super(tagName, attrs, children);
	}

	execute(result : ExecutionResult){

		try {
			//model.pushScope(Scope.ANONYMOUS);

			//TODO: filter child with condition evaluated to false
			this.children.forEach((child : Element) => {

				if(isExecutable(child))
					child.execute(result);	
			});

		} finally {
			//model.popScope();
		}
	}
}

export { Block };