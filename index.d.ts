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
export = Ciceksepeti;

/*~ Write your module's methods and properties in this class */

declare class Ciceksepeti {
  constructor(
    config: Ciceksepeti.ICiceksepetiConfig,
  );
  callLimits: Ciceksepeti.ICallLimits;
  // abandonedCheckouts
  on(
    event: 'callLimits',
    callback: (limits: Ciceksepeti.ICallLimits) => void
  ): Ciceksepeti;
  product: {
    list: (params?: Ciceksepeti.IListProductsParams) => Promise<Ciceksepeti.IListProductResponse>;
    count: (params?: Ciceksepeti.ICountProductsParams) => Promise<Ciceksepeti.ICountResponse>;
    get: (params: Ciceksepeti.IGetProductParams) => Promise<Ciceksepeti.IProduct>;
  };
  order: {
    list: (params?: Ciceksepeti.IListOrdersParams) => Promise<Ciceksepeti.IListOrdersResponse>;
    count: (params?: Ciceksepeti.ICountOrdersParams) => Promise<Ciceksepeti.ICountResponse>;
    get: (params: Ciceksepeti.IGetOrderParams) => Promise<Ciceksepeti.IOrder>;
  };
  category: {
    list: () => Promise<Ciceksepeti.IListCategoriesResponse>;
  };
}

/*~ If you want to expose types from your module as well, you can
 *~ place them in this block.
 */
declare namespace Ciceksepeti {

  export interface ICiceksepetiConfig {
    apiKey: string;
    // apiVersion?: string;
    // timeout?: number;
    // maxRetries?: number;
    // maxRetryAfter?: number;
  };

  export interface ICallLimits {
    remaining: number;
    current: number;
    max: number;
  };

  /** ------------------ Products ------------------ */

  /** List Products */
  interface IListProductsParams {
    status?: ListProductStatusType | ListProductStatusType[] | null;
    page?: number | null;
    limit?: number | null;
    sortBy?: ListProductSortByType | null;
    stockCode?: string | null;
    variantName?: string | null;
  };

  interface IListProductResponse {
    totalCount?: number | null;
    products?: IProduct[] | null;
  };

  interface IProduct {
    productName?: string | null;
    productCode?: string | null;
    categoryId?: number | null;
    categoryName?: string | null;
    stockCode?: string | null;
    variantName?: string | null;
    mainProductCode?: string | null;
    productStatusType?: string;
    description?: string | null;
    link?: string | null;
    mediaLink?: string | null;
    DeliveryType?: 1 | 2 | 3 | null;
    deliveryMessageType?: 4 | 5 | 6 | 7 | 13 | 18 | null;
    isUseStockQuantity?: boolean | null;
    StockQuantity?: number | null;
    SalesPrice?: number | null;
    ListPrice?: number | null;
    barcode?: string | null;
    passiveDescription?: string | null;
    isActive?: boolean | null;
    images?: string[] | null;
    attributes?: IProductAttribute[] | null;
  };

  interface IProductAttribute {
    id?: number | null;
    name?: string | null;
    textLength?: number | null;
  };

  /** Count Products */
  interface ICountProductsParams {
    status?: ListProductStatusType | ListProductStatusType[] | null;
    variantName?: string | null;
  };

  /** Get Product */
  interface IGetProductParams {
    stockCode: string;
  };

  /** ------------------ Orders ------------------ */

  /** List Orders */
  interface IListOrdersParams {
    startDate?: string | null;
    endDate?: string | null;
    pageSize: number | null;
    page: number | null;
    status?: ListOrderStatusType | ListOrderStatusType[] | null;
    orderNo?: number | null;
    orderItemNo?: number | null;
    isOrderStatusActive?: boolean | null;
  };

  interface IListOrdersResponse {
    totalCount?: number | null;
    totalPages: number | null;
    orders?: IOrder[] | null;
  };

  /** Count Orders */
  interface ICountOrdersParams {
    startDate: string | null;
    endDate: string | null;
    status?: ListOrderStatusType | ListOrderStatusType[] | null;
    isOrderStatusActive?: boolean | null;
  };

  /** Get Order */
  interface IGetOrderParams {
    orderNo: number;
    orderItemNo?: number;
  };

  interface IOrder {
    branchId?: number | null;
    customerId?: number | null;
    accountCode?: string | null;
    accountCodePrefix?: string | null;
    orderId?: number | null;
    orderItemId?: number | null;
    orderCreateDate?: string | null;
    cargoPrice?: number | null;
    orderCreateTime?: string | null;
    orderModifyDate?: string | null;
    orderModifyTime?: string | null;
    barcode?: string | null;
    cardMessage?: string | null;
    cardName?: string | null;
    deliveryCharge?: number | null;
    orderPaymentType?: string | null;
    orderItemStatusId?: number | null;
    orderProductStatus?: string | null;
    orderItemTextListModel?: any[] | null;
    discount?: number | null;
    totalPrice?: number | null;
    tax?: number | null;
    receiverName?: string | null;
    receiverPhone?: string | null;
    receiverAddress?: string | null;
    deliveryType?: number | null;
    deliveryDate?: string | null;
    requestedDeliveryDate?: string | null;
    cargoCompany?: string | null;
    receiverCity?: string | null;
    receiverRegion?: string | null;
    receiverDistrict?: string | null;
    senderName?: string | null;
    senderAddress?: string | null;
    senderTaxNumber?: string | null;
    senderTaxOfficeName?: string | null;
    senderCity?: string | null;
    senderRegion?: string | null;
    senderDistrict?: string | null;
    senderPhone?: string | null;
    senderEmail?: string | null;
    cargoNumber?: string | null;
    shipmentTrackingUrl?: string | null;
    productId?: number | null;
    productCode?: string | null;
    code?: string | null;
    name?: string | null;
    variantName?: string | null;
    quantity?: number | null;
    quantityUnit?: string | null;
    invoiceEmail?: string | null;
    isOrderStatusActive?: boolean | null;
    partialNumber?: string | null;
    senderCompanyName?: string | null;
    allowanceRate?: number | null;
    credit?: number | null;
    deliveryOptionName?: string | null;
    deliveryTime?: string | null;
    cancellationResult?: string | null;
    isFloristCargoOrder?: boolean | null;
    receiverCompanyName?: string | null;
    floristName?: string | null;
    floristAddress?: string | null;
    isLateToCargo?: boolean | null;
    allowanceExpiryDay?: number | null;
    branchDiscountPart?: number | null;
    csDiscountPart?: number | null;
    invoicePrice?: number | null;
    itemPrice?: number | null;
    cancellationNote?: string | null;
    receiverCountryCode?: string | null;
    zipCode?: string | null;
    currency?: string | null;
    websiteId?: number | null;
    extraProductTotalPrice?: number | null;
    extraProductTotalQuantity?: number | null;
    extraProducts?: any[] | null;
    promotionDescription?: string | null;
  };

  interface IOrderItemTextListModel {
    text?: string | null;
    value?: string | null;
  };

  /** ------------------ Categories ------------------ */

  /** List Categories */
  interface IListCategoriesResponse {
    categories?: ICategory[] | null;
  };

  interface ICategory {
    id: number;
    name: string;
    parentCategoryId: number | null;
    subCategories: ICategory[];
  };

  /** ------------------ Shared ------------------ */

  interface ICountResponse {
    totalCount?: number | null;
  };

  /** ------------------ Types ------------------ */
  type ListProductStatusType =
    'draft' |
    'waiting_for_approval' |
    'published' |
    'rejected' |
    'passive' |
    'published_waiting_for_approval' |
    'out_of_stock';

  type ListProductSortByType =
    'name_asc' |
    'name_desc' |
    'stock_asc' |
    'stock_desc' |
    'price_asc' |
    'price_desc' |
    'created_date_asc' |
    'created_date_desc';

  type ListOrderStatusType =
    'new' |
    'preparing' |
    'shipped' |
    'will_be_shipped' |
    'delivered';
}
