const ForkTsCheckerWebpackPlugin = require( 'fork-ts-checker-webpack-plugin' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const webpack = require( 'webpack' );
const path = require( 'path' );

const resolve = {
    extensions: [ '.js', '.ts' ],
    // Map @/ to src/. These should match tsconfig.json.
    alias: { '@': path.resolve( __dirname, './src' ) }
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
            exclude( filename ) {
                // Don't transpile package JavaScript files in development. It's slow.
                return mode === 'development' && /.*\.js$/.test( filename );
            },
            use: {
                // Type checking is performed by ForkTsCheckerWebpackPlugin.
                loader: 'ts-loader', options: {
                    transpileOnly: true,
                    appendTsSuffixTo: [/\.vue$/]
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
        new ForkTsCheckerWebpackPlugin( {
            vue: true,
            logger: {
                error: console.error,
                warn: console.warn,
                info: () => {
                    // Suppress informational messages.
                } }
        } ),
        new MiniCssExtractPlugin(),
    ];
}

module.exports.commonConfig = { resolve, rules, plugins };
