import fs from 'fs'

import paths from './paths'

const NODE_ENV = process.env.NODE_ENV || 'development'

// https://github.com/bkeepers/dotenv#what-other-env-files-can-i-use
var dotenvFiles = [
    `${paths.dotenv}.${NODE_ENV}.local`,
    `${paths.dotenv}.${NODE_ENV}`,
    // Don't include `.env.local` for `test` environment
    // since normally you expect tests to produce the same
    // results for everyone
    NODE_ENV !== 'test' && `${paths.dotenv}.local`,
    paths.dotenv,
].filter(Boolean)

// Load environment variables from .env* files. Suppress warnings using silent
// if this file is missing. dotenv will never modify any environment variables
// that have already been set.  Variable expansion is supported in .env files.
// https://github.com/motdotla/dotenv
// https://github.com/motdotla/dotenv-expand
let envRaw = {}
dotenvFiles.forEach(dotenvFile => {
    if (fs.existsSync(dotenvFile)) {
        const envParsed = require('dotenv-expand')(
            require('dotenv').config({
                path: dotenvFile
            })
        ).parsed

        envRaw = {
            ...envRaw,
            ...envParsed
        }
    }
})

function getClientEnvironment() {
    // Stringify all values so we can feed into Webpack DefinePlugin
    const stringified = {
        'process.env': Object.keys(envRaw)
            .reduce((env, key) => {
                env[key] = JSON.stringify(envRaw[key])
                return env
            }, {})
    }

    return { envRaw, stringified }
}

export default getClientEnvironment
