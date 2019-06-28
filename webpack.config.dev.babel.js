import path from 'path'

import webpack from 'webpack'
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin'
import DashboardPlugin from 'webpack-dashboard/plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ModuleScopePlugin from 'react-dev-utils/ModuleScopePlugin'
import ErrorOverlayPlugin from 'error-overlay-webpack-plugin'
// import ManifestPlugin from 'webpack-manifest-plugin'
// import InterpolateHtmlPlugin from 'react-dev-utils/InterpolateHtmlPlugin'

import paths from './tools/paths'

const configFactory = (env = {}) => {
    const includeDashboard = env.includeDashboard || false

    return {
        target: 'web',
        mode: 'development',
        // Best initial build / rebuild ratio
        // devtool: 'cheap-module-eval-source-map',
        // eval in not supported by error-overlay-webpack-plugin
        devtool: 'cheap-module-source-map',
        // Best quality SourceMaps for development, support column mappings
        // devtool: 'eval-source-map',

        entry: [
            paths.appIndexJs,
        ],

        output: {
            // path: paths.appBuild,
            path: undefined,
            pathinfo: true,
            filename: 'dist/js/bundle.js',
            publicPath: '/',
            // TODO remove this when upgrading to webpack 5 silver
            futureEmitAssets: true,
            chunkFilename: 'dist/js/[name].chunk.js',
            // Point sourcemap entries to original disk location (format as URL on Windows)
            devtoolModuleFilenameTemplate: info => {
                path.resolve(info.absoluteResourcePath).replace(/\\/g, '/')
            }
        },

        optimization: {
            minimize: false,
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

            new ErrorOverlayPlugin(),

            new HtmlWebpackPlugin({
                template: path.join('src', 'index.ejs'),
                inject: true
            }),

            // Makes some environment variables available in index.html.
            // The public URL is available as %PUBLIC_URL% in index.html, e.g.:
            // <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
            // In production, it will be an empty string unless you specify "homepage"
            // in `package.json`, in which case it will be the pathname of that URL.
            // In development, this will be an empty string.
            // new InterpolateHtmlPlugin(HtmlWebpackPlugin, env.raw),

            // This is necessary to emit hot updates (currently CSS only):
            new webpack.HotModuleReplacementPlugin(),

            // Watcher doesn't work well if you mistype casing in a path so we use
            // a plugin that prints an error when you attempt to do this.
            // See https://github.com/facebook/create-react-app/issues/240
            new CaseSensitivePathsPlugin(),

            // Generate a manifest file which contains a mapping of all asset filenames
            // to their corresponding output file so that tools can pick it up without
            // having to parse `index.html`.
            // new ManifestPlugin({
            //     fileName: 'asset-manifest.json',
            //     publicPath: '/',
            // }),

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
                            use: [
                                require.resolve('style-loader'),
                                {
                                    loader: require.resolve('css-loader'),
                                    options: {
                                        sourceMap: true
                                    }
                                },
                                // {
                                //     loader: require.resolve('postcss-loader'),
                                //     options: {
                                //         plugins: () => [
                                //             require('autoprefixer')
                                //         ],
                                //         sourceMap: true
                                //     }
                                // },
                                {
                                    loader: require.resolve('sass-loader'),
                                    options: {
                                        includePaths: [path.resolve(__dirname, 'src', 'styles')],
                                        sourceMap: true
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        },

        devServer: {
            // By default WebpackDevServer serves physical files from current directory
            // in addition to all the virtual build products that it serves from memory.
            // This is confusing because those files won’t automatically be available in
            // production build folder unless we copy them. However, copying the whole
            // project directory is dangerous because we may expose sensitive files.
            // Instead, we establish a convention that only files in `public` directory
            // get served. Our build script will copy `public` into the `build` folder.
            // In `index.html`, you can get URL of `public` folder with %PUBLIC_URL%:
            // <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
            // In JavaScript code, you can access it with `process.env.PUBLIC_URL`.
            // Note that we only recommend to use `public` folder as an escape hatch
            // for files like `favicon.ico`, `manifest.json`, and libraries that are
            // for some reason broken when imported through Webpack. If you just want to
            // use an image, put it in `src` and `import` it from JavaScript instead.
            contentBase: paths.appPublic,
            historyApiFallback: {
                // Paths with dots should still use the history fallback.
                // See https://github.com/facebook/create-react-app/issues/387.
                disableDotRule: true,
            },
            // It is important to tell WebpackDevServer to use the same "root" path
            // as we specified in the config. In development, we always serve from /.
            publicPath: '/',
            // Enable gzip compression of generated files.
            compress: true,
            // By default files from `contentBase` will not trigger a page reload.
            watchContentBase: true,
            // Enable hot reloading server. It will provide /sockjs-node/ endpoint
            // for the WebpackDevServer client so it can learn when the files were
            // updated. The WebpackDevServer client is included as an entry point
            // in the Webpack development configuration. Note that only changes
            // to CSS are currently hot reloaded. JS changes will refresh the browser.
            hot: true,
            overlay: false,
            // WebpackDevServer 2.4.3 introduced a security fix that prevents remote
            // websites from potentially accessing local content through DNS rebinding:
            // https://github.com/webpack/webpack-dev-server/issues/887
            // https://medium.com/webpack/webpack-dev-server-middleware-security-issues-1489d950874a
            // However, it made several existing use cases such as development in cloud
            // environment or subdomains in development significantly more complicated:
            // https://github.com/facebook/create-react-app/issues/2271
            // https://github.com/facebook/create-react-app/issues/2233
            // While we're investigating better solutions, for now we will take a
            // compromise. Since our WDS configuration only serves files in the `public`
            // folder we won't consider accessing them a vulnerability. However, if you
            // use the `proxy` feature, it gets more dangerous because it can expose
            // remote code execution vulnerabilities in backends like Django and Rails.
            // So we will disable the host check normally, but enable it if you have
            // specified the `proxy` setting. Finally, we let you override it if you
            // really know what you're doing with a special environment variable.
            // disableHostCheck:
            //     !proxy || process.env.DANGEROUSLY_DISABLE_HOST_CHECK === 'true',
        }
    }
}

export default configFactory
