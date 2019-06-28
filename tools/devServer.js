import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import chalk from 'chalk'
import { choosePort } from 'react-dev-utils/WebpackDevServerUtils'
import yargs from 'yargs'

import configFactory from '../webpack.config.dev.babel'
import clearConsole from './utils/clearConsole'
import createLogger from './utils/createLogger'
import status from './utils/status'

// Parse command line arguments
const argv = parseArgv()
const isInteractive = process.stdout.isTTY

// Default options for dev. server
const HOST = 'localhost'
const PORT = 8080

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'development'
process.env.NODE_ENV = 'development'

process.on('unhandledRejection', err => {
    console.log(chalk.red('Unhandled Rejection\n\n'))
    console.log('Reason:', err)
})

// Main Function
startDevServer()

// const startDevServer = async () => {
async function startDevServer() {
    // create dev server config
    const includeDashboard = argv.dashboard
    const webpackConfig = configFactory({ includeDashboard })
    const config = {
        ...webpackConfig.devServer,
    }
    const log = createLogger(config)

    // We attempt to use the default port but if it is busy, we offer the user to
    // run on a different port. `choosePort()` Promise resolves to the next free port.
    const chosenPort = await choosePort(HOST, PORT)
    // We have not found a port
    if (chosenPort === null)
        return

    const compiler = webpack(webpackConfig)
    // Start Server
    const server = new WebpackDevServer(compiler, config)

    server.listen(chosenPort, HOST, err => {
        if (err)
            return console.error(err)

        if (isInteractive)
            clearConsole()

        if (!config.host)
            config.host = 'localhost'

        // Show Paths/URIs info
        status(config, server, log)
    })

    let closing = false
    const signals = ['SIGINT', 'SIGTERM']
    signals.forEach(signal => {
        process.on(signal, () => {
            if (closing)
                return
            closing = true

            console.log('\n')
            console.log(chalk.cyan('Obtained SIGINT/SIGTERM signal, closing gracefully'))

            server.close(() => {
                process.exit()
            })
        })
    })
}

function parseArgv() {
    return yargs
        .usage('\nRun WebpackDevServer')
        .option('dashboard', {
            describe: 'Include webpack-dashboard plugin',
            alias: 'd',
            default: false,
            type: 'boolean'
        })
        .help('help')
        .alias('help', 'h')
        .version('0.1.0')
        .alias('version', 'v')
        .argv
}
