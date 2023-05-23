'use strict'

const axios = require('axios')

const cargoCompanies = new Object({
    mng_kargo: 1,
    yurtici_Kargo: 2,
    surat_kargo: 25,
    aras_kargo: 43,
    ptt_kargo: 44,
    ups_kargo: 45,
    horoz_lojistik: 46,
    borusan_lojistik: 49,
})

const statusIds = new Object({
    new: 1,
    preparing: 2,
    shipped: 5,
    will_be_shipped: 11,
    delivered: 7,
    delivered_to_car: 3,
    returned_to_firm: 18,
})

/**
 * Creates a Cargo instance.
 *
 * @param {Ciceksepeti} ciceksepeti Reference to the Ciceksepeti instance
 * @constructor
 * @public
 */
function Cargo(ciceksepeti) {
    this.ciceksepeti = ciceksepeti
}

/**
 * Sends cargo measurements.
 *
 * @param {Array} items Query parameters
 * @return {Promise} Promise that resolves with the result
 * @public
 */
Cargo.prototype.sendMeasurements = async function sendMeasurements(items) {
    if (!items || !Array.isArray(items) || items.length === 0) {
        throw new Error('Items (items) is required and must be an array.')
    }
    items.forEach(function (item, i) {
        if (!item.orderProductId || isNaN(item.orderProductId)) {
            throw new Error('Valid order product id (orderProductId) is required for item ' + i + '.')
        }
        if (!item.deci || isNaN(item.deci)) {
            throw new Error('Valid deci (deci) is required for item ' + i + '.')
        }
        item.desi = item.desi
        delete item.deci
        if (!item.quantity || isNaN(item.quantity)) {
            throw new Error('Valid quantity (quantity) is required for item ' + i + '.')
        }
    })

    let url =
        this.ciceksepeti.baseUrl.protocol +
        '//' +
        this.ciceksepeti.baseUrl.hostname +
        '/api' +
        '/' +
        this.ciceksepeti.options.apiVersion +
        '/Order/CargoMeasurement'

    let config = {
        method: 'post',
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
 * Changes cargo company.
 *
 * @param {Array} items Query parameters
 * @return {Promise} Promise that resolves with the result
 * @public
 */
Cargo.prototype.changeCompany = async function changeCompany(items) {
    if (!items || !Array.isArray(items) || items.length === 0) {
        throw new Error('Items (items) is required and must be an array.')
    }
    items.forEach(function (item, i) {
        if (!item.orderProductId || isNaN(item.orderProductId)) {
            throw new Error('Valid order product id (orderProductId) is required for item ' + i + '.')
        }
        if (!item.cargoCompany || cargoCompanies[item.cargoCompany] === undefined) {
            throw new Error('Valid cargo company (cargoCompany) is required for item ' + i + '.')
        }
        item.cargoId = cargoCompanies[item.cargoCompany]
        delete item.cargoCompany
    })

    let url =
        this.ciceksepeti.baseUrl.protocol +
        '//' +
        this.ciceksepeti.baseUrl.hostname +
        '/api' +
        '/' +
        this.ciceksepeti.options.apiVersion +
        '/Order/CargoCompany'

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
 * Sends a cargo using Çiçek Sepeti's cargo service.
 *
 * @param {number[]} orderItemIds Query parameters
 * @return {Promise} Promise that resolves with the result
 * @public
 */
Cargo.prototype.sendWithCiceksepeti = async function sendWithCiceksepeti(orderItemIds) {
    if (!orderItemIds || !Array.isArray(orderItemIds) || orderItemIds.length === 0) {
        throw new Error('Items (items) is required and must be an array.')
    }
    orderItemIds.forEach(function (item, i) {
        if (isNaN(item)) {
            throw new Error('Valid order item id (orderItemId) is required for item ' + i + '.')
        }
    })

    let url =
        this.ciceksepeti.baseUrl.protocol +
        '//' +
        this.ciceksepeti.baseUrl.hostname +
        '/api' +
        '/' +
        this.ciceksepeti.options.apiVersion +
        '/Order/readyforcargowithcsintegration'

    let config = {
        method: 'put',
        maxBodyLength: Infinity,
        url: url,
        headers: this.ciceksepeti.baseHeaders,
        maxRedirects: 0,
        data: {
            orderItemsGroup: [
                {
                    orderItemIds: orderItemIds,
                },
            ],
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
 * Sends a cargo using your own cargo service.
 *
 * @param {Array} items Query parameters
 * @return {Promise} Promise that resolves with the result
 * @public
 */
Cargo.prototype.sendWithOwnCargo = async function sendWithOwnCargo(items) {
    if (!items || !Array.isArray(items) || items.length === 0) {
        throw new Error('Items (items) is required and must be an array.')
    }
    items.forEach(function (item, i) {
        if (!item.orderItemId || isNaN(item.orderItemId)) {
            throw new Error('Valid order item id (orderItemId) is required for item ' + i + '.')
        }
        if (!item.orderItemStatus || statusIds[item.orderItemStatus] === undefined) {
            throw new Error('Valid orderItemStatus company (orderItemStatus) is required for item ' + i + '.')
        }
        item.orderItemStatusId = statusIds[item.orderItemStatus]
        delete item.orderItemStatus
        if (item.cargoBusiness) {
            if (cargoCompanies[item.cargoBusiness] === undefined) {
                throw new Error('Valid cargo company (cargoCompany) is required for item ' + i + '.')
            }
            item.cargoBusinessId = cargoCompanies[item.cargoBusiness]
            delete item.cargoBusiness
        }
    })

    let url =
        this.ciceksepeti.baseUrl.protocol +
        '//' +
        this.ciceksepeti.baseUrl.hostname +
        '/api' +
        '/' +
        this.ciceksepeti.options.apiVersion +
        '/Order/statusupdatewithsupplierintegration'

    let config = {
        method: 'put',
        maxBodyLength: Infinity,
        url: url,
        headers: this.ciceksepeti.baseHeaders,
        maxRedirects: 0,
        data: {
            orderItems: items,
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

module.exports = Cargo
