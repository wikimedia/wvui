/* eslint-env node */
module.exports = {
	logger: {
		issues: {
			log() {
				// Suppress informational messaging.
			},
			warn: console.warn, // eslint-disable-line no-console
			error: console.error // eslint-disable-line no-console
		}
	}
};
