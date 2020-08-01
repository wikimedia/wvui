/* eslint-env node */

const { CleanWebpackPlugin } = require( 'clean-webpack-plugin' );
const CopyPlugin = require( 'copy-webpack-plugin' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const { VueLoaderPlugin } = require( 'vue-loader' );
const webpack = require( 'webpack' );

/**
 * @param {Parameters<webpack.ConfigurationFactory>[0]} _env
 * @param {Parameters<webpack.ConfigurationFactory>[1]} argv
 * @return {ReturnType<webpack.Configuration>}
 */
module.exports = ( _env, argv ) => ( {
	stats: 'errors-warnings',

	// Map of chunk names to entry files.
	entry: {
		'hello-world': './hello-world/hello-world.js'
	},

	module: {
		rules: [
			{
				test: /\.(c|le)ss$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: { hmr: argv.mode === 'development' }
					},
					'css-loader'
				]
			},
			// Process single-file components (SFCs). This matches loader extensions to the SFC
			// language attributes.
			{ test: /\.vue$/, use: 'vue-loader' }
		]
	},

	plugins: [
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin(),
		new VueLoaderPlugin(),
		new CopyPlugin( {
			patterns: [
				{ context: 'hello-world', from: '**/*.html' }
			]
		} )
	],

	devtool: argv.mode === 'production' ? 'source-map' : 'cheap-module-eval-source-map',

	devServer: {
		clientLogLevel: 'warning',
		overlay: { warnings: true, errors: true },
		stats: 'errors-warnings'
	}
} );
