import webpack from 'webpack'
import chalk from 'chalk'
import configFactory from "../webpack.config.prod.babel"
import fs from 'fs-extra'
import path from 'path'

import paths from './paths'

process.env.BABEL_ENV = 'production'
process.env.NODE_ENV = 'production'

process.on('unhandledRejection', err => {
    console.log(chalk.red('\nUnhandled Rejection\n'))
    console.log('Reason:')
    console.error(err)
})

// Main Function
build()

async function build() {
    const config = configFactory()

    // Remove all content but keep the directory so that
    // if you're in it, you don't end up in Trash
    fs.emptyDirSync(paths.appBuild);

    console.log(chalk.cyan('Copying public/ folder into build...'))
    console.log()
    // Merge with the public folder
    copyPublicFolder()

    console.log(chalk.cyan('Creating an optimized production build...'))
    console.log()

    webpack(config).run((err, stats) => {
        if (err) { // so a fatal error occurred. Stop here.
            console.error(error)
            return 1
        }

        const jsonStats = stats.toJson()

        if (jsonStats.hasErrors) {
            console.log(chalk.yellow('Webpack generated the following errors:'))
            return jsonStats.errors.map(error => console.log(chalk.red(error)))
        }

        if (jsonStats.hasWarnings) {
            console.log(chalk.yellow('Webpack generated the following warnings:'))
            jsonStats.warnings.map(warning => console.log(chalk.yellow(warning)))
        }

        console.log(chalk.blue('Webpack stats:'))
        console.log(stats.toString())

        // if we got this far, the build succeeded.
        console.log()
        console.log(chalk.green('Expensify application is compiled in production mode in /dist. It\'s ready to roll!'))

        return 0
    })
}

function copyPublicFolder() {
    fs.copySync(paths.appPublic, paths.appBuild, {
        dereference: true,
        // Prevent dist folder overwrite
        filter: src => src !== path.resolve(paths.appPublic, 'dist'),
        // filter: file => file !== paths.appHtml,
    });
}
