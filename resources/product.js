'use strict'

const axios = require('axios')

const productStatuses = new Object({
    draft: 1,
    waiting_for_approval: 2,
    published: 3,
    rejected: 4,
    passive: 5,
    published_waiting_for_approval: 7,
    out_of_stock: 8,
})

const sortMethods = new Object({
    name_asc: 1,
    name_desc: 2,
    stock_asc: 3,
    stock_desc: 4,
    price_asc: 5,
    price_desc: 6,
    created_date_asc: 7,
    created_date_desc: 8,
})

const deliveryTypes = new Object({
    with_service: 1,
    with_cargo: 2,
    with_service_and_cargo: 3,
})

const deliveryMessageTypes = new Object({
    cicek_service: 1,
    gift_cargo_same_day: 4,
    gift_cargo_1_3_days: 5,
    gift_cargo_1_2_days: 18,
})

/**
 * Creates a Product instance.
 *
 * @param {Ciceksepeti} ciceksepeti Reference to the Ciceksepeti instance
 * @constructor
 * @public
 */
function Product(ciceksepeti) {
    this.ciceksepeti = ciceksepeti
}

/**
 * Gets a list of products.
 *
 * @param {Object} params Query parameters
 * @return {Promise} Promise that resolves with the result
 * @public
 */
Product.prototype.list = async function list(params) {
    params = params || {}

    let url =
        this.ciceksepeti.baseUrl.protocol +
        '//' +
        this.ciceksepeti.baseUrl.hostname +
        '/api' +
        '/' +
        this.ciceksepeti.options.apiVersion +
        '/Products?' +
        (params.status ? `&ProductStatus=${productStatuses[params.status]}` : '') +
        (params.page ? `&Page=${params.page}` : '') +
        (params.pageSize ? `&PageSize=${params.pageSize}` : '') +
        (params.sortBy ? `&SortMethod=${sortMethods[params.sortBy]}` : '') +
        (params.stockCode ? `&StockCode=${params.stockCode}` : '') +
        (params.variantName ? `&VariantName=${params.variantName}` : '')

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: url,
        headers: this.ciceksepeti.baseHeaders,
        maxRedirects: 0,
    }

    return axios(config)
        .then(function (response) {
            return response.data
        })
        .catch(function (error) {
            throw new Error(error.response.data['Message'] || error.response.data['message'])
        })
}

/**
 * Counts products.
 *
 * @param {Object} params Query parameters
 * @return {Promise} Promise that resolves with the result
 * @public
 */
Product.prototype.count = async function count(params) {
    params = params || {}

    let url =
        this.ciceksepeti.baseUrl.protocol +
        '//' +
        this.ciceksepeti.baseUrl.hostname +
        '/api' +
        '/' +
        this.ciceksepeti.options.apiVersion +
        '/Products?' +
        (params.status ? `&ProductStatus=${productStatuses[params.status]}` : '') +
        (params.variantName ? `&VariantName=${params.variantName}` : '')

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: url,
        headers: this.ciceksepeti.baseHeaders,
        maxRedirects: 0,
    }

    return axios(config)
        .then(function (response) {
            return {
                totalCount: response.data.totalCount,
            }
        })
        .catch(function (error) {
            throw new Error(error.response.data['Message'] || error.response.data['message'])
        })
}

/**
 * Gets a product by stock code.
 *
 * @param {Object} params Query parameters
 * @return {Promise} Promise that resolves with the result
 * @public
 */
Product.prototype.get = async function get(params) {
    params = params || {}
    if (!params.stockCode) throw new Error('Stock code (stockCode) is required.')

    let url =
        this.ciceksepeti.baseUrl.protocol +
        '//' +
        this.ciceksepeti.baseUrl.hostname +
        '/api' +
        '/' +
        this.ciceksepeti.options.apiVersion +
        '/Products?' +
        (params.stockCode ? `&StockCode=${params.stockCode}` : '')

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: url,
        headers: this.ciceksepeti.baseHeaders,
        maxRedirects: 0,
    }

    return axios(config)
        .then(function (response) {
            return response.data.products[0]
        })
        .catch(function (error) {
            throw new Error(error.response.data['Message'] || error.response.data['message'])
        })
}

/**
 * Updates stock or price of products.
 *
 * @param {Array} items Query parameters
 * @return {Promise} Promise that resolves with the result
 * @public
 */
Product.prototype.updateStockOrPrice = async function updateStockOrPrice(items) {
    if (!items) throw new Error('Items are required.')
    if (!Array.isArray(items)) throw new Error('Items must be an array.')
    if (items.length === 0) throw new Error('Items must not be empty.')
    items.forEach((item, i) => {
        if (!item.stockCode) throw new Error('Stock code (stockCode) is required. For item ' + i) + '.'
        if (
            item.quantity !== undefined &&
            item.quantity !== null &&
            item.salesPrice !== undefined &&
            item.salesPrice !== null
        )
            throw new Error("Quantity (quantity) and sales price (salesPrice) can't use together. For item " + i + '.')
        if (item.listPrice && !item.salesPrice)
            throw new Error('List price (listPrice) must be given with sales price (salesPrice). For item ' + i + '.')
    })

    let url =
        this.ciceksepeti.baseUrl.protocol +
        '//' +
        this.ciceksepeti.baseUrl.hostname +
        '/api' +
        '/' +
        this.ciceksepeti.options.apiVersion +
        '/Products/price-and-stock'

    let config = {
        method: 'put',
        maxBodyLength: Infinity,
        url: url,
        headers: this.ciceksepeti.baseHeaders,
        maxRedirects: 0,
        data: {
            items: items,
        },
    }

    return axios(config)
        .then(function (response) {
            return response.data
        })
        .catch(function (error) {
            throw new Error(error.response.data['Message'] || error.response.data['message'])
        })
}

/**
 * Updates product.
 *
 * @param {Array} items Query parameters
 * @return {Promise} Promise that resolves with the result
 * @public
 */
Product.prototype.update = async function update(items) {
    if (!items) throw new Error('Items are required.')
    if (!Array.isArray(items)) throw new Error('Items must be an array.')
    if (items.length === 0) throw new Error('Items must not be empty.')
    items.forEach((item, i) => {
        if (!item.productName) throw new Error('Product code (stockCode) is required. For item ' + i) + '.'
        if (!item.stockCode) throw new Error('Stock code (stockCode) is required. For item ' + i) + '.'
        if (!item.mainProductCode)
            throw new Error('Main product code (mainProductCode) is required. For item ' + i) + '.'
        if (!item.isActive) throw new Error('Is active (isActive) is required. For item ' + i) + '.'
        if (!item.description) throw new Error('Description (description) is required. For item ' + i) + '.'
        if (!item.deliveryType) throw new Error('Delivery tipe (deliveryType) is required. For item ' + i) + '.'
        if (!item.deliveryMessageType)
            throw new Error('Delivery message tipe (deliveryMessageType) is required. For item ' + i) + '.'
        if (!item.images || item.images.length === 0 || !Array.isArray(item.images))
            throw new Error('Images (images) is required. For item ' + i) + '.'

        item.deliveryType = deliveryTypes[item.deliveryType]
        item.deliveryMessageType = deliveryMessageTypes[item.deliveryMessageType]
    })

    let url =
        this.ciceksepeti.baseUrl.protocol +
        '//' +
        this.ciceksepeti.baseUrl.hostname +
        '/api' +
        '/' +
        this.ciceksepeti.options.apiVersion +
        '/Products'

    let config = {
        method: 'put',
        maxBodyLength: Infinity,
        url: url,
        headers: this.ciceksepeti.baseHeaders,
        maxRedirects: 0,
        data: {
            products: items,
        },
    }

    return axios(config)
        .then(function (response) {
            return response.data
        })
        .catch(function (error) {
            throw new Error(error.response.data['Message'] || error.response.data['message'])
        })
}

/**
 * Creates new product/s on Ciceksepeti.
 *
 * @param {Array} items Query parameters
 * @return {Promise} Promise that resolves with the result
 * @public
 */
Product.prototype.create = async function create(items) {
    if (!items) throw new Error('Items are required.')
    if (!Array.isArray(items)) throw new Error('Items must be an array.')
    if (items.length === 0) throw new Error('Items must not be empty.')
    items.forEach((item, i) => {
        if (!item.productName) throw new Error('Product code (stockCode) is required. For item ' + i) + '.'
        if (!item.mainProductCode)
            throw new Error('Main product code (mainProductCode) is required. For item ' + i) + '.'
        if (!item.stockCode) throw new Error('Stock code (stockCode) is required. For item ' + i) + '.'
        if (!item.categoryId) throw new Error('Category id (categoryId) is required. For item ' + i) + '.'
        if (!item.description) throw new Error('Description (description) is required. For item ' + i) + '.'
        if (!item.deliveryType) throw new Error('Delivery tipe (deliveryType) is required. For item ' + i) + '.'
        if (!item.deliveryMessageType)
            throw new Error('Delivery message tipe (deliveryMessageType) is required. For item ' + i) + '.'
        if (!item.images || item.images.length === 0 || !Array.isArray(item.images))
            throw new Error('Images (images) is required. For item ' + i) + '.'
        if (!item.stockQuantity) throw new Error('Stock quantity (stockQuantity) is required. For item ' + i) + '.'
        if (!item.salesPrice) throw new Error('Sales price (salesPrice) is required. For item ' + i) + '.'

        item.deliveryType = deliveryTypes[item.deliveryType]
        item.deliveryMessageType = deliveryMessageTypes[item.deliveryMessageType]
    })

    let url =
        this.ciceksepeti.baseUrl.protocol +
        '//' +
        this.ciceksepeti.baseUrl.hostname +
        '/api' +
        '/' +
        this.ciceksepeti.options.apiVersion +
        '/Products'

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: url,
        headers: this.ciceksepeti.baseHeaders,
        maxRedirects: 0,
        data: {
            products: items,
        },
    }

    return axios(config)
        .then(function (response) {
            return response.data
        })
        .catch(function (error) {
            throw new Error(error.response.data['Message'] || error.response.data['message'])
        })
}

/**
 * Returns status of a product process.
 *
 * @param {string} batchId Query parameters
 * @return {Promise} Promise that resolves with the result
 * @public
 */
Product.prototype.batchStatus = async function batchStatus(batchId) {
    if (!batchId) throw new Error('Batch id (batchId) is required.')
    if (typeof batchId !== 'string') throw new Error('Batch id (batchId) must be a string.')

    let url =
        this.ciceksepeti.baseUrl.protocol +
        '//' +
        this.ciceksepeti.baseUrl.hostname +
        '/api' +
        '/' +
        this.ciceksepeti.options.apiVersion +
        '/Products/batch-status/' +
        batchId

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: url,
        headers: this.ciceksepeti.baseHeaders,
        maxRedirects: 0,
    }

    return axios(config)
        .then(function (response) {
            return response.data
        })
        .catch(function (error) {
            throw new Error(error.response.data['Message'] || error.response.data['message'])
        })
}

module.exports = Product
