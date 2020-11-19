'use strict';

const logger = require('./logger');

const FormInterpretationAlgorithm = require('./FormInterpretationAlgorithm');

class Interpreter {
	constructor (session, doc, startDialogId) {
		this._session = session;
		this._doc = doc;
		this._nextDialog = startDialogId
			? doc.getDialogById(startDialogId)
			: doc.dialogs[0];
	}

	process(dialog) {
		this._nextDialog = null;

		// run FIA
		const fia = new FormInterpretationAlgorithm(dialog);

		logger.debug("Processing dialog: %s", dialog.id);

		fia.initialize();
		fia.mainLoop();
	}

	get nextDialog() {
		return this._nextDialog;
	}
}

module.exports = Interpreter;