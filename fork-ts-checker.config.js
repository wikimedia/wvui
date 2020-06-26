function Logger() {
	// Fork TS Checker Webpack Plugin validates that a function is passed.
}
Logger.log = () => {
	// Suppress informational messages.
};
Logger.info = console.warn; // eslint-disable-line no-console
Logger.error = console.error; // eslint-disable-line no-console

module.exports = {
	logger: {
		issues: Logger
	}
};
