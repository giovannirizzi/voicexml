import { Dialog } from "../elements";
import logger from "../logger";
import DialogState from "./DialogState";

class DocumentState{

    private _dialogState : DialogState;
    private _documentUri : string | undefined;

    constructor(documentUri : string){

        let idx = documentUri.indexOf("#");
        let startDialogId = idx != -1 ? documentUri.substring(idx+1) : undefined;

        this._dialogState = new DialogState(startDialogId);
        this._documentUri = documentUri;
    }

    get documentUri(){
        return this._documentUri;
    }

    get dialogState(){
        return this._dialogState;
    }

    set dialogState(dialogState : DialogState){
        this._dialogState = dialogState;
    }
}

export default DocumentState;