
import { Console } from 'console';
import Session from './Session';
import VoiceBrowser from './VoiceBrowser';


/* Start the web server to serve vxml files */
let connect = require('connect')
let serveStatic = require('serve-static');

let app = connect();
app.use(serveStatic("./test"));
let server = app.listen(9000);

const uri = process.argv[2] || 'http://localhost:9000/index.vxml';

let sessionState = VoiceBrowser.createNewSession(uri);

VoiceBrowser.processInput(sessionState)
.then(() => {
    server.close();
});