
import logger from './logger';
import {Element, Dialog, Document, Form, FormItem, Prompt, Value, Var, Script} from './elements';
import * as Events from './events';

const FORM_ITEMS = ['block', 'initial', 'field', 'object', 'record', 'subdialog', 'transfer'];

class FormInterpretationAlgorithm {

	private _item : FormItem | null = null;
	private _dialog : Dialog;
	private _formItemMap : any = {};
	private _formItems : any = [];
	private _reprompt : boolean;
	private _activeDialogChanged : boolean;

	constructor(dialog : Dialog) {
		this._dialog = dialog;
		this._formItemMap = {};
		this._formItems = dialog.children.filter(node => node instanceof FormItem);
		this._reprompt = false;
		this._activeDialogChanged = true;
	}

	initialize() {
		this._reprompt = false;
		this._activeDialogChanged = true;

		this._formItems.forEach((formItem : Element) => this._initializeFormItem(formItem));

		this._dialog.children
			.filter(child => child.oneOf(Var, Script))
			.forEach((child : any) => child.execute());
	}

	mainLoop() {
		logger.debug(`-- FIA: MainLoop`);
		var lastFormItemName = null;
		var gotoFormItemName : string | null = null;

		do {
			
			// winston.silly("Before main loop: %s", JSON.stringify(model));
			this._item = this._select(gotoFormItemName);
			
			gotoFormItemName = null;

			if (this._item) {
				console.dir(this._item);
				logger.debug(`-- FIA: MainLoop - Selected: ${ this._item.tagName }`);
				this._activeDialogChanged = this._item.name != lastFormItemName;
				lastFormItemName = this._item.name;

				try {
					this._collect(this._item);

					this._process(this._item);
				} catch (e) {
					if (e instanceof Events.GotoNextFormItemEvent) {
						gotoFormItemName = e.itemName;
					} else {
						throw e;
					}
				}
			}
		
		} while (this._item != null && this._item != undefined);

	}

	_initializeFormItem(formItem : any) {
		formItem.init();
		this._formItemMap[formItem.name] = formItem;
	}

	_select(name : string | null) : any {

		if (name) {
			return this._formItemMap[name];
		}

		return Object.keys(this._formItems)
			.map(name => this._formItems[name])
			.find(item => item.selectable);
	}

	_collect(formItem : any) {
		logger.debug('-- FIA: Collect');
		if (!formItem) {
			return;
		}

		if (this._reprompt || !this._activeDialogChanged) {
			this._queuePrompts(formItem);
		}

		this._reprompt = false;
		this._activeDialogChanged = false;

		// @todo: activate grammars
		formItem.execute();
	}

	_process(formItem : any) {
		logger.debug('-- FIA: Process');
	}

	_queuePrompts(formItem : any) {
		formItem.children
			.filter((child : Element)=> child.oneOf(Prompt, Audio, Text, Value))
			.map((child : any) => child.execute());
	}
}

export default FormInterpretationAlgorithm;