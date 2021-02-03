import AppInterpreter from "./AppInterpreter";
import DocumentState from "./datatypes/DocumentState";
import SessionState from "./datatypes/SessionState";

class VoiceBrowser{

    static createNewSession(uri : string) : SessionState{

        var documentState = new DocumentState(uri);
        var sessionState = new SessionState(undefined, documentState);

        return sessionState;
    }

    static /* Response*/async processInput(sessionState : SessionState/*, Input input*/ ){

        let appInterpreter = new AppInterpreter(sessionState);
        await appInterpreter.interpret();
    }

}

export default VoiceBrowser;