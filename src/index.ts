
import { Console } from 'console';
import logger from './logger';
import Session from './Session';
import VoiceBrowser from './VoiceBrowser';


async function debug(){

    /* Start the web server to serve vxml files */
    let connect = require('connect')
    let serveStatic = require('serve-static');

    let app = connect();
    app.use(serveStatic("./test"));
    let server = app.listen(9000);

    const uri = process.argv[2] || 'http://localhost:9000/test1.vxml#ciao';

    let sessionState = VoiceBrowser.createNewSession(uri);

    try{

        let result = await VoiceBrowser.processInput(sessionState)
        logger.info(JSON.stringify(result));

        result = await VoiceBrowser.processInput(sessionState)
        logger.info(JSON.stringify(result));

        /*result = await VoiceBrowser.processInput(sessionState)
        logger.info(JSON.stringify(result));

        result = await VoiceBrowser.processInput(sessionState)
        logger.info(JSON.stringify(result));

        logger.info("SessionState: "+JSON.stringify(sessionState));*/

    }
    catch (e) {
        logger.error(e);
    }

    server.close();
}

debug();




