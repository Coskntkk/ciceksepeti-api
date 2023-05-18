# Ciceksepeti API Documentation

This is a reference for methods available when using the ciçeksepeti-api package.
See the [Çiçeksepeti Marketplace API reference](https://ciceksepeti.dev) for more details.

## Product

  - `ciceksepeti.product.list([params])`

Lists products on Çiçeksepeti.
  
| param | required | type |
| --- | --- | --- |
| status | false | enum: 'draft', 'waiting_for_approval', 'published', 'rejected', 'passive', 'published_waiting_for_approval', 'out_of_stock'  |
| page | false | number |
| pageSize | false | number |
| sortBy | false | enum: 'name_asc', 'name_desc', 'stock_asc', 'stock_desc', 'price_asc', 'price_desc', 'created_date_asc', 'created_date_desc' |
| stockCode | false | string |
| variantName | false | string |

- Response:
```js
{
  totalCount: 155,
  products: []
}
```

***

- `ciceksepeti.product.count([params])`

Counts products on Çiçeksepeti.

| param | required | type |
| --- | --- | --- |
| status | false | enum: 'draft', 'waiting_for_approval', 'published', 'rejected', 'passive', 'published_waiting_for_approval', 'out_of_stock'  |
| variantName | false | string |

- Response:
```js
{
  totalCount: 155
}
```

***

- `ciceksepeti.product.get([params])`

Finds a product by stock code.

| param | required | type |
| --- | --- | --- |
| stockCode | true | string |

- Response:
```js
{
  productName: "...",
  ...
}
```

***

## Order

  - `ciceksepeti.order.list([params])`

Lists orders on Çiçeksepeti.
  
| param | required | type |
| --- | --- | --- |
| startDate | false if orderNo or orderItem entered, true else | string |
| endDate | false if orderNo or orderItem entered, true else | string |
| pageSize | true | number |
| page | true | number |
| status | false |  enum: 'new', 'preparing', 'shipped', 'will_be_shipped', 'delivered'  |
| orderNo | false | string |
| orderItemNo | false | string |
| isOrderStatusActive | false | bool |

- Response:
```js
{
  totalCount: 123,
  totalPages: 4,
  orders: [],
}
```

***

  - `ciceksepeti.order.count([params])`

Counts orders on Çiçeksepeti.
  
| param | required | type |
| --- | --- | --- |
| startDate | true | string |
| endDate | true | string |
| status | false | enum: 'new', 'preparing', 'shipped', 'will_be_shipped', 'delivered' |
| isOrderStatusActive | false | bool |

- Response:
```js
{
  totalCount: 123
}
```

***

  - `ciceksepeti.order.get([params])`

Gets an order by orderNo.
  
| param | required | type |
| --- | --- | --- |
| orderNo | true | number |
| orderItemNo | false | number |

- Response:
```js
{
  orderId: 123456789,
  ...
}
```

***

## Category

  - `ciceksepeti.category.list()`

Lists categories on Çiçeksepeti.

- Response:
```js
{
  categories: [],
}
```

***

## Seller Question

  - `ciceksepeti.sellerquestion.list([params])`

Gets seller questions on Çiçeksepeti.

| param | required | type |
| --- | --- | --- |
| id | false | number | 
| productCode | false | string | 
| answered | false | boolean | 
| startDate | false | string | 
| endDate | false | string | 
| branchActionId | false| number |
| agentActionId | false | number | 
| approve | false | boolean | 
| sortType | false | number | 
| sortField | false | number | 
| page | false | number | 

- Response:
```js
{
  items: item[],
  hasNextPage: true,
}
```

***

## Canceled Order

  - `ciceksepeti.canceledOrder.list([params])`

Gets canceled orders on Çiçeksepeti.

| param | required | type |
| --- | --- | --- |
| orderItemStatus | false | enum: "return_started", "return_in_cargo", "return_in_supplier", "return_waiting_for_supplier_approval" | 
| pageSize | true | number | 
| page | true | number | 
| startDate | false | string | 
| endDate | false | string | 

- Response:
```js
{
  orderItemsList: orderItem[],
}
```

***

where `params` is a plain JavaScript object. 