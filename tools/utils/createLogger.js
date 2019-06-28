import log from 'webpack-log'

export default function createLogger(config = {}) {
    let level = config.logLevel || 'info'

    if (config.noInfo === true)
        level = 'warn'

    if (config.quiet === true)
        level = 'silent'

    const name = config.logName || 'crystal'

    return log({
        name,
        level,
        timestamp: config.logTime,
    })
}
