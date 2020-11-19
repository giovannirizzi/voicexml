'use strict';

const xml2js = require('xml2js');
const nodeBuilder  = require('./nodeBuilder');
const Document = require('../elements/Document');

class Parser {
	constructor() {}

	parse(data){

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
			.then(result => new Document(nodeBuilder(result.vxml)))
			.catch(err => {
				
				//TODO custom error
				return Promise.reject(
					new Error(err.message)
					);
				}
			);
	}
}

module.exports = Parser;