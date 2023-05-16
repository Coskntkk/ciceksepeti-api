'use strict';

const axios = require('axios');

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
        throw new Error('pageSize is required and must be between 1 and 100.');
    }
    if (!!params.page || params.page < 0) {
        throw new Error('page is required and must be equal or greater than 0.');
    }
    if ((!params.startDate || !params.endDate) && (!params.orderNo && !params.orderItemNo)) {
        throw new Error('startDate and endDate are required if orderNo and orderItemNo are not provided.');
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
            throw new Error(error.response.data['Message']);
        });
};


module.exports = Order;
