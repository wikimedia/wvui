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

const resolve = {
	extensions: [ '.js', '.ts' ],
	// Map @/ to src/. These should match tsconfig.json.
	alias: { '@': path.resolve( __dirname, './src' ) }
};

const jsSourceMapExtention = '.map.json';

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
				// Type checking is performed by ForkTsCheckerWebpackPlugin.
				loader: 'ts-loader',
				options: {
					transpileOnly: true
				}
			}
		},

		// Concatenate and compile Less and CSS (embedded in SFCs or distinct files) to chunks.
		{
			test: /\.(c|le)ss$/,
			use: [
				{ loader: MiniCssExtractPlugin.loader, options: { hmr: mode === 'development' } },
				'css-loader',
				{ loader: 'less-loader', options: { sourceMap: mode === 'production' } }
			]
		}
	];
}

/**
 * List of webpack plugins to be used
 * in common configuration
 *
 * @return {webpack.Plugin[]}
 * */
function plugins() {
	return [
		new ForkTsCheckerWebpackPlugin(),
		new MiniCssExtractPlugin()
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
		assetFilter: ( filename ) => !filename.endsWith( jsSourceMapExtention )
	},

	// Accurate source maps come at the expense of build time. The source map is intentionally
	// exposed to users via sourceMapFilename for prod debugging. This goes against convention as
	// this source code is publicly distributed.
	devtool: argv.mode === 'production' ? 'source-map' : 'cheap-module-eval-source-map',

	optimization: {
		// Enable CSS minification. Unfortunately, this overrides the default JavaScript
		// minification so it must be re-enabled with the TerserJSPlugin. The default processor is
		// cssnano which uses postcss.
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
		sourceMapFilename: `[file]${jsSourceMapExtention}`,
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
		...plugins(),
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
