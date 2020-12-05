'use strict';

const logger = require('./logger');

const Nodes = require('./elements');
const Events = require('./events');
const DialogState = require('./datatypes/DialogState');
const { Dialog } = require('./elements');

class MyFormInterpretationAlgorithm {
	constructor(/*Session sessionData, SystemOutput output, Directives directivesOut*/) {
		
	}
	interpret(dialog, dialogState = dialog.initialState){
		/*
	
			devo stampare ed eseguire tutti i nodi finche non trovo
			un input da chiedere
		
		Selezione un formItem da eseguire


		return newDialogState

		*/	
	}

	mainLoop() {
		logger.debug(`-- FIA: MainLoop`);
		var lastFormItemName = null;
		var gotoFormItemName = null;

		do {
			// winston.silly("Before main loop: %s", JSON.stringify(model));
			this._item = this._select(gotoFormItemName);
			
			gotoFormItemName = null;

			if (this._item != null) {
				logger.debug(`-- FIA: MainLoop - Selected: ${ this._item.tagName }`);
				this._activeDialogChanged = this._item.name != lastFormItemName;
				lastFormItemName = this._item.name;

				try {
					this._collect(this._item);

					this._process(this._item);
				} catch (e) {
					if (e instanceof Events.GotoNextFormItemEvent) {
						gotoFormItemName = e.item;
					} else {
						throw e;
					}
				}
			}
			// winston.silly("After main loop: %s", JSON.stringify(model));
		} while (this._item != null);
    }
    ù
	_collect(formItem) {
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

	//I NODI DI OUTPUT DOVREBBERO AVERE UNA FUNZIONE getSystemOutput tipo che restituisce la stringa di output

	_queuePrompts(formItem) {
		formItem.children
			.filter(child => child.oneOf(Nodes.Prompt, Nodes.Audio, Nodes.Text, Nodes.Value))
			.map(child => child.execute());
	}
}

module.exports = MyFormInterpretationAlgorithm;