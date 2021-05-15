import { nanoid } from "nanoid";
import DocumentState from "./DocumentState";

class SessionState{

    private readonly _id : string;
    public _documentState : DocumentState;

    constructor(documentState : DocumentState){

        this._documentState = documentState;
        this._id = nanoid();
    }

    get id(){
        return this._id;
    }

    get documentState(){
        return this._documentState;
    }

    set documentState(documentState : DocumentState){
        this._documentState = documentState;
    }
}

export default SessionState;