'use strict';

const uuid = require('uuid');
const Node = require('./Node');
const assert = require('assert').strict;

const FORM_ITEMS = ['block', 'initial', 'field', 'object', 'record', 'subdialog', 'transfer'];

class FormItem extends Node {
	constructor(tagName, attrs, children) {
        super(tagName, attrs, children);
    
        assert.ok(FORM_ITEMS.indexOf(tagName) !== -1, "The element with tag "+tagName+", can't be a form item");

        this._name = this.attr('name') || `_name_${uuid.v1().replace(/-/g, '_')}`;
        this._expr = this.attr('expr');
        this._cond = this.attr('cond');

        if(this._cond === undefined)
            this._cond = true;

        this._variable = undefined;
    }

    //PER COMPATIBILITA CON IL VECCHIO CODICE
    init(){

    }

    setVisited(){
        this._variable = true;
    }

	get selectable() {
		//var variable = model.evaluate(this.name);
		//var condition = model.evaluate(this.cond, true);

        //return !variable && condition;
        return this._variable === undefined;
	}

    get initialState(){

    }

    get variable(){
        return this._variable;
    }

    get name() {
		return this._name;
	}

	get expr() {
		return this._expr;
	}

	get cond() {
		return this._cond;
	}
}

module.exports = FormItem;