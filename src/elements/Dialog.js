'use strict';

const uuid = require('uuid');
const Node = require('./Node');
const assert = require('assert').strict;
const FormItem = require('./FormItem');
const DialogState = require('../datatypes/DialogState');

class Dialog extends Node {
	constructor(tagName, attrs, children) {
        super(tagName, attrs, children);
        
        assert.ok(tagName === "form" || tagName === "menu", "The element with tag "+tagName+", can't be a form item");
        
		this._id = this.attr('id') || `_id_${uuid.v1().replace(/-/g, '_')}`;
        this._scope = this.attr('scope');

        this._formItemMap = {};
        this._formItems = this._children.filter(node => node instanceof FormItem);
        this._formItems.forEach(formItem => this._formItemMap[formItem.name] = formItem);
        
        this._initialState = new DialogState();
        //TODO settare le variabili hardcoddate dei formItems;
    
    }

    get initialState(){

        return this._initialState;
    }

    initialize(){

    }

    reset(){


    }
    
    get formItems(){
        return this._formItems;
    }

    getFormItemByName(name){
        return this._formItemMap[name];
    }

    get id() {
		return this._id;
	}

	get scope() {
		return this._scope;
	}
}

module.exports = Dialog;