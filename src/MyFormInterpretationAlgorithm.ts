
import logger from './logger';
import {Dialog, Document, Form, FormItem, Prompt, Value} from './elements';
import * as Events from './events';
import DialogState from './datatypes/DialogState';

class MyFormInterpretationAlgorithm {

	private _item : FormItem | null;
	private _activeDialogChanged : boolean;
	private _reprompt : boolean;

	constructor(/*Session sessionData, SystemOutput output, Directives directivesOut*/) {
		
		this._item = null;
		this._activeDialogChanged = true;
		this._reprompt = false;
	}
	interpret(dialog : Dialog, dialogState : DialogState = dialog.initialState){
		/*
	
			devo stampare ed eseguire tutti i nodi finche non trovo
			un input da chiedere
		
		Selezione un formItem da eseguire


		return newDialogState

		*/	
	}

	//I NODI DI OUTPUT DOVREBBERO AVERE UNA FUNZIONE getSystemOutput tipo che restituisce la stringa di output
	_queuePrompts(formItem : FormItem) {
		formItem.children
			.filter(child => child.oneOf(Prompt, Audio, Text, Value))
			.map((child : any) => child.execute());
	}
}

module.exports = MyFormInterpretationAlgorithm;