'use strict';

import model from '../model';
import { Element, FormItem } from '.';
import Scope from '../Scope';

class Block extends FormItem {

	public static readonly TAG_NAME : string = 'block';

	constructor(tagName : string, attrs : {}, children : Array<Element>) {
		super(tagName, attrs, children);

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