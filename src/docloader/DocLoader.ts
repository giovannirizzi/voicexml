import fetcher from './fetcher';
import parser from './parser';
import {Document} from '../elements';

class DocLoader {

	private _docCache : { [key: string]: Document} = {};

	constructor() {}

	loadDocument(uri : string) : Promise<Document>{

		if(this._docCache[uri]){
			return Promise.resolve(
				this._docCache[uri]
			);
		}
		else
        return fetcher.fetch(uri)
			.then((data : string) => parser.parse(data))
			.then((doc : Document) => { 

				this._docCache[uri] = doc;
				return Promise.resolve(doc)
			})
			.catch((error : any) => {

                //TODO custom error
				return Promise.reject(
					new Error(error.message)
					);
				}
            );	
	}

	get fetcher(){
		return fetcher;
	}

	get parser(){
		return parser;
	}

}

export = DocLoader;