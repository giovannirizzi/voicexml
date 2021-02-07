import xml2js from 'xml2js';
import elementBuilder from './elementBuilder';
import {Document, Vxml} from '../../elements';

class Parser {
	constructor() {

	}

	parse(data : string) : Promise<Document>{

		var parser = new xml2js.Parser(
			{
				attrkey : 'attrs',
				charkey : 'text',
				childkey : 'children',
				explicitCharkey : true,
				explicitArray : true,
				preserveChildrenOrder : true,
				explicitChildren : true,
				normalizeTags : true,
				normalize : true,
				charsAsChildren : true,
				trim : true
			}
		);

		return parser.parseStringPromise(data)
			.then(result => new Document(elementBuilder(result.vxml) as Vxml))
			.catch(err => {
				
				//TODO custom error
				return Promise.reject(
					new Error(err.message)
					);
				}
			);
	}
}

export default Parser;