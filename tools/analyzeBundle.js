import webpack from 'webpack'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'

import configFactory from '../webpack.config.prod.babel'

process.env.NODE_ENV = 'production'

const config = configFactory()
config.plugins.push(new BundleAnalyzerPlugin({
    analyzerHost: 'localhost',
    analyzerPort: 8081
}))

const compiler = webpack(config)

compiler.run((error, stats) => {
  if (error)
    throw new Error(error)
})
