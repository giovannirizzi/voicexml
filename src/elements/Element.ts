
class Element {

	private readonly _tagName : string;
	private readonly _attrs : { [key: string]: string};
	private readonly _children : Array<Element>;

	constructor(tagName : string, attrs : {}, children : Array<Element>) {

		this._tagName = tagName;
		this._attrs = attrs;
		this._children = children;
	}

	get tagName() : string {
		return this._tagName;
	}

	get children() : Array<Element> {
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

export { Element };