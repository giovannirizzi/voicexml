'use strict';

class Element {

	private readonly _tagName : string;
	private readonly _attrs : { [key: string]: string};
	private readonly _children : Element[];

	constructor(tagName : string, attrs : {}, children : Element[]) {

		this._tagName = tagName;
		this._attrs = attrs;
		this._children = children;
	}

	get tagName() : string {
		return this.tagName;
	}

	get children() : Element[] {
		return this._children;
	}

	attr(name : string) : string{
		return this._attrs[name];
	}

	is(type : any) : boolean {
		return type && type.TAG_NAME && type.TAG_NAME === this._tagName;
	}

	oneOf(...types : any) : boolean{
		return types.some( (type: any) => this.is(type));
	}

}


export = Element;