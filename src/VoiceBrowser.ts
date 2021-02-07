import AppInterpreter from "./AppInterpreter";
import DocumentState from "./datatypes/DocumentState";
import SessionState from "./datatypes/SessionState";
import { ExecutionResult } from "./elements/interfaces";

class VoiceBrowser{

    static createNewSession(uri : string) : SessionState{

        var documentState = new DocumentState(uri);
        var sessionState = new SessionState(undefined, documentState);

        return sessionState;
    }

    static processInput(sessionState : SessionState/*, Input input*/ ) : Promise<ExecutionResult>{

        let appInterpreter = new AppInterpreter(sessionState);
        return appInterpreter.interpret();
    }

}

export default VoiceBrowser;