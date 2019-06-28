import createDomain from 'webpack-dev-server/lib/utils/createDomain'
import webpackStatus from 'webpack-dev-server/lib/utils/status'
import chalk from 'chalk'

export default function status(options, server, log) {
    const suffix =
        options.inline !== false || options.lazy === true
            ? '/'
            : '/webpack-dev-server/'
    const uri = createDomain(options, server.listeningApp) + suffix

    log.info(chalk.bold('Paths/URIs Info'))
    webpackStatus(uri, options, log, true)
    console.log()
}
