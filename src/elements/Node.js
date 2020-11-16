'use strict';

class Node {
	constructor(tagName, attrs, children) {
		this._tagName = tagName;
		this._attrs = attrs;
		this._children = children;
	}

	get tagName() {
		return this._tagName;
	}

	get children() {
		return this._children;
	}

	attr(name) {
		return this._attrs[name];
	}

	is(type) {
		return type && type.TAG_NAME && type.TAG_NAME === this._tagName;
	}

	oneOf(...types) {
		return types.some(type => this.is(type));
	}
}


module.exports = Node;