import { nanoid } from 'nanoid'
import logger from './logger';
import model from './model';
import docloader from './docloader';
import Scope from './Scope';
import * as Events from './events';
import { Document, Dialog } from './elements';
import DocInterpreter from './DocInterpreter';
import DocumentState from './datatypes/DocumentState';

class Session {

	private readonly _id;

	constructor() {
		this._id = nanoid();
	}

	call(uri : string) {
		
		this._run(uri);
	}

	_run(uri : string) {
		/*model.pushScope(Scope.SESSION);
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
		});*/
		
		//docloader.loadDocument(uri)
		//	.then(doc => this._process(doc))
		//	.catch(error => logger.error(error))
			//.finally(() => model.popScope());
	}

	_process(doc : Document) {
		logger.debug("start processing");
		/*model.pushScope(Scope.APPLICATION);
		model.create('lastresult$', []);
		model.create('lastresult$.confidence', null);
		model.create('lastresult$.utterance', null);
		model.create('lastresult$.inputmode', null);
		model.create('lastresult$.interpretation', null);*/
	}
}

export default Session;