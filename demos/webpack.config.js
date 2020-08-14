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
		'hello-world': './hello-world/hello-world.js',
		'hello-hydration': './hello-hydration/hello-hydration.js'
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
			{
				test: /\.vue$/,
				use: {
					loader: 'vue-loader',
					options: {
						compilerOptions: {
							// Any whitespace or comment differences between tags causes client
							// hydration to fail. When whitespace is preserved, it is difficult as a
							// client to anticipate where these occur as Vue.js is not always used
							// to generate the HTML server-side. Remove all whitespace so clients
							// can structure their elements deterministically. Note: this only
							// appears to work correctly for production builds.
							whitespace: 'condense'
						}
					}
				}
			}
		]
	},

	plugins: [
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin(),
		new VueLoaderPlugin(),
		new CopyPlugin( {
			patterns: [
				{ context: 'hello-world', from: '**/*.html' },
				{ context: 'hello-hydration', from: '**/*.html' }
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
