import DialogState from "./datatypes/DialogState";
import DocumentState from "./datatypes/DocumentState";
import { Dialog, Document} from "./elements";
import FormInterpretationAlgorithm from "./FormInterpretationAlgorithm";
import logger from "./logger";

class DocInterpreter{

    private readonly _doc : Document;
    private _currDialog : Dialog | undefined;
    private _docState : DocumentState;
    private _currDialogState : DialogState | undefined;

    constructor(doc : Document, docState : DocumentState){

        this._doc = doc;
        this._docState = docState;
        this._currDialogState = this._docState.dialogState;

        if(this._currDialogState && this._currDialogState.idDialog){
            this._currDialog = this._doc.getDialogById(this._currDialogState.idDialog);
        }

        //if no dialog is found then start with the first
        if(this._currDialog == null)
            this._currDialog = doc.dialogs[0];

    }

    interpret(){

        //TODO
        while(this._currDialog != null){

            const fia = new FormInterpretationAlgorithm(this._currDialog);

            logger.debug("Processing dialog: %s", this._currDialog.id);

            fia.interpret();
        

            logger.debug("End processing dialog: %s", this._currDialog.id);

            logger.info("SpeachableOutput: %s", fia.executionResult.speachableOutput);


            this._currDialog = undefined;
        }
    }
}

export default DocInterpreter;