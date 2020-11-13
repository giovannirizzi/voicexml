'use strict';

const parseString = require('xml2js').parseString;
const nodeBuilder  = require('./xml/nodeBuilder');
const winston = require('winston');
const { debug } = require('winston');

class Parser {
	constructor() {

	}

	async parse(content){

		//var parser = new xml2js.Parser();
		//content = "<root name='swag'>Hello xml2js!<form></form><form></form></root>";

		var result;

		parseString(
			content, 
			{
				attrkey : 'attr',
				charkey : 'text',
				childkey : 'children',
				explicitCharkey : true,
				explicitArray : true,
				preserveChildrenOrder : true,
				explicitChildren : true
			},
			function(error, res){
				result = res;
			});
		var root = nodeBuilder(result.vxml);
		return root;
	}
}



module.exports = Parser;