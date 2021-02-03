import { nanoid } from "nanoid";
import DocumentState from "./DocumentState";

class SessionState{

    private readonly _id : string;
    public _documentState : DocumentState | undefined;

    constructor(sessionState : SessionState | undefined = undefined, 
        documentState : DocumentState | undefined = undefined){

        this._documentState = documentState;
        this._id = nanoid();
        Object.assign(this, sessionState); 
    }

    get id(){
        return this._id;
    }

    get documentState(){
        return this._documentState;
    }
}

export default SessionState;