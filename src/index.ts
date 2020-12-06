
import Session from './Session';


/* Start the web server to serve vxml files */
let connect = require('connect')
let serveStatic = require('serve-static');

let app = connect();
app.use(serveStatic("./test"));
app.listen(9000);


const session = new Session();

const uri = process.argv[2] || 'http://localhost:9000/index.vxml';

session.call(uri);