
import { Element } from '.';
import uuid from 'uuid';
import {strict as assert} from 'assert';

const FORM_ITEMS = ['block', 'initial', 'field', 'object', 'record', 'subdialog', 'transfer'];

class FormItem extends Element{

    private readonly _name;
    private readonly _expr;
    private readonly _cond;
    private _variable : any;

	constructor(tagName : string, attrs : {}, children : Array<Element>) {
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

export { FormItem };