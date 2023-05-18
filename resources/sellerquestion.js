'use strict'

const Ciceksepeti = require('..')
const axios = require('axios')
const moment = require('moment')

/**
 * Creates a SellerQuestion instance.
 *
 * @param {Ciceksepeti} ciceksepeti Reference to the Ciceksepeti instance
 * @constructor
 * @public
 */
function SellerQuestion(ciceksepeti) {
    this.ciceksepeti = ciceksepeti
}

/**
 * Returns a list of seller questions.
 *
 * @return {Promise} Promise that resolves with the result
 * @public
 */
SellerQuestion.prototype.list = async function list(params) {
    params = params || {}

    if (!params.page) {
        throw new Error('Page (page) is required.')
    }
    if (!params.id && (!params.startDate || !params.endDate)) {
        throw new Error('Seller question ID (id) or start date (startDate) and end date (endDate) are required.')
    }
    if (!params.id) {
        let date1 = moment(params.startDate)
        let date2 = moment(params.endDate)
        if (!date1.isValid() || !date2.isValid()) {
            throw new Error('Start date (startDate) or end date (endDate) are not valid.')
        }
        if (date1.isAfter(date2)) {
            throw new Error('Start date (startDate) cannot be after end date (endDate).')
        }
        let diff = date2.diff(date1, 'days')
        if (diff > 32) {
            throw new Error(
                'The difference between start date (startDate) and end date (endDate) cannot be more than 32 days.'
            )
        }
    }

    let url =
        this.ciceksepeti.baseUrl.protocol +
        '//' +
        this.ciceksepeti.baseUrl.hostname +
        '/api' +
        '/' +
        this.ciceksepeti.options.apiVersion +
        '/sellerquestions?' +
        (params.id ? '&Id=' + params.id : '') +
        (params.productCode ? '&ProductCode=' + params.productCode : '') +
        (params.answered ? '&Answered=' + params.answered : '') +
        (params.startDate ? '&CreateStartDate=' + params.startDate : '') +
        (params.endDate ? '&CreateEndDate=' + params.endDate : '') +
        (params.branchActionId ? '&BranchActionId=' + params.branchActionId : '') +
        (params.agentActionId ? '&AgentActionId=' + params.agentActionId : '') +
        (params.approve ? '&Approve=' + params.approve : '') +
        (params.sortType ? '&SortType=' + params.sortType : '') +
        (params.sortField ? '&SortField=' + params.sortField : '') +
        '&Page=' +
        params.page

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

module.exports = SellerQuestion
