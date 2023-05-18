'use strict';

const axios = require('axios');

const productStatuses = new Object({
    'draft': 1,
    'waiting_for_approval': 2,
    'published': 3,
    'rejected': 4,
    'passive': 5,
    'published_waiting_for_approval': 7,
    'out_of_stock': 8,
});

const sortMethods = new Object({
    'name_asc': 1,
    'name_desc': 2,
    'stock_asc': 3,
    'stock_desc': 4,
    'price_asc': 5,
    'price_desc': 6,
    'created_date_asc': 7,
    'created_date_desc': 8,
});

/**
 * Creates a Product instance.
 *
 * @param {Ciceksepeti} ciceksepeti Reference to the Ciceksepeti instance
 * @constructor
 * @public
 */
function Product(ciceksepeti) {
    this.ciceksepeti = ciceksepeti;
}

/**
 * Gets a list of products.
 *
 * @param {Object} params Query parameters
 * @return {Promise} Promise that resolves with the result
 * @public
 */
Product.prototype.list = async function list(params) {
    params = params || {};

    let url = this.ciceksepeti.baseUrl.protocol + '//' + this.ciceksepeti.baseUrl.hostname
        + '/api'
        + '/' + this.ciceksepeti.options.apiVersion
        + '/Products?'
        + (params.status ? `&ProductStatus=${productStatuses[params.status]}` : '')
        + (params.page ? `&Page=${params.page}` : '')
        + (params.pageSize ? `&PageSize=${params.pageSize}` : '')
        + (params.sortBy ? `&SortMethod=${sortMethods[params.sortBy]}` : '')
        + (params.stockCode ? `&StockCode=${params.stockCode}` : '')
        + (params.variantName ? `&VariantName=${params.variantName}` : '');

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: url,
        headers: this.ciceksepeti.baseHeaders,
        maxRedirects: 0
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
 * Counts products.
 *
 * @param {Object} params Query parameters
 * @return {Promise} Promise that resolves with the result
 * @public
 */
Product.prototype.count = async function count(params) {
    params = params || {};

    let url = this.ciceksepeti.baseUrl.protocol + '//' + this.ciceksepeti.baseUrl.hostname
        + '/api'
        + '/' + this.ciceksepeti.options.apiVersion
        + '/Products?'
        + (params.status ? `&ProductStatus=${productStatuses[params.status]}` : '')
        + (params.variantName ? `&VariantName=${params.variantName}` : '');

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: url,
        headers: this.ciceksepeti.baseHeaders,
        maxRedirects: 0
    };

    return axios(config)
        .then(function (response) {
            return {
                totalCount: response.data.totalCount,
            };
        })
        .catch(function (error) {
            throw new Error(error.response.data['Message'] || error.response.data['message']);
        });
};

/**
 * Gets a product by stock code.
 *
 * @param {Object} params Query parameters
 * @return {Promise} Promise that resolves with the result
 * @public
 */
Product.prototype.get = async function get(params) {
    params = params || {};
    if (!params.stockCode) throw new Error('Stock code (stockCode) is required.');

    let url = this.ciceksepeti.baseUrl.protocol + '//' + this.ciceksepeti.baseUrl.hostname
        + '/api'
        + '/' + this.ciceksepeti.options.apiVersion
        + '/Products?'
        + (params.stockCode ? `&StockCode=${params.stockCode}` : '');

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: url,
        headers: this.ciceksepeti.baseHeaders,
        maxRedirects: 0
    };

    return axios(config)
        .then(function (response) {
            return response.data.products[0];
        })
        .catch(function (error) {
            throw new Error(error.response.data['Message'] || error.response.data['message']);
        });
};

module.exports = Product;
