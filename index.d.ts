// Type definitions for ciceksepet-api
// Project: ciceksepet-api-node
// Definitions by: Coşkun Atak <coskntkk@gmail.com>

/*~ This is the module template file for class modules.
 *~ You should rename it to index.d.ts and place it in a folder with the same name as the module.
 *~ For example, if you were writing a file for "super-greeter", this
 *~ file should be 'super-greeter/index.d.ts'
 */

/*~ Note that ES6 modules cannot directly export class objects.
 *~ This file should be imported using the CommonJS-style:
 *~   import x = require('someLibrary');
 *~
 *~ Refer to the documentation to understand common
 *~ workarounds for this limitation of ES6 modules.
 */

/*~ This declaration specifies that the class constructor function
 *~ is the exported object from the file
 */
export = Ciceksepeti

/*~ Write your module's methods and properties in this class */

declare class Ciceksepeti {
    constructor(config: Ciceksepeti.ICiceksepetiConfig)
    product: {
        /** Returns a list of products. */
        list: (params?: Ciceksepeti.IListProductsParams) => Promise<Ciceksepeti.IListProductResponse>
        /** Returns the number of products. */
        count: (params?: Ciceksepeti.ICountProductsParams) => Promise<Ciceksepeti.ICountResponse>
        /** Returns the details of a product. */
        get: (params: Ciceksepeti.IGetProductParams) => Promise<Ciceksepeti.IProduct>
    }
    order: {
        /** Returns a list of orders. */
        list: (params?: Ciceksepeti.IListOrdersParams) => Promise<Ciceksepeti.IListOrdersResponse>
        /** Returns the number of orders. */
        count: (params?: Ciceksepeti.ICountOrdersParams) => Promise<Ciceksepeti.ICountResponse>
        /** Returns the details of an order. */
        get: (params: Ciceksepeti.IGetOrderParams) => Promise<Ciceksepeti.IOrder>
    }
    category: {
        /** Returns a list of categories. */
        list: () => Promise<Ciceksepeti.IListCategoriesResponse>
        /** Returns attributes of a category. */
        attributes: (params: Ciceksepeti.ICategoryAttributesParams) => Promise<Ciceksepeti.ICategoryAttributesResponse>
    }
    /** Questions and Answers of the product on Çiçeksepeti */
    sellerquestion: {
        /** Returns a list of seller questions. */
        list: (params?: Ciceksepeti.IListSellerQuestionsParams) => Promise<Ciceksepeti.IListSellerQuestionsResponse>
    }
    canceledOrder: {
        /** Returns a list of canceled orders. */
        list: (params?: Ciceksepeti.IListCanceledOrdersParams) => Promise<Ciceksepeti.IListCanceledOrdersResponse>
    }
}

/*~ If you want to expose types from your module as well, you can
 *~ place them in this block.
 */
declare namespace Ciceksepeti {
    export interface ICiceksepetiConfig {
        apiKey: string
        // apiVersion?: string;
        // timeout?: number;
        // maxRetries?: number;
        // maxRetryAfter?: number;
    }

    /** ------------------ Products ------------------ */

    /** List Product Params */
    interface IListProductsParams {
        status?: ListProductStatusType | ListProductStatusType[] | null
        page?: number | null
        pageSize?: number | null
        sortBy?: ListProductSortByType | null
        stockCode?: string | null
        variantName?: string | null
    }

    /** List Product Response */
    interface IListProductResponse {
        totalCount?: number | null
        products?: IProduct[] | null
    }

    /** Product */
    interface IProduct {
        productName?: string | null
        productCode?: string | null
        categoryId?: number | null
        categoryName?: string | null
        stockCode?: string | null
        variantName?: string | null
        mainProductCode?: string | null
        productStatusType?: string
        description?: string | null
        link?: string | null
        mediaLink?: string | null
        DeliveryType?: 1 | 2 | 3 | null
        deliveryMessageType?: 4 | 5 | 6 | 7 | 13 | 18 | null
        isUseStockQuantity?: boolean | null
        StockQuantity?: number | null
        SalesPrice?: number | null
        ListPrice?: number | null
        barcode?: string | null
        passiveDescription?: string | null
        isActive?: boolean | null
        images?: string[] | null
        attributes?: IProductAttribute[] | null
    }

    /** Product Attribute */
    interface IProductAttribute {
        id?: number | null
        name?: string | null
        textLength?: number | null
    }

    /** Count Products */
    interface ICountProductsParams {
        status?: ListProductStatusType | ListProductStatusType[] | null
        variantName?: string | null
    }

    /** Get Product Params */
    interface IGetProductParams {
        stockCode: string
    }

    /** ------------------ Orders ------------------ */

    /** List Orders Params */
    interface IListOrdersParams {
        /** Get orders created after this date. */
        startDate?: string | null
        /** Get orders created before this date. */
        endDate?: string | null
        /** Number of orders to return per page. */
        pageSize: number | null
        /** Page number of results to return. */
        page: number | null
        /** Get orders with this status. Options: *new*, *preparing*, *shipped*, *will_be_shipped*, *delivered* */
        status?: ListOrderStatusType | ListOrderStatusType[] | null
        /** Get order by this order number. */
        orderNo?: number | null
        /** Get order by this order item number. */
        orderItemNo?: number | null
        /** Get orders with order status. */
        isOrderStatusActive?: boolean | null
    }

    /** List Orders Response */
    interface IListOrdersResponse {
        totalCount?: number | null
        totalPages: number | null
        orders?: IOrder[] | null
    }

    /** Count Orders Params */
    interface ICountOrdersParams {
        /** Count orders created after this date. */
        startDate: string | null
        /** Count orders created before this date. */
        endDate: string | null
        /** Count orders with this status. Options: *new*, *preparing*, *shipped*, *will_be_shipped*, *delivered* */
        status?: ListOrderStatusType | ListOrderStatusType[] | null
        isOrderStatusActive?: boolean | null
    }

    /** Get Order Params */
    interface IGetOrderParams {
        orderNo: number
        orderItemNo?: number
    }

    /* Order */
    interface IOrder {
        branchId?: number | null
        customerId?: number | null
        accountCode?: string | null
        accountCodePrefix?: string | null
        orderId?: number | null
        orderItemId?: number | null
        orderCreateDate?: string | null
        cargoPrice?: number | null
        orderCreateTime?: string | null
        orderModifyDate?: string | null
        orderModifyTime?: string | null
        barcode?: string | null
        cardMessage?: string | null
        cardName?: string | null
        deliveryCharge?: number | null
        orderPaymentType?: string | null
        orderItemStatusId?: number | null
        orderProductStatus?: string | null
        orderItemTextListModel?: any[] | null
        discount?: number | null
        totalPrice?: number | null
        tax?: number | null
        receiverName?: string | null
        receiverPhone?: string | null
        receiverAddress?: string | null
        deliveryType?: number | null
        deliveryDate?: string | null
        requestedDeliveryDate?: string | null
        cargoCompany?: string | null
        receiverCity?: string | null
        receiverRegion?: string | null
        receiverDistrict?: string | null
        senderName?: string | null
        senderAddress?: string | null
        senderTaxNumber?: string | null
        senderTaxOfficeName?: string | null
        senderCity?: string | null
        senderRegion?: string | null
        senderDistrict?: string | null
        senderPhone?: string | null
        senderEmail?: string | null
        cargoNumber?: string | null
        shipmentTrackingUrl?: string | null
        productId?: number | null
        productCode?: string | null
        code?: string | null
        name?: string | null
        variantName?: string | null
        quantity?: number | null
        quantityUnit?: string | null
        invoiceEmail?: string | null
        isOrderStatusActive?: boolean | null
        partialNumber?: string | null
        senderCompanyName?: string | null
        allowanceRate?: number | null
        credit?: number | null
        deliveryOptionName?: string | null
        deliveryTime?: string | null
        cancellationResult?: string | null
        isFloristCargoOrder?: boolean | null
        receiverCompanyName?: string | null
        floristName?: string | null
        floristAddress?: string | null
        isLateToCargo?: boolean | null
        allowanceExpiryDay?: number | null
        branchDiscountPart?: number | null
        csDiscountPart?: number | null
        invoicePrice?: number | null
        itemPrice?: number | null
        cancellationNote?: string | null
        receiverCountryCode?: string | null
        zipCode?: string | null
        currency?: string | null
        websiteId?: number | null
        extraProductTotalPrice?: number | null
        extraProductTotalQuantity?: number | null
        extraProducts?: any[] | null
        promotionDescription?: string | null
    }

    /* Order Item Text List Model */
    interface IOrderItemTextListModel {
        text?: string | null
        value?: string | null
    }

    /** ------------------ Categories ------------------ */

    /** List Categories Params */
    interface IListCategoriesResponse {
        categories?: ICategory[] | null
    }

    /** Category */
    interface ICategory {
        id: number
        name: string
        parentCategoryId: number | null
        subCategories: ICategory[]
    }

    /** Category Attributes Params */
    interface ICategoryAttributesParams {
        /** Id of the category */
        id: number
    }

    /** Category Attributes Response */
    interface ICategoryAttributesResponse {
        categoryId: number
        categoryName: string
        categoryAttributes: ICategoryAttribute[]
    }

    /** Category Attribute */
    interface ICategoryAttribute {
        attributeId: number
        attributeName: string
        required: boolean
        varianter: boolean
        type: string
        attributeValues: ICategoryAttributeValue[]
    }

    /** Category Attribute Value */
    interface ICategoryAttributeValue {
        id: number
        name: string
    }

    /** ------------------ Seller Questions ------------------ */

    /** List Seller Questions Params */
    interface IListSellerQuestionsParams {
        /** Id of the question */
        id?: number | null
        /** Id of the product */
        productCode?: string | null
        /** Filter by if the question is answered or not */
        answered?: boolean | null
        /** Filter by if the created date is between start and end date */
        startDate?: string | null
        /** Filter by if the created date is between start and end date */
        endDate?: string | null
        branchActionId?: number | null
        agentActionId?: number | null
        approve?: boolean | null
        sortType?: number | null
        sortField?: number | null
        page: number | null
    }

    /** List Seller Questions Response */
    interface IListSellerQuestionsResponse {
        items: ISellerQuestion[]
        hasNextPage: boolean
    }

    /** Seller Question */
    interface ISellerQuestion {
        id?: string | null
        product?: ISellerQuestionProduct | null
        question?: string | null
        answer?: string | null
        questionDate?: string | null
        answered?: boolean | null
        agentActionId?: number | null
        agentActionText?: string | null
        branchActionId?: number | null
        branchActionDetailId?: number | null
        branchDescription?: string | null
        agentDescription?: string | null
        answerDate?: string | null
        approve?: boolean | null
    }

    /** Seller Question Product */
    interface ISellerQuestionProduct {
        code?: string | null
        name?: string | null
        url?: string | null
        imageUrl?: string | null
    }

    /** ------------------ Canceled Orders ------------------ */

    /** List Canceled Orders Params */
    interface IListCanceledOrdersParams {
        /** Order item status. Must be one of *return_started*, *return_in_cargo*, *return_in_supplier*, *return_waiting_for_supplier_approval* if specified. */
        orderItemStatus?: ListCanceledOrderStatusType | null
        /** Item count per page. */
        pageSize: number
        /** Page number. Starts from *0*. */
        page: number
        /** Start date of the filter. Returns last 30 days if not specified. */
        startDate?: string
        /** End date of the filter. Returns last 30 days if not specified. */
        endDate?: string
    }

    /** List Canceled Orders Response */
    interface IListCanceledOrdersResponse {
        /** List of the canceled orders. */
        orderItemsList: any[]
    }

    /** ------------------ Shared ------------------ */

    interface ICountResponse {
        /** Total count of the items. */
        totalCount?: number | null
    }

    /** ------------------ Types ------------------ */
    /** Product Status Type */
    type ListProductStatusType =
        | 'draft'
        | 'waiting_for_approval'
        | 'published'
        | 'rejected'
        | 'passive'
        | 'published_waiting_for_approval'
        | 'out_of_stock'

    /** Product Sort By Type */
    type ListProductSortByType =
        | 'name_asc'
        | 'name_desc'
        | 'stock_asc'
        | 'stock_desc'
        | 'price_asc'
        | 'price_desc'
        | 'created_date_asc'
        | 'created_date_desc'

    /** Order Status Type */
    type ListOrderStatusType = 'new' | 'preparing' | 'shipped' | 'will_be_shipped' | 'delivered'

    /** Canceled Order Status Type */
    type ListCanceledOrderStatusType =
        | 'return_started'
        | 'return_in_cargo'
        | 'return_in_supplier'
        | 'return_waiting_for_supplier_approval'
}
