/* eslint-env node */
/** All Webpack configuration that is shared between Storybook and building. */

const ForkTsCheckerWebpackPlugin = require( 'fork-ts-checker-webpack-plugin' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const webpack = require( 'webpack' );
const path = require( 'path' );
const { version } = require( '../package.json' );

module.exports.resolve = {
	extensions: [ '.js', '.ts' ],
	// Map @/ to src/. These should match tsconfig.json.
	alias: { '@': path.resolve( __dirname, '../src' ) }
};

/**
 * Common webpack rules
 *
 * @param {'development' | 'production' | 'none'} [mode]
 * @return {webpack.RuleSetRule[]}
 */
module.exports.rules = ( mode ) => {
	return [
		// Transpile TypeScript to JavaScript (embedded in SFCs or distinct files). Also, grab
		// any JavaScript so that is transpiled to ES5.
		{
			test: /\.[jt]s$/,
			// Do not process node_modules at all. This means no transpilation of dependencies.
			include: path.resolve( __dirname, '../src' ),
			use: {
				loader: 'ts-loader',
				options: {
					// Type checking is performed by ForkTsCheckerWebpackPlugin which does not emit
					// TypeScript definitions. See
					// https://github.com/TypeStrong/fork-ts-checker-webpack-plugin/issues/49
					transpileOnly: mode === 'development',
					// Needed when transpiling.
					appendTsSuffixTo: [ /\.vue$/ ]
				}
			}
		},

		// Concatenate and compile Less and CSS (embedded in SFCs or distinct files) to chunks.
		{
			test: /\.(c|le)ss$/,
			use: [
				{ loader: MiniCssExtractPlugin.loader, options: { hmr: mode === 'development' } },
				{
					loader: 'css-loader',
					options: {
						// The number of loaders applied before CSS loader. This is the recommended
						// postcss-loader configuration.
						// https://github.com/webpack-contrib/css-loader#importloaders
						// https://github.com/postcss/postcss-loader#config-cascade
						importLoaders: 2
					}
				},
				'postcss-loader',
				'less-loader'
			]
		}
	];
}

/**
 * List of webpack plugins to be used
 * in common configuration
 *
 * @param {'development' | 'production' | 'none'} [mode]
 * @return {webpack.Plugin[]}
 */
module.exports.plugins = ( mode ) => [
	...( mode === 'development' ? [ new ForkTsCheckerWebpackPlugin() ] : [] ),
	new MiniCssExtractPlugin(),
	// The DefinePlugins entries should be kept in sync with Environment.d.ts.
	new webpack.DefinePlugin( {
		VERSION: JSON.stringify( version )
	} )
];
