'use strict';

const parseString = require('xml2js').parseString;
const nodeBuilder  = require('./nodeBuilder');

class Parser {
	constructor() {

	}

	async parse(content){

		var result;

		parseString(
			content, 
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
			},
			function(error, res){
				result = res;
			});
	
		//var root = nodeBuilder(result.vxml);
		return result;
	}
}

module.exports = Parser;