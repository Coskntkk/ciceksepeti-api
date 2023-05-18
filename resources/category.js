'use strict';

const Ciceksepeti = require('..');
const axios = require('axios');

/**
 * Creates a Category instance.
 *
 * @param {Ciceksepeti} ciceksepeti Reference to the Ciceksepeti instance
 * @constructor
 * @public
 */
function Category(ciceksepeti) {
    this.ciceksepeti = ciceksepeti;
}

/**
 * Returns a list of Categories.
 *
 * @return {Promise} Promise that resolves with the result
 * @public
 */
Category.prototype.list = async function list() {
    let url = this.ciceksepeti.baseUrl.protocol + '//' + this.ciceksepeti.baseUrl.hostname
        + '/api'
        + '/' + this.ciceksepeti.options.apiVersion
        + '/Categories';

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: url,
        headers: this.ciceksepeti.baseHeaders,
        maxRedirects: 0,
    };

    return axios(config)
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            throw new Error(error.response.data['Message'] || error.response.data['message']);
        });
};

/**
 * Returns attributes of a Category.
 *
 * @param {Object} params Query parameters
 * @return {Promise} Promise that resolves with the result
 * @public
 */
Category.prototype.attributes = async function attributes(params) {
    params = params || {};
    if (!params.id) {
        throw new Error('Category ID (id) is required.');
    }

    let url = this.ciceksepeti.baseUrl.protocol + '//' + this.ciceksepeti.baseUrl.hostname
        + '/api'
        + '/' + this.ciceksepeti.options.apiVersion
        + '/Categories'
        + '/' + params.id
        + '/attributes';

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: url,
        headers: this.ciceksepeti.baseHeaders,
        maxRedirects: 0,
    };

    return axios(config)
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            throw new Error(error.response.data['Message'] || error.response.data['message']);
        });
};

module.exports = Category;
