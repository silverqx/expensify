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
let envFile
dotenvFiles.forEach(dotenvFile => {
    if (fs.existsSync(dotenvFile)) {
        const envFileTmp = require('dotenv-expand')(
            require('dotenv').config({
                path: dotenvFile
            })
        ).parsed

        envFile = {
            ...envFile,
            ...envFileTmp
        }
    }
})

// Grab NODE_ENV and REACT_APP_* environment variables and prepare them to be
// injected into the application via DefinePlugin in Webpack configuration.
// CS_APP_ prefix will be removed.
const CS_APP = /^CS_APP_/

function getClientEnvironment() {
    const envProcess = Object.keys(process.env)
        .filter(key => CS_APP.test(key))
        .reduce(
            (env, key) => {
                // 7 is length of CS_APP_
                const newKey = key.substring(7)
                env[newKey] = process.env[key]

                return env
            },
            {
                // Useful for determining whether we’re running in production mode.
                // Most importantly, it switches React into the correct mode.
                NODE_ENV: process.env.NODE_ENV || 'development',
            }
        )
    const raw = {
        ...envFile,
        ...envProcess
    }
    // Stringify all values so we can feed into Webpack DefinePlugin
    const stringified = {
        'process.env': Object.keys(raw)
            .reduce((env, key) => {
                env[key] = JSON.stringify(raw[key])
                return env
            }, {})
    }

    return { raw, stringified }
}

export default getClientEnvironment
