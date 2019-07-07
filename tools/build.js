import webpack from 'webpack'
import chalk from 'chalk'
import configFactory from "../webpack.config.prod.babel"

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
    console.log(chalk.cyan('Creating an optimized production build...'))
    console.log()

    const config = configFactory()

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

        console.log('Webpack stats:')
        console.log(stats.toString())

        // if we got this far, the build succeeded.
        console.log()
        console.log(chalk.green('Expensify application is compiled in production mode in /dist. It\'s ready to roll!'))

        return 0
    })
}
