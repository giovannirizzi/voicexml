
import logger from './logger';

export default function (prompt : string) {
	logger.info(`${ prompt.trim() }`)
}