'use strict'

const pkg = require('./package.json')
const resources = require('./resources/index.js')

/**
 * Creates a Ciceksepeti instance.
 *
 * @param {Object} options Configuration options
 * @param {String} options.apiKey The API Key for your Çiçeksepeti store
 *
 * @constructor
 * @public
 */
class Ciceksepeti {
    constructor(options) {
        if (!(this instanceof Ciceksepeti)) return new Ciceksepeti(options)
        if (!options || !options.apiKey) {
            throw new Error('Missing or invalid options')
        }

        this.options = {
            timeout: 60000,
            apiVersion: 'v1',
            ...options,
        }

        this.baseUrl = {
            hostname: 'apis.ciceksepeti.com',
            protocol: 'https:',
        }

        this.baseHeaders = {
            'User-Agent': `${pkg.name}/${pkg.version}`,
            'x-api-key': options.apiKey,
        }
    }
}

resources.registerAll(Ciceksepeti)

module.exports = Ciceksepeti
