
import { nanoid } from 'nanoid'
import {strict as assert} from 'assert';
import { Element, FormItem } from '.';
import DialogState from '../datatypes/DialogState';
import logger from '../logger';

class Dialog extends Element {

    private readonly _id;
    private readonly _scope;
    private readonly _formItemMap : { [key: string]: FormItem} = {};
    private readonly _formItems : Array<FormItem>;

	constructor(tagName : string, attrs : {}, children : Array<Element>) {
        super(tagName, attrs, children);
        
        assert.ok(tagName === "form" || tagName === "menu", "The element with tag "+tagName+", can't be a form item");
        
		this._id = this.attr('id') || nanoid();
        this._scope = this.attr('scope');

        this._formItems = this.children.filter(node => node instanceof FormItem) as Array<FormItem>;
        this._formItems.forEach(formItem => this._formItemMap[formItem.name] = formItem);
        
    
        //TODO settare le variabili hardcoddate dei formItems;
    }

    get formItems(){
        return this._formItems;
    }

    getFormItemByName(name : string) : FormItem | undefined{
        return this._formItemMap[name];
    }

    get id() {
		return this._id;
	}

	get scope() {
		return this._scope;
	}
}

export {Dialog};