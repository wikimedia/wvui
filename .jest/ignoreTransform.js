// See https://jestjs.io/docs/en/tutorial-react#custom-transformers.
module.exports = {
	/**
	 * Accepts a path and returns the transformed result. This transform deliberately ignores the
	 * input and always returns an empty string. This is a useful operation for imports that should
	 * have no effect during testing.
	 *
	 * @return {string}
	 */
	process() {
		return '';
	}
};
