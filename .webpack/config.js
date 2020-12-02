/* eslint-env node */
/**
 * All Webpack configuration specific to building. For configuration shared with Storybook, see
 * common.js.
 */

const { CleanWebpackPlugin } = require( 'clean-webpack-plugin' );
const OptimizeCSSAssetsPlugin = require( 'optimize-css-assets-webpack-plugin' );
const TerserJSPlugin = require( 'terser-webpack-plugin' );
const { VueLoaderPlugin } = require( 'vue-loader' );
const path = require( 'path' );
const webpack = require( 'webpack' );
const { BundleAnalyzerPlugin } = require( 'webpack-bundle-analyzer' );
const { resolve, plugins, rules } = require ('./common.js');

// The extension used for source map files. Per T173491, files with a .map extension cannot be
// served from prod. It doesn't seem to be practical to rename the CSS source maps.
const jsSourceMapExtension = '.map.json';

// Enumeration of chunk names. The key is a symbol and the value is the chunk name and file stem.
// # See readme.md#different-builds for details. Some of these chunks have specific entry points
// under src/entries and others are generated automatically.
const Chunk = {
	Wvui: 'wvui',
	WvuiIcons: 'wvui-icons'
};

/**
 * @param {Parameters<webpack.ConfigurationFactory>[1]} argv
 * @param {string} name
 * @param {string|string[]|Record<string, string>} entry
 * @param {import('webpack').LibraryTarget} libraryTarget
 * @return {webpack.Configuration}
 */
function config( argv, name, entry, libraryTarget ) {
	return {
		name,

		stats: {
			all: false,
			// Output a timestamp when a build completes. Useful when watching files.
			builtAt: true,
			errors: true,
			warnings: true
		},

		resolve,

		// Map of chunk names to entry files.
		entry,

		// Omit these external dependencies to be provided by the consumer.
		externals: [ 'vue' ],

		performance: {
			// The default filter excludes map files but we rename ours. See T173491.
			assetFilter: ( filename ) => !filename.endsWith( jsSourceMapExtension )
		},

		// Disabling sourcemaps in production because the comment at the end of the file 
		// causes an "unexpected end of input" error with MediaWiki's ResourceLoader.
		devtool: argv.mode === 'development' ? 'cheap-module-eval-source-map' : false,

		optimization: {
			// Enable CSS minification.
			// - Unfortunately, this overrides the default JavaScript minification so it must be
			//   re-enabled with the TerserJSPlugin.
			// - The default processor is cssnano which uses postcss. It does not appear to be
			//   possible to enable this step during the loading stage and preserve source maps
			//   correctly.
			// - cssnano can itself be configured to use autoprefixer but 1) this requires the
			//   advanced preset dependency and is unavailable in the default preset 2) autoprefixer
			//   must then be configured to _add_ prefixes as a minifier is only concerned with
			//   eliminating code.
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
			] : [],
			minimize: libraryTarget !== 'commonjs2'
		},

		output: {
			filename: `${name}.js`,
			path: ( libraryTarget === 'umd' ) ? path.resolve( __dirname, '../dist' ) : path.resolve( __dirname, `../dist/${libraryTarget}` ),
			sourceMapFilename: `[file]${jsSourceMapExtension}`,
			// Set the name to avoid possible Webpack runtime collisions of globals with other
			// Webpack runtimes. See https://webpack.js.org/configuration/output/#outputuniquename.
			library: 'wvui',
			libraryTarget: libraryTarget,
			// https://github.com/webpack/webpack/issues/6525
			globalObject: 'this'
		},

		module: {
			rules: [
				...rules( argv.mode ),
				// Process single-file components (SFCs). This matches loader extensions to the SFC
				// language attributes.
				{ test: /\.vue$/, use: 'vue-loader' }
			]
		},

		plugins: [
			...plugins( argv.mode ),
			new VueLoaderPlugin(),
			new BundleAnalyzerPlugin( {
				analyzerMode: argv.mode === 'development' ? 'disabled' : 'static',
				reportFilename: path.resolve( __dirname, `../docs/sourceMaps/${name}-analysis.html` ),
				defaultSizes: 'gzip',
				openAnalyzer: false,
				generateStatsFile: argv.mode !== 'development',
				statsFilename: path.resolve( __dirname, `../docs/sourceMaps/${name}-analysis.json` ),
				logLevel: 'warn'
			} )
		]
	};
}

// Only clean the dist folder on the first config. If it is cleaned multiple times, only the config
// will be preserved. See https://github.com/johnagan/clean-webpack-plugin/issues/122.
const clean = new CleanWebpackPlugin();
// Don't delete the ES5 linter config.
clean.removeFiles( [ 'dist/**/*', '!dist/.eslintrc.json' ] );

/**
 * @param {Parameters<webpack.ConfigurationFactory>[0]} _env
 * @param {Parameters<webpack.ConfigurationFactory>[1]} argv
 * @return {ReturnType<webpack.ConfigurationFactory>[]}
 */
module.exports = ( _env, argv ) => [
	config( argv, 'wvui', { [ Chunk.Wvui ]: path.resolve( __dirname, '../src/entries/wvui.ts' ) }, 'umd' ),
	config( argv, 'wvui-icons', { [ Chunk.WvuiIcons ]: path.resolve( __dirname, '../src/entries/wvui-icons.ts' ) }, 'umd' ),
	config( argv, 'wvui.commonjs2', { [ Chunk.Wvui ]: path.resolve( __dirname, '../src/entries/wvui.ts' ) }, 'commonjs2' ),
	config( argv, 'wvui-icons.commonjs2', { [ Chunk.WvuiIcons ]: path.resolve( __dirname, '../src/entries/wvui-icons.ts' ) }, 'commonjs2' )
];
