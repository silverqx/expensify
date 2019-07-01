import path from 'path'

import webpack from 'webpack'
import DashboardPlugin from 'webpack-dashboard/plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ModuleScopePlugin from 'react-dev-utils/ModuleScopePlugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin'
import ManifestPlugin from 'webpack-manifest-plugin'
import TerserPlugin from 'terser-webpack-plugin'
// import InterpolateHtmlPlugin from 'react-dev-utils/InterpolateHtmlPlugin'

import paths from './tools/paths'

const shouldUseSourceMap = true

const configFactory = (env = {}) => {
    const includeDashboard = env.includeDashboard || false

    return {
        target: 'web',
        mode: 'production',
        // Stop compilation early
        bail: true,
        devtool: shouldUseSourceMap ? 'source-map' : false,

        entry: [
            paths.appIndexJs,
        ],

        output: {
            // path: paths.appBuild,
            path: paths.appBuild,
            pathinfo: false,
            publicPath: '/',
            filename: 'dist/js/[name].[contenthash:8].js',
            chunkFilename: 'dist/js/[name].[contenthash:8].chunk.js',
            // TODO remove this when upgrading to webpack 5 silver
            futureEmitAssets: true,
            // Point sourcemap entries to original disk location (format as URL on Windows)
            devtoolModuleFilenameTemplate: info =>
                path
                    .relative(paths.appSrc, info.absoluteResourcePath)
                    .replace(/\\/g, '/')
        },

        optimization: {
            minimize: true,
            // Automatically split vendor and commons
            // https://twitter.com/wSokra/status/969633336732905474
            // https://medium.com/webpack/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization-be739a861366
            splitChunks: {
                chunks: 'all',
                name: false,
            },
            // Keep the runtime chunk separated to enable long term caching
            // https://twitter.com/wSokra/status/969679223278505985
            runtimeChunk: true,
            minimizer: [
                // This is only used in production mode
                new TerserPlugin({
                    terserOptions: {
                        parse: {
                            // we want terser to parse ecma 8 code. However, we don't want it
                            // to apply any minfication steps that turns valid ecma 5 code
                            // into invalid ecma 5 code. This is why the 'compress' and 'output'
                            // sections only apply transformations that are ecma 5 safe
                            // https://github.com/facebook/create-react-app/pull/4234
                            ecma: 8,
                        },
                        compress: {
                            ecma: 5,
                            warnings: false,
                            // Disabled because of an issue with Uglify breaking seemingly valid code:
                            // https://github.com/facebook/create-react-app/issues/2376
                            // Pending further investigation:
                            // https://github.com/mishoo/UglifyJS2/issues/2011
                            comparisons: false,
                            // Disabled because of an issue with Terser breaking valid code:
                            // https://github.com/facebook/create-react-app/issues/5250
                            // Pending further investigation:
                            // https://github.com/terser-js/terser/issues/120
                            inline: 2,
                        },
                        mangle: {
                            safari10: true,
                        },
                        output: {
                            ecma: 5,
                            comments: false,
                            // Turned on because emoji and regex is not minified properly using default
                            // https://github.com/facebook/create-react-app/issues/2488
                            ascii_only: true,
                        },
                    },
                    // Use multi-process parallel running to improve the build speed
                    // Default number of concurrent runs: os.cpus().length - 1
                    parallel: true,
                    // Enable file caching
                    cache: true,
                    sourceMap: shouldUseSourceMap
                }),
                // This is only used in production mode
                new OptimizeCssAssetsPlugin({
                    cssProcessorOptions: {
                        // postcss-safe-parser is much more tolerant to old style css with hacks
                        // cssnano is used by default
                        // parser: safePostCssParser,
                        map: shouldUseSourceMap ? {
                            // `inline: false` forces the sourcemap to be output into a
                            // separate file
                            inline: false,
                            // `annotation: true` appends the sourceMappingURL to the end of
                            // the css file, helping the browser find the sourcemap
                            annotation: true,
                        } : false
                    }
                })
            ]
        },

        resolve: {
            plugins: [
                // Prevents users from importing files from outside of src/ (or node_modules/).
                // This often causes confusion because we only process files within src/ with babel.
                // To fix this, we prevent you from importing files out of src/ -- if you'd like to,
                // please link the files into your node_modules/ and let module-resolution kick in.
                // Make sure your source files are compiled, as they will not be processed in any way.
                new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson])
            ]
        },

        plugins: [
            new CleanWebpackPlugin(),
            // new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("production") }),
            // new HardSourceWebpackPlugin(),

            new HtmlWebpackPlugin({
                template: path.join('src', 'index.ejs'),
                inject: true,
                minify: {
                    removeComments: true,
                    collapseWhitespace: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeStyleLinkTypeAttributes: true,
                    keepClosingSlash: true,
                    minifyJS: true,
                    minifyCSS: true,
                    minifyURLs: true,
                },
            }),

            // Inlines the webpack runtime script. This script is too small to warrant
            // a network request.
            // new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/runtime~.+[.]js/]),

            // Makes some environment variables available in index.html.
            // The public URL is available as %PUBLIC_URL% in index.html, e.g.:
            // <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
            // In production, it will be an empty string unless you specify "homepage"
            // in `package.json`, in which case it will be the pathname of that URL.
            // In development, this will be an empty string.
            // new InterpolateHtmlPlugin(HtmlWebpackPlugin, env.raw),

            new MiniCssExtractPlugin({
                // Options similar to the same options in webpackOptions.output
                // both options are optional
                filename: 'dist/css/[name].[contenthash:8].css',
                chunkFilename: 'dist/css/[name].[contenthash:8].chunk.css',
            }),

            // Generate a manifest file which contains a mapping of all asset filenames
            // to their corresponding output file so that tools can pick it up without
            // having to parse `index.html`.
            new ManifestPlugin({
                fileName: 'asset-manifest.json',
                publicPath: '/',
            }),

            // Moment.js is an extremely popular library that bundles large locale files
            // by default due to how Webpack interprets its code. This is a practical
            // solution that requires the user to opt into importing specific locales.
            // https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
            // You can remove this if you don't use Moment.js:
            new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),

            // Instead of classic webpack output show webpack-dashboard
            // https://github.com/FormidableLabs/webpack-dashboard
            includeDashboard && new DashboardPlugin(),

        ].filter(Boolean), // Filter out false values from plugins array

        module: {
            // When importing something what was not exported, log error instead of warning
            // https://github.com/webpack/webpack/issues/4897
            strictExportPresence: true,

            rules: [
                // Disable require.ensure as it's not a standard language feature.
                { parser: { requireEnsure: false } },

                // "oneOf" will traverse all following loaders until one will
                // match the requirements. When no loader matches it will fall
                // back to the "file" loader at the end of the loader list.
                {
                    oneOf: [
                        // "url" loader works like "file" loader except that it embeds assets
                        // smaller than specified limit in bytes as data URLs to avoid requests.
                        // A missing `test` is equivalent to a match.
                        {
                            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                            loader: require.resolve('url-loader'),
                            options: {
                                limit: 10000,
                                name: 'dist/images/[name].[hash:8].[ext]',
                            },
                        },

                        {
                            test: /\.js$/,
                            include: path.resolve(__dirname, 'src'),
                            loader: require.resolve('babel-loader')
                        },

                        // "postcss" loader applies autoprefixer to our CSS.
                        // "css" loader resolves paths in CSS and adds assets as dependencies.
                        // "style" loader turns CSS into JS modules that inject <style> tags.
                        // In production, we use MiniCSSExtractPlugin to extract that CSS
                        // to a file, but in development "style" loader enables hot editing
                        // of CSS.
                        {
                            test: /\.css|\.scss$/,
                            // Don't consider CSS imports dead code even if the
                            // containing package claims to have no side effects.
                            // Remove this when webpack adds a warning or an error for this.
                            // See https://github.com/webpack/webpack/issues/6571
                            // sideEffects: true,
                            use: [
                                MiniCssExtractPlugin.loader,
                                {
                                    loader: require.resolve('css-loader'),
                                    options: {
                                        // Increase to 2 when postcss-loader is active
                                        importLoaders: 1,
                                        sourceMap: shouldUseSourceMap
                                    }
                                },
                                // {
                                //     loader: require.resolve('postcss-loader'),
                                //     options: {
                                //         plugins: () => [
                                //             require('autoprefixer')
                                //         ],
                                //         sourceMap: shouldUseSourceMap
                                //     }
                                // },
                                {
                                    loader: require.resolve('sass-loader'),
                                    options: {
                                        includePaths: [path.resolve(__dirname, 'src', 'styles')],
                                        sourceMap: shouldUseSourceMap
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    }
}

export default configFactory
