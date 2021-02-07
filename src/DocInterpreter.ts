import DialogState from "./datatypes/DialogState";
import DocumentState from "./datatypes/DocumentState";
import { Dialog, Document} from "./elements";
import FormInterpretationAlgorithm from "./FormInterpretationAlgorithm";
import logger from "./logger";
import * as Events from './events';
import { ExecutionResult } from "./elements/interfaces";

/**
 * @classdesc Gestisce l'interpretazione del documento
 */

class DocInterpreter{

    private readonly _doc : Document;
    private _currDialog : Dialog | undefined;
    private _docState : DocumentState;
    private _currDialogState : DialogState;
    private _executionResult : ExecutionResult;

    constructor(doc : Document, docState : DocumentState){

        this._doc = doc;
        this._docState = docState;
        this._currDialogState = this._docState.dialogState;
        this._executionResult = new ExecutionResult();

        if(this._currDialogState.idDialog){
            this._currDialog = this._doc.getDialogById(this._currDialogState.idDialog);
        }

        //if no dialog is found then start with the first
        if(this._currDialog == null){
            this._currDialog = doc.dialogs[0];
        }

    }

    interpret(){

        //TODO
        while(this._currDialog != null){

            const fia = new FormInterpretationAlgorithm(this._currDialog, this._currDialogState);

            try {
                logger.debug("Processing dialog: %s", this._currDialog.id);
         
                fia.interpret();
               
                this._executionResult = fia.executionResult;
               
                logger.debug("End processing dialog: %s", this._currDialog.id);

            } catch (e) {

                if (e instanceof Events.GotoNextFormEvent) {
                    //this._currDialog = ....
                }
                
            }

            this._currDialog = undefined;
        }
    }

    get executionResult(){
		return this._executionResult;
	}
}

export default DocInterpreter;