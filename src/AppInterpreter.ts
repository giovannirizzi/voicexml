
import DocumentState from "./datatypes/DocumentState";
import SessionState from "./datatypes/SessionState";
import DocInterpreter from "./DocInterpreter";
import docloader from "./docloader";
import logger from "./logger";
import {Document} from "./elements"
import { ExecutionResult } from "./elements/interfaces";

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

    private _loadCurrDocument(){
        
    }

    async interpret() : Promise<ExecutionResult>{

        return new Promise<ExecutionResult>(async (resolve, reject) => {

            let res = new ExecutionResult();

            logger.debug("AppInterpreter: BEGIN interpret()");

            let docUri = this._sessionState.documentState?.documentUri;
            if(docUri){
    
                try {
                    this._currDocument = await docloader.loadDocument(docUri);
                }
                catch(error){
                    reject(error);
                }   
            }
    
            var nextDocument : Document | null = null;
    
            do{
                try {
                    
                    //model.pushScope(Scope.DOCUMENT);
                    if(this._currDocument && this._sessionState.documentState){
    
                        const docInterpreter = new DocInterpreter(this._currDocument, this._sessionState.documentState);
                        docInterpreter.interpret();
                        res = docInterpreter.executionResult;
                    }
                    
                } finally {
                    //model.popScope();
                }
    
            }while(nextDocument);

            logger.debug("AppInterpreter: END interpret()");

            //model.popScope();
            
            resolve(res);

        });
    }
}

export default AppInterpreter;