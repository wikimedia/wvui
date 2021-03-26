/* eslint-env node */
const { resolve, rules, plugins } = require( '../.webpack/common.js' );

module.exports = {
	stories: [ '../src/**/*.stories.ts' ],

	addons: [
		'@storybook/addon-docs',
		'@storybook/addon-controls',
		'@storybook/addon-actions',
		'@storybook/addon-a11y',
		'@storybook/addon-storysource',
		'@storybook/addon-viewport',
		'@storybook/addon-backgrounds',
		'@storybook/addon-links'
	],

	/**
	 * @param {Required<import('webpack').Configuration>} config
	 * @return {import('webpack').Configuration}
	 */
	webpackFinal: ( config ) => {
		config.stats = 'errors-warnings';
		Object.assign( config.resolve.extensions, resolve.extensions );
		Object.assign( config.resolve.alias, resolve.alias );
		config.module.rules.push( ...rules( config.mode ) );
		config.plugins.push( ...plugins( config.mode ) );
		config.performance = {
			// Disable Webpack bundle size warnings. These apply to the docs only and are not a
			// priority to fix.
			hints: false
		};

		return config;
	},

	// Only report warnings and errors in the browser console.
	logLevel: 'warn'
};
