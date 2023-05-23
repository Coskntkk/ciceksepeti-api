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
        /** Creates products. */
        create: (items: Ciceksepeti.ICreateProductItem[]) => Promise<Ciceksepeti.IBatchIdResponse>
        /** Updates products. */
        update: (items: Ciceksepeti.IUpdateProductItem[]) => Promise<Ciceksepeti.IBatchIdResponse>
        /** Updates stock or price of a product. */
        updateStockOrPrice: (items: Ciceksepeti.IUpdateStockOrPriceItem[]) => Promise<Ciceksepeti.IBatchIdResponse>
        /** Returns the status of a product process. */
        batchStatus: (batchId: string) => Promise<Ciceksepeti.IBatchStatusResponse>
    }
    order: {
        /** Returns a list of orders. */
        list: (params?: Ciceksepeti.IListOrdersParams) => Promise<Ciceksepeti.IListOrdersResponse>
        /** Returns the number of orders. */
        count: (params?: Ciceksepeti.ICountOrdersParams) => Promise<Ciceksepeti.ICountResponse>
        /** Returns the details of an order. */
        get: (params: Ciceksepeti.IGetOrderParams) => Promise<Ciceksepeti.IOrder>
        /** Sends an invoice. */
        sendInvoice: (params: Ciceksepeti.ISendInvoiceParams) => Promise<any>
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
        /** Answers a seller question. */
        answer: (id: number, params: Ciceksepeti.IAnswerSellerQuestionParams) => Promise<any>
    }
    canceledOrder: {
        /** Returns a list of canceled orders. */
        list: (params?: Ciceksepeti.IListCanceledOrdersParams) => Promise<Ciceksepeti.IListCanceledOrdersResponse>
        /** Approves or rejects a canceled order. */
        approveOrReject: (
            params: Ciceksepeti.IApproveOrRejectCanceledOrderParams
        ) => Promise<Ciceksepeti.IApproveOrRejectCanceledOrderResponse>
        /** Approves that the seller has received the returned order item. */
        recieved: (
            params: Ciceksepeti.IRecievedCanceledOrderParams
        ) => Promise<Ciceksepeti.IRecievedCanceledOrderResponse>
    }
    cargo: {
        /** Sends cargo measurements. */
        sendMeasurements: (items: Ciceksepeti.ISendCargoMeasurementItem[]) => Promise<any>
        /** Changes the cargo company of an order. */
        changeCompany: (items: Ciceksepeti.IChangeCargoCompanyItem[]) => Promise<any>
        /** Sends a cargo using Çiçek Sepeti's cargo service. */
        sendWithCiceksepeti: (orderItemIds: number[]) => Promise<any>
        /** Sends a cargo using your own cargo service. */
        sendWithOwnCargo: (orderItemIds: Ciceksepeti.ISendWithOwnCargoItem[]) => Promise<any>
    }
}

/*~ If you want to expose types from your module as well, you can
 *~ place them in this block.
 */
declare namespace Ciceksepeti {
    export interface ICiceksepetiConfig {
        /** Api Key */
        apiKey: string
        // apiVersion?: string;
        // timeout?: number;
        // maxRetries?: number;
        // maxRetryAfter?: number;
    }

    /** ------------------ Products ------------------ */

    /** List Product Params */
    interface IListProductsParams {
        /** Get products with this status. Options: *draft*, *waiting_for_approval*, *published*, *rejected*, *passive*, *published_waiting_for_approval*, *out_of_stock* */
        status?: ListProductStatusType | ListProductStatusType[] | null
        /** Page number. */
        page?: number | null
        /** Items per page. */
        pageSize?: number | null
        /** Sort by. Options: *name_asc*, *name_desc*, *stock_asc*, *stock_desc*, *price_asc*, *price_desc*, *created_date_asc*, *created_date_desc* */
        sortBy?: ListProductSortByType | null
        /** Get products with this stock code. */
        stockCode?: string | null
        /** Get products with this variant name. */
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
        /** Count products with this status. Options: *draft*, *waiting_for_approval*, *published*, *rejected*, *passive*, *published_waiting_for_approval*, *out_of_stock* */
        status?: ListProductStatusType | ListProductStatusType[] | null
        /** Count products with this variant name. */
        variantName?: string | null
    }

    /** Get Product Params */
    interface IGetProductParams {
        /** Stock code of the product. *Required* */
        stockCode: string
    }

    /** Update Stock or Price Item */
    interface IUpdateStockOrPriceItem {
        /** Stock code of the product. *Required* */
        stockCode: string
        /** Quantity of the product. */
        stockQuantity?: number | null
        /** Sales price of the product. */
        salesPrice?: number | null
        /** List price of the product. */
        listPrice?: number | null
    }

    /** Batch Id Response */
    interface IBatchIdResponse {
        batchId?: string | null
    }

    /** Batch Status Response */
    interface IBatchStatusResponse {
        batchId?: string | null
        itemCount?: number | null
        items?: IBatchStatusItem[] | null
    }

    /** Batch Status Item */
    interface IBatchStatusItem {
        itemId?: string | null
        data?: IBatchStatusItemData | null
        status?: string | null
        failureReasons?: string[] | null
        lastModificationDate?: string | null
    }

    /** Batch Status Item Data */
    interface IBatchStatusItemData {
        siteCode?: string | null
        stockCode?: string | null
        quantity?: number | null
        listPrice?: number | null
        salesPrice?: number | null
    }

    /** Update Product Params */
    interface IUpdateProductItem {
        /** Name of the product. *Required* */
        productName: string
        /** Stock code of the product. *Required* */
        stockCode: string
        /** Main product code of the product. *Required* */
        mainProductCode: string
        /** Active status the product. *Required* */
        isActive: boolean
        /** Description of the product. *Required* */
        description: string
        /** Media link of the product. */
        mediaLink?: string | null
        /** Delivery tipe of the product. *Required*. Options: *with_service*, *with_cargo*, *with_service_and_cargo* */
        deliveryType: 'with_service' | 'with_cargo' | 'with_service_and_cargo'
        /** Delivery message type of the product. *Required*. Options: *cicek_service*, *gift_cargo_same_day*, *gift_cargo_1_3_days*, *gift_cargo_1_2_days* */
        deliveryMessageType: 'cicek_service' | 'gift_cargo_same_day' | 'gift_cargo_1_3_days' | 'gift_cargo_1_2_days'
        /** Images of the product. *Required* */
        images: string[]
        /** Attributes of the product. */
        attributes?: IUpdateProductItemAttribute[] | null
        /** Barcode of the product. */
        barcode?: string | null
    }

    /** Update Product Item Attribute */
    interface IUpdateProductItemAttribute {
        /** Id of the attribute. *Required* */
        id: number
        /** Value id of the attribute. *Required* */
        valueId: number
        /** Text length of the attribute. *Required* */
        textLength: number
    }

    /** Create Product Params */
    interface ICreateProductItem {
        /** Name of the product. *Required* */
        productName: string
        /** Stock code of the product. *Required* */
        stockCode: string
        /** Main product code of the product. *Required* */
        mainProductCode: string
        /** Category id of the product. *Required* */
        categoryId: number
        /** Description of the product. *Required* */
        description: string
        /** Media link of the product. */
        mediaLink?: string | null
        /** Stock quantity of the product. *Required* */
        stockQuantity: number
        /** Sales price of the product. *Required* */
        salesPrice: number
        /** List price of the product. *Required* */
        listPrice?: number | null
        /** Delivery tipe of the product. *Required*. Options: *with_service*, *with_cargo*, *with_service_and_cargo* */
        deliveryType: 'with_service' | 'with_cargo' | 'with_service_and_cargo'
        /** Delivery message type of the product. *Required*. Options: *cicek_service*, *gift_cargo_same_day*, *gift_cargo_1_3_days*, *gift_cargo_1_2_days* */
        deliveryMessageType: 'cicek_service' | 'gift_cargo_same_day' | 'gift_cargo_1_3_days' | 'gift_cargo_1_2_days'
        /** Images of the product. *Required* */
        images: string[]
        /** Attributes of the product. */
        attributes?: IUpdateProductItemAttribute[] | null
        /** Barcode of the product. */
        barcode?: string | null
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
        /** Order ID. *Required* */
        orderNo: number
        /** Order item ID. */
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

    /** Send Invoice Params */
    interface ISendInvoiceParams {
        /** Order item ID. *Required* */
        orderItemId: number
        /** Invoice document. Pdf or base64 encoded string. */
        document: any | null
        /** Invoice document url. */
        documentUrl: string | null
    }

    /** Send Cargo Measurement Item */
    interface ISendCargoMeasurementItem {
        /** Product ID. *Required* */
        orderProductId: number
        /** Product deci value. *Required* */
        deci: number
        /** Product quantity. *Required* */
        quantity: number
    }

    /** Change Cargo Company Item */
    interface IChangeCargoCompanyItem {
        /** Order Product ID. *Required* */
        orderProductId: number
        /** Cargo company name. *Required* Must be one of the following: *mng_kargo*, *yurtici_Kargo*, *surat_kargo*, *aras_kargo*, *ptt_kargo*, *ups_kargo*, *horoz_lojistik*, *borusan_lojistik* */
        cargoCompany:
            | 'mng_kargo'
            | 'yurtici_Kargo'
            | 'surat_kargo'
            | 'aras_kargo'
            | 'ptt_kargo'
            | 'ups_kargo'
            | 'horoz_lojistik'
            | 'borusan_lojistik'
    }

    /** Send With Own Cargo Item */
    interface ISendWithOwnCargoItem {
        /** Order item ID. *Required* */
        orderItemId: number
        /** Current status of the order. *Required* Must be one of the following: *new*, *preparing*, *shipped*, *will_be_shipped*, *delivered*, *delivered_to_car*, *returned_to_firm* */
        orderItemStatus:
            | 'new'
            | 'preparing'
            | 'shipped'
            | 'will_be_shipped'
            | 'delivered'
            | 'delivered_to_car'
            | 'returned_to_firm'
        /** Cargo company name. *Required* Must be one of the following: *mng_kargo*, *yurtici_Kargo*, *surat_kargo*, *aras_kargo*, *ptt_kargo*, *ups_kargo*, *horoz_lojistik*, *borusan_lojistik* */
        cargoBusiness?:
            | 'mng_kargo'
            | 'yurtici_Kargo'
            | 'surat_kargo'
            | 'aras_kargo'
            | 'ptt_kargo'
            | 'ups_kargo'
            | 'horoz_lojistik'
            | 'borusan_lojistik'
        /** Cargo tracking number. */
        shipmentNumber?: number
        /** Cargo tracking url. */
        shipmentTrackingUrl?: string
        /** Receiver name. */
        receiverName?: string
        /** Delivery time. */
        deliveryTime?: string
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

    /** Answer Seller Question Params */
    interface IAnswerSellerQuestionParams {
        /** Answer text. */
        answer: string | null
        /** Branch action. Options: *answer_question*, *answer_question_private*, *inappropriate_question*, *question_belongs_to_another_seller*. */
        branchAction:
            | 'answer_question'
            | 'answer_question_private'
            | 'inappropriate_question'
            | 'question_belongs_to_another_seller'
            | null
        /** Branch action detail. Options: *answered_before*, *question_is_about_order*, *other*. */
        branchActionDetail?: 'answered_before' | 'question_is_about_order' | 'other' | null
        /** Branch action description. */
        branchDescription?: string | null
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

    /** Approve or Reject Canceled Order Params */
    export interface IApproveOrRejectCanceledOrderParams {
        /** Id of the canceled order item. */
        orderItemId: number
        /** Approve or reject the canceled order item. */
        process: 'approve' | 'reject'
    }

    /** Approve or Reject Canceled Order Response */
    export interface IApproveOrRejectCanceledOrderResponse {
        isSuccess?: boolean | null
        message?: string | null
    }

    /** Recieved Canceled Order Params */
    export interface IRecievedCanceledOrderParams {
        /** Ids of the received order items */
        orderItemIds: number[]
    }

    /** Recieved Canceled Order Response */
    export interface IRecievedCanceledOrderResponse {
        orderItems?: IRecievedOrderItems[] | null
    }

    /** Recieved Order Items */
    export interface IRecievedOrderItems {
        orderItemId?: number | null
        isSuccess?: boolean | null
        validation?: Validation | null
    }

    /** Validation */
    export interface Validation {
        key?: string | null
        message?: string | null
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
