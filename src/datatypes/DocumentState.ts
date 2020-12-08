import DialogState from "./DialogState";

class DocumentState{

    private _dialogState : DialogState | undefined;
    private _documentUri : string | undefined;

    constructor(documentState : DocumentState | undefined = undefined){

        this._dialogState = undefined;
        this._documentUri = undefined;
        Object.assign(this, documentState); 
    }

    get documentUri(){
        return this._documentUri;
    }

    get dialogState(){
        return this._dialogState;
    }

    //updateDialogState()
}

export default DocumentState;