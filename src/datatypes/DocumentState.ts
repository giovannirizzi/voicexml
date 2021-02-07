import DialogState from "./DialogState";

class DocumentState{

    private _dialogState : DialogState;
    private _documentUri : string | undefined;

    constructor(documentUri : string,
        documentState : DocumentState | undefined = undefined){

        this._dialogState = new DialogState();
        this._documentUri = documentUri;
        Object.assign(this, documentState); 
    }

    get documentUri(){
        return this._documentUri;
    }

    get dialogState(){
        return this._dialogState;
    }
}

export default DocumentState;