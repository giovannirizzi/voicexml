import { nanoid } from 'nanoid'
import logger from './logger';
import model from './model';
import docloader from './docloader';
import Interpreter  from './Interpreter';
import Scope from './Scope';
import * as Events from './events';
import { Document, Dialog } from './elements';

class Session {

	private readonly _id;

	constructor() {
		this._id = nanoid();
	}

	call(uri : string) {
		
		this._run(uri);
	}

	_run(uri : string) {
		model.pushScope(Scope.SESSION);
		model.create('connection', {
			local: {
				uri: 'local test'
			},
			remote: {
				uri: 'remote test'
			},
			protocol: {
				name: 'protocol name',
				version: 'protocol version'
			},
			redirect: [],
			aai: null,
			//originator: this.remote // @todo
		});
		
		docloader.loadDocument(uri)
			.then(doc => this._process(doc))
			.catch(error => logger.error(error))
			.finally(() => model.popScope());
	}

	_process(doc : Document) {
		logger.debug("start processing");
		model.pushScope(Scope.APPLICATION);
		model.create('lastresult$', []);
		model.create('lastresult$.confidence', null);
		model.create('lastresult$.utterance', null);
		model.create('lastresult$.inputmode', null);
		model.create('lastresult$.interpretation', null);

        var dialogId : string | null = null; // @todo initialize this from uri fragment
		var nextDocument : Document | null = doc;

		do{
			try {
				
				model.pushScope(Scope.DOCUMENT);
				nextDocument = this._interpret(doc, dialogId);

        	} finally {
        		model.popScope();
        	}

		}while(nextDocument);

		model.popScope();
		logger.debug("end processing");
	}

	_interpret(doc : Document, startDialogId : string | null) : Document | null{
		logger.debug('Interpreting document');

		const interpreter = new Interpreter(this, doc, startDialogId);

		var dialog = interpreter.nextDialog;

        while (dialog != null) {
            try {
                model.pushScope(Scope.DIALOG);
                interpreter.process(dialog);
                dialog = interpreter.nextDialog;
            } catch (e) {
            	if (e instanceof Events.GotoNextFormEvent) {
	            	var id = e.nextForm;

            		logger.debug('Processing next form event, id = %s', id);

	                dialog = doc.getDialogById(id);

	                if (!dialog) {
	                    throw new Events.Errors.BadFetchError(`Target of goto '${id}'not found in current document`);
	                }
					// } catch (GotoNextDocumentEvent e) {
					//     final URI uri = e.getUri();
					//     return new DocumentDescriptor(uri);
					// } catch (SubmitEvent e) {
					//     return e.getDocumentDescriptor();
	            } else {
		            throw e;
	            }
            } finally {
                model.popScope();
            }
		}

		logger.debug("end interpreting document");

		return null;
	}
}

export default Session;