
import logger from './logger';
import {Block, Dialog, Element, FormItem} from './elements';
import * as Events from './events';
import DialogState from './datatypes/DialogState';
import {isExecutable, ExecutionResult} from './elements/interfaces';
import { assert } from 'console';

class FormInterpretationAlgorithm {

	private readonly _dialog : Dialog;
	private _dialogState : DialogState
	private _executionResult : ExecutionResult;

	constructor(dialog : Dialog, state : DialogState = dialog.initialState/*Session sessionData, Directives directivesOut*/) {
		
		this._dialog = dialog;
		this._dialogState = state;
		this._executionResult = new ExecutionResult();
	}

	_initialize(){
		//esegui var e script
		//reset internal promot counter to 1
	}

	/*
	* The purpose of the select phase is to select the next form item to visit. This is done as follows
	* @return the next formItem to visit
	*/
	_selectNextItem(nextItemName : (string | undefined) = undefined) : FormItem | undefined{

		if (nextItemName) {
			return this._dialog.getFormItemByName(nextItemName);
		}

		let nextFormItem = this._dialog.formItems
			.find(item => 
				item.selectable && 
				this._dialogState.getVariableOfFormItemByName(item.name) === undefined);

		logger.debug("Selected item: nextFormItem %s", nextFormItem?.name);

		return nextFormItem;
	}

	interpret(){

		logger.debug("Interpreting dialog id: %s", this._dialog.id);

		if(!this._dialogState.initialized){
			this._initialize();
		}

		let item : FormItem | undefined; 

		let gotoFormItemName : string | undefined = undefined;

		do{

			item = this._selectNextItem(gotoFormItemName);

			gotoFormItemName = undefined;
			
			if (item != null) {

				try {
					this._collect(item);

					this._process(item);

				} catch (e) {

					if (e instanceof Events.GotoNextFormItemEvent) 
						gotoFormItemName = e.itemName;
					else
						throw e;	
				}
			}
		}
		while(item != null);


		return undefined;

		/*

		return newDialogState

		*/	
	}

	/*
	* The purpose of the collect phase is to collect an input or an event.
	* The selected form item is visited, which performs actions that depend on the type of form item
	*/
	_collect(selectedItem : FormItem){

		logger.debug('Collect phase on item name: %s', selectedItem.name);
		
		this._dialogState.lastFormItemId = this._dialog.children.indexOf(selectedItem);

		let result : ExecutionResult;

		if(isExecutable(selectedItem)){

			this._dialogState.setVariableOfFormItemByName(selectedItem.name, true);
			result = selectedItem.execute();
			this._executionResult.appendSpeachableOutput(result.speachableOutput);
		}
	}

	_process(selectedItem : FormItem){

	}

	get executionResult(){
		return this._executionResult;
	}
}

export default FormInterpretationAlgorithm;