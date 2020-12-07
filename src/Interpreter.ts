import logger from './logger';
import FormInterpretationAlgorithm from './FormInterpretationAlgorithm';
import Session from './Session';
import { Document, Dialog } from './elements';

class Interpreter {

	private _session;
	private _doc;
	private _nextDialog : Dialog | undefined;

	constructor (session : Session, doc : Document, startDialogId : string | null) {
		this._session = session;
		this._doc = doc;

		//TODO _nextDialog can be undefined
		this._nextDialog = startDialogId
			? doc.getDialogById(startDialogId)
			: doc.dialogs[0];
	}

	process(dialog : Dialog) {
		this._nextDialog = undefined;
		// run FIA
		const fia = new FormInterpretationAlgorithm(dialog);

		logger.debug("Processing dialog: %s", dialog.id);

		fia.interpret(dialog);

		logger.debug("End processing dialog: %s", dialog.id);
	}

	get nextDialog() {
		return this._nextDialog;
	}
}

export default Interpreter;