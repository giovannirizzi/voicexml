
import logger from './logger';
import {Block, Dialog, Element, FormItem, Goto} from './elements';
import * as Events from './events';
import DialogState from './datatypes/DialogState';
import {isExecutable, ExecutionResult} from './elements/interfaces';

class FormInterpretationAlgorithm {

	private readonly _dialog : Dialog;
	private _dialogState : DialogState
	private _executionResult : ExecutionResult;

	/**
	 * @readonly dialog
	 * @param dialog 
	 * @param state 
	 */
	constructor(readonly dialog : Dialog, state : DialogState /*Session sessionData, Directives directivesOut*/) {
		
		this._dialog = dialog;
		this._dialogState = state;
		this._executionResult = new ExecutionResult();
	}

	_initialize(){

		this._dialogState.idDialog = this._dialog.id;
		//esegui var e script
		//reset internal promot counter to 1
	}

	/*
	* The purpose of the select phase is to select the next form item to visit. This is done as follows
	* @return the next formItem to visit
	*/
	_selectNextItem(nextItemName : (string | undefined) = undefined) : FormItem | undefined{

		if (nextItemName) {
			let item = this._dialog.getFormItemByName(nextItemName);

			if(item && !this._dialogState.getVariableOfFormItemByName(item.name))
				return item;
		}

		let nextFormItem = this._dialog.formItems
			.find(item => 
				item.selectable && 
				this._dialogState.getVariableOfFormItemByName(item.name) === undefined);

		logger.debug("FIA - Selected item: nextFormItem %s", nextFormItem?.name);

		return nextFormItem;
	}

	interpret(){

		logger.debug("FIA - Interpreting dialog id: %s", this._dialog.id);

		if(!this._dialogState.initialized){
			this._initialize();
		}

		let item : FormItem | undefined = this._selectNextItem(undefined); 
		let gotoNextFormItemName : string | undefined = undefined;

		do{

			if (item != null) {

				try {
					this._collect(item);

					this._process(item);

					if(this._executionResult.nextFormItem){

						gotoNextFormItemName = this._executionResult.nextFormItem;
						this._executionResult.nextFormItem = undefined;
					}

					item = this._selectNextItem(gotoNextFormItemName);

				} catch (e) {
			
					logger.error(e);		
				}
			}
		}
		while(item != null);
	}

	/*
	* The purpose of the collect phase is to collect an input or an event.
	* The selected form item is visited, which performs actions that depend on the type of form item
	*/
	_collect(selectedItem : FormItem){

		logger.debug('FIA - Collect phase on item name: %s', selectedItem.name);
		
		this._dialogState.lastFormItemId = this._dialog.children.indexOf(selectedItem);

		let result : ExecutionResult;
		
		if(isExecutable(selectedItem)){

			this._dialogState.setVariableOfFormItemByName(selectedItem.name, true);
			selectedItem.execute(this._executionResult);
		}
	}

	_process(selectedItem : FormItem){

	}

	get executionResult(){
		return this._executionResult;
	}
}

export default FormInterpretationAlgorithm;