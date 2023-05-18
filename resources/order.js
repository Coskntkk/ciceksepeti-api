'use strict';

const axios = require('axios');
const moment = require('moment');

const statusIds = new Object({
    'new': 1,
    'preparing': 2,
    'shipped': 5,
    'will_be_shipped': 11,
    'delivered': 7,
});

/**
 * Creates a Order instance.
 *
 * @param {Ciceksepeti} ciceksepeti Reference to the Ciceksepeti instance
 * @constructor
 * @public
 */
function Order(ciceksepeti) {
    this.ciceksepeti = ciceksepeti;
}

/**
 * Returns a list of orders.
 *
 * @param {Object} params Query parameters
 * @return {Promise} Promise that resolves with the result
 * @public
 */
Order.prototype.list = async function list(params) {
    params = params || {}
    
    if (!params.pageSize || params.pageSize > 100 || params.pageSize < 1) {
        throw new Error('Page size (pageSize) is required and must be between 1 and 100.');
    }
    if (!!params.page || params.page < 0) {
        throw new Error('Page (page) is required and must be equal or greater than 0.');
    }
    if ((!params.startDate || !params.endDate) && (!params.orderNo && !params.orderItemNo)) {
        throw new Error('Start date (startDate) and end date (endDate) are required if order no (orderNo) and order item no (orderItemNo) are not provided.');
    }
    if (params.startDate && params.endDate) {
        let date1 = moment(params.startDate);
        let date2 = moment(params.endDate);
        if (!date1.isValid() || !date2.isValid()) {
            throw new Error('Start date (startDate) or end date (endDate) are not valid.');
        }
        if (date1.isAfter(date2)) {
            throw new Error('Start date (startDate) cannot be after end date (endDate).');
        }
        let diff = date2.diff(date1, 'days');
        if (diff > 14) {
            throw new Error('The difference between start date (startDate) and end date (endDate) cannot be more than 14 days.');
        }
    }

    if (params.status) {
        params.status = statusIds[params.status];
    }

    let url = this.ciceksepeti.baseUrl.protocol + '//' + this.ciceksepeti.baseUrl.hostname
        + '/api'
        + '/' + this.ciceksepeti.options.apiVersion
        + '/Order/GetOrders';

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: url,
        headers: this.ciceksepeti.baseHeaders,
        maxRedirects: 0,
        data: params,
    };

    return axios(config)
        .then(function (response) {
            return {
                totalCount: response.data['orderListCount'],
                totalPages: response.data['pageCount'],
                orders: response.data['supplierOrderListWithBranch'],
            };
        })
        .catch(function (error) {
            console.log(error.response.data);
            throw new Error(error.response.data['Message'] || error.response.data['message']);
        });
};

/**
 * Counts the number of orders.
 *
 * @param {Object} params Query parameters
 * @return {Promise} Promise that resolves with the result
 * @public
 */
Order.prototype.count = async function count(params) {
    params = params || {}
    params.pageSize = 1;
    params.page = 0;
    
    if (!params.startDate || !params.endDate) {
        throw new Error('Start date (startDate) and end date (endDate) are required.');
    }

    if (params.status) {
        params.status = statusIds[params.status];
    }

    let url = this.ciceksepeti.baseUrl.protocol + '//' + this.ciceksepeti.baseUrl.hostname
        + '/api'
        + '/' + this.ciceksepeti.options.apiVersion
        + '/Order/GetOrders';

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: url,
        headers: this.ciceksepeti.baseHeaders,
        maxRedirects: 0,
        data: params,
    };

    return axios(config)
        .then(function (response) {
            return {
                totalCount: response.data['orderListCount'],
            };
        })
        .catch(function (error) {
            throw new Error(error.response.data['Message'] || error.response.data['message']);
        });
};

/**
 * Returns a specific order.
 *
 * @param {Object} params Query parameters
 * @return {Promise} Promise that resolves with the result
 * @public
 */
Order.prototype.get = async function get(params) {
    params = params || {}
    params.pageSize = 1;
    params.page = 0;

    let url = this.ciceksepeti.baseUrl.protocol + '//' + this.ciceksepeti.baseUrl.hostname
        + '/api'
        + '/' + this.ciceksepeti.options.apiVersion
        + '/Order/GetOrders';

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: url,
        headers: this.ciceksepeti.baseHeaders,
        maxRedirects: 0,
        data: params,
    };

    return axios(config)
        .then(function (response) {
            return response.data['supplierOrderListWithBranch'][0];
        })
        .catch(function (error) {
            throw new Error(error.response.data['Message'] || error.response.data['message']);
        });
};

module.exports = Order;
