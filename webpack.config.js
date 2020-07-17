/* eslint-env node */

const ForkTsCheckerWebpackPlugin = require( 'fork-ts-checker-webpack-plugin' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const { CleanWebpackPlugin } = require( 'clean-webpack-plugin' );
const OptimizeCSSAssetsPlugin = require( 'optimize-css-assets-webpack-plugin' );
const TerserJSPlugin = require( 'terser-webpack-plugin' );
const { VueLoaderPlugin } = require( 'vue-loader' );
const webpack = require( 'webpack' );
const path = require( 'path' );
const { BundleAnalyzerPlugin } = require( 'webpack-bundle-analyzer' );
const { version } = require( './package.json' );

const resolve = {
	extensions: [ '.js', '.ts' ],
	// Map @/ to src/. These should match tsconfig.json.
	alias: { '@': path.resolve( __dirname, './src' ) }
};

// The extension used for source map files. Per T173491, files with a .map extension cannot be
// served from prod. It doesn't seem to be practical to rename the CSS source maps.
const jsSourceMapExtension = '.map.json';

// Enumeration of chunk names. The key is a symbol and the value is the chunk name and file stem.
// # See readme.md#different-builds for details. Some of these chunks have specific entry points
// under src/entries and others are generated automatically.
const Chunk = {
	Wvui: 'wvui'
};

/**
 * Common webpack rules
 *
 * @param {'development' | 'production' | 'none'} [mode]
 * @return {webpack.RuleSetRule[]}
 */
function rules( mode ) {
	return [
		// Transpile TypeScript to JavaScript (embedded in SFCs or distinct files). Also, grab
		// any JavaScript so that is transpiled to ES5.
		{
			test: /\.[jt]s$/,
			// Do not process node_modules at all. This means no transpilation of dependencies.
			include: path.resolve( __dirname, 'src' ),
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
 * */
function plugins( mode ) {
	return [
		...( mode === 'development' ? [ new ForkTsCheckerWebpackPlugin() ] : [] ),
		new MiniCssExtractPlugin(),
		// The DefinePlugins entries should be kept in sync with Environment.d.ts.
		new webpack.DefinePlugin( {
			VERSION: JSON.stringify( version )
		} )
	];
}

/**
 * @param {Parameters<webpack.ConfigurationFactory>[0]} _env
 * @param {Parameters<webpack.ConfigurationFactory>[1]} argv
 * @return {ReturnType<webpack.ConfigurationFactory>}
 */
module.exports = ( _env, argv ) => ( {
	stats: {
		all: false,
		// Output a timestamp when a build completes. Useful when watching files.
		builtAt: true,
		errors: true,
		warnings: true
	},

	resolve,

	// Map of chunk names to entry files.
	entry: {
		[ Chunk.Wvui ]: './src/entries/wvui.ts'
		// Other chunks are configured under optimization.
	},

	// Omit these external dependencies to be provided by the consumer.
	externals: [ 'vue' ],

	performance: {
		// The default filter excludes map files but we rename ours. See T173491.
		assetFilter: ( filename ) => !filename.endsWith( jsSourceMapExtension )
	},

	// Accurate source maps come at the expense of build time. The source map is intentionally
	// exposed to users via sourceMapFilename for prod debugging. This goes against convention as
	// this source code is publicly distributed.
	devtool: argv.mode === 'production' ? 'source-map' : 'cheap-module-eval-source-map',

	optimization: {
		// Enable CSS minification.
		// - Unfortunately, this overrides the default JavaScript minification so it must be
		//   re-enabled with the TerserJSPlugin.
		// - The default processor is cssnano which uses postcss. It does not appear to be possible
		//   to enable this step during the loading stage and preserve source maps correctly.
		// - cssnano can itself be configured to use autoprefixer but 1) this requires the advanced
		//   preset dependency and is unavailable in the default preset 2) autoprefixer must then be
		//   configured to _add_ prefixes as a minifier is only concerned with eliminating code.
		// https://github.com/webpack-contrib/mini-css-extract-plugin#minimizing-for-production
		// https://github.com/NMFR/optimize-css-assets-webpack-plugin
		// https://cssnano.co
		minimizer: argv.mode === 'production' ? [
			new TerserJSPlugin(),
			new OptimizeCSSAssetsPlugin( {
				cssProcessorOptions: {
					// Keep sourceMappingURL comments in the output CSS.
					// https://github.com/postcss/postcss/blob/master/docs/source-maps.md
					map: { annotation: true }
				}
			} )
		] : []
	},

	output: {
		sourceMapFilename: `[file]${jsSourceMapExtension}`,
		// Set the name to avoid possible Webpack runtime collisions of globals with other Webpack
		// runtimes. See https://webpack.js.org/configuration/output/#outputuniquename.
		library: 'wvui',
		libraryTarget: 'umd',
		// https://github.com/webpack/webpack/issues/6525
		globalObject: 'this'
	},

	module: {
		rules: [
			...rules( argv.mode ),
			// Process single-file components (SFCs). This match loader extensions to the SFC
			// language attributes.
			{ test: /\.vue$/, use: 'vue-loader' }
		]
	},

	plugins: [
		new CleanWebpackPlugin( {
			// Don't delete the ES5 linter config.
			cleanOnceBeforeBuildPatterns: [ '**/*', '!.eslintrc.json' ]
		} ),
		...plugins( argv.mode ),
		new VueLoaderPlugin(),
		new BundleAnalyzerPlugin( {
			analyzerMode: argv.mode === 'development' ? 'disabled' : 'static',
			reportFilename: path.resolve( __dirname, 'docs/sourceMaps/analysis.html' ),
			defaultSizes: 'gzip',
			openAnalyzer: false,
			generateStatsFile: argv.mode !== 'development',
			statsFilename: path.resolve( __dirname, 'docs/sourceMaps/analysis.json' ),
			logLevel: 'warn'
		} )
	]
} );

module.exports.commonConfig = { resolve, rules, plugins };
