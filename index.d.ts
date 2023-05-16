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
    list: (params?: Ciceksepeti.ListProductsParams) => Promise<Ciceksepeti.ListProductResponse>;
    count: (params?: Ciceksepeti.CountProductsParams) => Promise<Ciceksepeti.CountProductResponse>;
    get: (params?: Ciceksepeti.GetProductParams) => Promise<Ciceksepeti.IProduct>;
  };
  order: {
    list: (params?: Ciceksepeti.ListOrdersParams) => Promise<Ciceksepeti.ListOrdersResponse>;
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
  }

  export interface ICallLimits {
    remaining: number;
    current: number;
    max: number;
  }

  /** ------------------ Products ------------------ */

  /** List Products */
  interface ListProductsParams {
    status?: ListProductStatusType | ListProductStatusType[] | null;
    page?: number | null;
    limit?: number | null;
    sortBy?: ListProductSortByType | null;
    stockCode?: string | null;
    variantName?: string | null;
  }

  interface ListProductResponse {
    totalCount?: number | null;
    products?: IProduct[] | null;
  }

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
  }

  interface IProductAttribute {
    id?: number | null;
    name?: string | null;
    textLength?: number | null;
  }

  /** Count Products */
  interface CountProductsParams {
    status?: ListProductStatusType | ListProductStatusType[] | null;
    variantName?: string | null;
  }

  interface CountProductResponse {
    totalCount?: number | null;
  }

  /** Get Product */
  interface GetProductParams {
    stockCode: string;
  }

  /** ------------------ Orders ------------------ */

  /** List Orders */

  interface ListOrdersParams {
    startDate?: string | null;
    endDate?: string | null;
    pageSize: number | null;
    page: number | null;
    status?: ListOrderStatusType | ListOrderStatusType[] | null;
    orderNo?: number | null;
    orderItemNo?: number | null;
    isOrderStatusActive?: boolean | null;
  }

  interface ListOrdersResponse {
    totalCount?: number | null;
    totalPages: number | null;
    orders?: any[] | null; //IOrder[] | null;
  }

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
