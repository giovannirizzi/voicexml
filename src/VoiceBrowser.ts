import AppInterpreter from "./AppInterpreter";
import DialogState from "./datatypes/DialogState";
import DocumentState from "./datatypes/DocumentState";
import SessionState from "./datatypes/SessionState";
import { ExecutionResult } from "./elements/interfaces";

class VoiceBrowser{

    static createNewSession(uri : string) : SessionState{

        var documentState = new DocumentState(uri);
        var sessionState = new SessionState(documentState);

        return sessionState;
    }

    static processInput(sessionState : SessionState/*, Input input*/ ) : Promise<ExecutionResult>{

        let appInterpreter = new AppInterpreter(sessionState);
        return appInterpreter.interpret();
    }

    static changeDocument(sessionState : SessionState, uri : string){

        var documentState = new DocumentState(uri);
        sessionState.documentState = documentState;
    }

    static changeDialog(sessionState : SessionState, dialogId : string){

        sessionState.documentState.dialogState = new DialogState(dialogId);
    }

}

export default VoiceBrowser;