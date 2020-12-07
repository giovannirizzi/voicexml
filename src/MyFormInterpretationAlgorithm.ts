
import logger from './logger';
import {Block, Dialog, Form, FormItem, Prompt, Value} from './elements';
import * as Events from './events';
import DialogState from './datatypes/DialogState';
import {isSpeachable} from './elements/interfaces';

class MyFormInterpretationAlgorithm {

	private _item : FormItem | null;
	private _activeDialogChanged : boolean;
	private _reprompt : boolean;
	private _speachableOutput : string = "";

	constructor(/*Session sessionData, Directives directivesOut*/) {
		
		this._item = null;
		this._activeDialogChanged = true;
		this._reprompt = false;
	}

	_initialize(dialog : Dialog, dialogState: DialogState){
		//esegui var e script
		//reset internal promot counter to 1
	}

	/*
	* The purpose of the select phase is to select the next form item to visit. This is done as follows
	* @return the next formItem to visit
	*/
	_select(dialog : Dialog, dialogState: DialogState, 
		nextItemName : (string | undefined) = undefined) : FormItem | undefined{

		if (nextItemName) {
			return dialog.getFormItemByName(name);
		}

		let nextFormItem = dialog.formItems
			.find(item => 
				item.selectable && 
				dialogState.getVariableOfFormItemByName(item.name) === undefined);

		logger.debug("Select phase: nextFormItem %s", nextFormItem?.name);

		return nextFormItem;
	}

	interpret(dialog : Dialog, dialogState : DialogState = dialog.initialState){

		if(!dialogState.isInitialized){
			this._initialize(dialog, dialogState);
		}

		let nextFormItem = this._select(dialog, dialogState);

		/*
	
			devo stampare ed eseguire tutti i nodi finche non trovo
			un input da chiedere
		
		Selezione un formItem da eseguire


		return newDialogState

		*/	
	}

	/*
	* The purpose of the collect phase is to collect an input or an event.
	* The selected form item is visited, which performs actions that depend on the type of form item
	*/
	_collect(selectedItem : FormItem){

		if(isSpeachable(selectedItem)){

			let systemOutput = selectedItem.getSpeachableOutput();
		}

	}

	//I NODI DI OUTPUT DOVREBBERO AVERE UNA FUNZIONE getSystemOutput tipo che restituisce la stringa di output
	_queuePrompts(formItem : FormItem) {
		formItem.children
			.filter(child => child.oneOf(Prompt, Audio, Text, Value))
			.map((child : any) => child.execute());
	}
}

module.exports = MyFormInterpretationAlgorithm;