const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );

module.exports = {
	stories: [ '../src/**/*.stories.ts' ],
	addons: [
		'@storybook/addon-knobs',
		'@storybook/addon-actions',
		'@storybook/addon-a11y',
		'@storybook/addon-storysource',
		'@storybook/addon-viewport',
		'@storybook/addon-backgrounds',
		'@storybook/addon-links'
	],
	/**
	 * @arg {import('webpack').Configuration} config
	 * @return {import('webpack').Configuration}
	 */
	webpackFinal: (config) => {
		config.stats = 'errors-warnings';
		config.resolve.extensions.push('.js', '.ts')

		config.module.rules = config.module.rules.concat([
			{
				test: /\.ts$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'ts-loader',
						options: {
							appendTsSuffixTo: [/\.vue$/],
							transpileOnly: true
						},
					}
				],
			},
			{
				test: /\.(c|le)ss$/,
				use: [
					{ loader: MiniCssExtractPlugin.loader, options: { hmr: config.mode === 'development' } },
					'css-loader',
					{ loader: 'less-loader', options: { sourceMap: config.mode === 'production' } }
				]
			}
		]);

		config.plugins = config.plugins.concat([
			new ForkTsCheckerWebpackPlugin({vue: true}),
			new MiniCssExtractPlugin()
		]);

		return config;
	},
	logLevel: 'warn'
};
