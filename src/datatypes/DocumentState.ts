import DialogState from "./DialogState";

class DocumentState{

    private _dialogState : DialogState | undefined;
    private _documentUri : string | undefined;

    constructor(documentUri : string | undefined = undefined,
        documentState : DocumentState | undefined = undefined){

        this._dialogState = undefined;
        this._documentUri = documentUri;
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