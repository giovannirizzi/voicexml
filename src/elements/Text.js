'use strict';

const Node = require('./Node');
const promptPlayer = require('../promptPlayer');

class Text extends Node {
	constructor(tagName, attrs, children, text) {
		super(tagName, attrs, children);
		this.text = text;
	}

	execute(player = promptPlayer) {
		if (this.text) {
			player(this.text);
		}
	}
}

Text.TAG_NAME = '__text__';

module.exports = Text;