'use strict';

const Node = require('./Node');
const promptPlayer = require('../promptPlayer');

class Text extends Node {
	constructor(node, children) {
		super(node, children);
		this.text = node['text'];
	}

	execute(player = promptPlayer) {
		if (this.text) {
			player(this.text);
		}
	}
}

Text.TAG_NAME = '__text__';

module.exports = Text;