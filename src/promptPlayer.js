'use strict';

const logger = require('./logger');

module.exports = function (prompt) {
	logger.info(`${ prompt.trim() }`)
}