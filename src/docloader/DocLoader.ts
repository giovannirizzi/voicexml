
import {fetcher} from './fetcher/';
import {parser} from './parser/';

class DocLoader {
	constructor() {}

	loadDocument(uri : string) {

        return fetcher.fetch(uri)
			.then((data : string) => parser.parse(data))
			.catch((error : any) => {

                //TODO custom error
				return Promise.reject(
					new Error(error.message)
					);
				}
            );	
	}

}

export = DocLoader;