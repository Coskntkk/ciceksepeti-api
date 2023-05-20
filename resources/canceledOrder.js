'use strict'

const Ciceksepeti = require('..')
const axios = require('axios')
const moment = require('moment')

const orderItemStatuses = new Object({
    return_started: 20,
    return_in_cargo: 21,
    return_in_supplier: 22,
    return_waiting_for_supplier_approval: 23,
})

const processes = new Object({
    approve: 1,
    reject: 3
})

/**
 * Creates a CanceledOrder instance.
 *
 * @param {Ciceksepeti} ciceksepeti Reference to the Ciceksepeti instance
 * @constructor
 * @public
 */
function CanceledOrder(ciceksepeti) {
    this.ciceksepeti = ciceksepeti
}

/**
 * Returns a list of canceled orders.
 *
 * @param {Object} params Query parameters
 * @return {Promise} Promise that resolves with the result
 * @public
 */
CanceledOrder.prototype.list = async function list(params) {
    params = params || {}
    if (params.page === undefined || params.page === null || isNaN(params.page) || params.page < 0)
        throw new Error('Page (page) is required and must be greater than 0')
    if (params.pageSize === undefined || params.pageSize === null || isNaN(params.pageSize) || params.pageSize < 1)
        throw new Error('Page size (pageSize) is required and must be greater than 0')
    if ((params.startDate && !params.endDate) || (!params.startDate && params.endDate))
        throw new Error('Start date (startDate) and end date (endDate) are must be both present or both absent.')
    if (params.startDate && params.endDate) {
        let date1 = moment(params.startDate)
        let date2 = moment(params.endDate)
        if (!date1.isValid() || !date2.isValid())
            throw new Error('Start date (startDate) or end date (endDate) are not valid.')
        if (date1.isAfter(date2)) throw new Error('Start date (startDate) cannot be after end date (endDate).')
        let diff = date2.diff(date1, 'days')
        if (diff > 30) {
            throw new Error(
                'The difference between start date (startDate) and end date (endDate) cannot be more than 32 days.'
            )
        }
    }

    if (params.orderItemStatus && !orderItemStatuses[params.orderItemStatus]) {
        throw new Error('Order item status (orderItemStatus) is not valid.')
    }

    let data = {
        page: params.page,
        pageSize: params.pageSize,
    }
    if (params.startDate && params.endDate) {
        data['startDate'] = params.startDate
        data['endDate'] = params.endDate
    }
    if (params.orderItemStatus) {
        data['orderItemStatusId'] = orderItemStatuses[params.orderItemStatus]
    }

    let url =
        this.ciceksepeti.baseUrl.protocol +
        '//' +
        this.ciceksepeti.baseUrl.hostname +
        '/api' +
        '/' +
        this.ciceksepeti.options.apiVersion +
        '/Order/getcanceledorders'

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: url,
        headers: this.ciceksepeti.baseHeaders,
        maxRedirects: 0,
        data: data,
    }

    return axios(config)
        .then(function (response) {
            return response.data
        })
        .catch(function (error) {
            console.log(error.response.data)
            throw new Error(error.response.data['Message'] || error.response.data['message'])
        })
}

/**
 * Approves or rejects a canceled order.
 *
 * @param {Object} params Query parameters
 * @return {Promise} Promise that resolves with the result
 * @public
 */
CanceledOrder.prototype.approveOrReject = async function approveOrReject(params) {
    params = params || {}
    if (!params.orderItemId) throw new Error('Order item id (orderItemId) is required.')
    if (!params.process) throw new Error('Process (process) is required.')
    if (!processes[params.process]) throw new Error('Process (process) is not valid.')

    let data = {
        orderItemId: params.orderItemId,
        process: processes[params.process],
    }

    let url =
        this.ciceksepeti.baseUrl.protocol +
        '//' +
        this.ciceksepeti.baseUrl.hostname +
        '/api' +
        '/' +
        this.ciceksepeti.options.apiVersion +
        '/Order/cancelevaluation'

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: url,
        headers: this.ciceksepeti.baseHeaders,
        maxRedirects: 0,
        data: data,
    }

    return axios(config)
        .then(function (response) {
            return response.data
        })
        .catch(function (error) {
            console.log(error.response.data)
            throw new Error(error.response.data['Message'] || error.response.data['message'])
        })
}

/**
 * Approves that the seller has received the returned order item.
 *
 * @param {Object} params Query parameters
 * @return {Promise} Promise that resolves with the result
 * @public
 */
CanceledOrder.prototype.recieved = async function recieved(params) {
    params = params || {}
    if (!params.orderItemIds) throw new Error('Order item ids (orderItemIds) is required.')
    if (!Array.isArray(params.orderItemIds)) throw new Error('Order item ids (orderItemIds) must be an array.')

    let url =
        this.ciceksepeti.baseUrl.protocol +
        '//' +
        this.ciceksepeti.baseUrl.hostname +
        '/api' +
        '/' +
        this.ciceksepeti.options.apiVersion +
        '/Order/refundprocessstartreceivedprocess'

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: url,
        headers: this.ciceksepeti.baseHeaders,
        maxRedirects: 0,
        data: {
            orderItemIds: params.orderItemIds,
        },
    }

    return axios(config)
        .then(function (response) {
            return response.data
        })
        .catch(function (error) {
            console.log(error.response.data)
            throw new Error(error.response.data['Message'] || error.response.data['message'])
        })
}

module.exports = CanceledOrder
