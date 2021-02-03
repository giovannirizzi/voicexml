
import DocumentState from "./datatypes/DocumentState";
import SessionState from "./datatypes/SessionState";
import DocInterpreter from "./DocInterpreter";
import docloader from "./docloader";
import logger from "./logger";
import {Document} from "./elements"

/**
 * @classdesc Gestisce l'interpretazione dell'applicazione
 */

class AppInterpreter{

    private _currDocument : Document | undefined;

    private _sessionState : SessionState;

    constructor(sessionState : SessionState){

        this._sessionState = sessionState;
        this._currDocument = undefined;
    }

    async interpret(){

        logger.debug("AppInterpreter: BEGIN interpret()");

        let docUri = this._sessionState.documentState?.documentUri;
        if(docUri){

            try {
                this._currDocument = await docloader.loadDocument(docUri);
            }
            catch(error){
                logger.error(error);
            }   
        }

        var nextDocument : Document | null = null;

		do{
			try {
				
                //model.pushScope(Scope.DOCUMENT);
                if(this._currDocument && this._sessionState.documentState){

                    const docInterpreter = new DocInterpreter(this._currDocument, this._sessionState.documentState);
                    docInterpreter.interpret();
                }
                
        	} finally {
        		//model.popScope();
        	}

		}while(nextDocument);

		//model.popScope();
		logger.debug("AppInterpreter: END interpret()");
    }
}

export default AppInterpreter;