# Ciceksepeti API Documentation

This is a reference for methods available when using the ciçeksepeti-api package.
See the [Çiçeksepeti Marketplace API reference](https://ciceksepeti.dev) for more details.

## Product

-   `ciceksepeti.product.list([params])`

Lists products on Çiçeksepeti.

| param       | required | type                                                                                                                         |
| ----------- | -------- | ---------------------------------------------------------------------------------------------------------------------------- |
| status      | false    | enum: 'draft', 'waiting_for_approval', 'published', 'rejected', 'passive', 'published_waiting_for_approval', 'out_of_stock'  |
| page        | false    | number                                                                                                                       |
| pageSize    | false    | number                                                                                                                       |
| sortBy      | false    | enum: 'name_asc', 'name_desc', 'stock_asc', 'stock_desc', 'price_asc', 'price_desc', 'created_date_asc', 'created_date_desc' |
| stockCode   | false    | string                                                                                                                       |
| variantName | false    | string                                                                                                                       |

-   Response:

```js
{
  totalCount: 155,
  products: []
}
```

---

-   `ciceksepeti.product.count([params])`

Counts products on Çiçeksepeti.

| param       | required | type                                                                                                                        |
| ----------- | -------- | --------------------------------------------------------------------------------------------------------------------------- |
| status      | false    | enum: 'draft', 'waiting_for_approval', 'published', 'rejected', 'passive', 'published_waiting_for_approval', 'out_of_stock' |
| variantName | false    | string                                                                                                                      |

-   Response:

```js
{
    totalCount: 155
}
```

---

-   `ciceksepeti.product.get([params])`

Finds a product by stock code.

| param     | required | type   |
| --------- | -------- | ------ |
| stockCode | true     | string |

-   Response:

```js
{
  productName: '...',
  ...
}
```

---

-   `ciceksepeti.product.updateStockOrPrice([items])`

Updates stock or price of products.

| param | required | type          |
| ----- | -------- | ------------- |
| items | true     | array of item |

where item is:

```js
{
  stockCode: '...',
  stockQuantity: 123,
  listPrice: 123,
  salesPrice: 123,
}
```

**Note**: You can't update stock or price or both.

**Note**: You can't update listprice whitout salesprice.

-   Response:

```js
{
    batchId: '...'
}
```

---

-   `ciceksepeti.product.update([items])`

Updates products.

| param | required | type          |
| ----- | -------- | ------------- |
| items | true     | array of item |

where item is:

```js
{
  productName: "Test urunu", // required
  mainProductCode: "testmain2", // required
  stockCode: "test2", // required
  isActive: true, // required
  description: "test acıklaması", // required
  mediaLink: "test",
  deliveryMessageType: "gift_cargo_same_day", // required
  deliveryType: "with_cargo", // required
  barcode: "test123",
  images: [
    "test-test-kc6500945-1-392bf4631cf04904a3f0df31a6c10642.jpg"
  ],
  attributes: [
    {
      "id": 2000353,
      "valueId": 2010697,
      "textLength": 0
    }
  ]
}
```

-   Response:

```js
{
    batchId: '...'
}
```

---

-   `ciceksepeti.product.create([items])`

Creates new products on Çiçeksepeti.

| param | required | type          |
| ----- | -------- | ------------- |
| items | true     | array of item |

where item is:

```js
{
  productName: "Test urunu", // required
  mainProductCode: "testmain2", // required
  stockCode: "test2", // required
  description: "test acıklaması", // required
  mediaLink: "test",
  deliveryMessageType: "gift_cargo_same_day", // required
  deliveryType: "with_cargo", // required
  stockQuantity: 25, // required
  salesPrice: 56.99, // required
  listPrice: 99.99, // required
  barcode: "test123",
  images: [
    "test-test-kc6500945-1-392bf4631cf04904a3f0df31a6c10642.jpg"
  ],
  attributes: [
    {
      "id": 2000353,
      "valueId": 2010697,
      "textLength": 0
    }
  ]
}
```

-   Response:

```js
{
    batchId: '...'
}
```

---

-   `ciceksepeti.product.batchStatus(batchId)`

Checks batch status.

| param   | required | type   |
| ------- | -------- | ------ |
| batchId | true     | string |

where batchId is a string returned from `ciceksepeti.product.updateStockOrPrice()`.

-   Response:

```js
{
  batchId: '...',
  itemCount: 123,
  items: [],
}
```

## Order

-   `ciceksepeti.order.list([params])`

Lists orders on Çiçeksepeti.

| param               | required                                         | type                                                                |
| ------------------- | ------------------------------------------------ | ------------------------------------------------------------------- |
| startDate           | false if orderNo or orderItem entered, true else | string                                                              |
| endDate             | false if orderNo or orderItem entered, true else | string                                                              |
| pageSize            | true                                             | number                                                              |
| page                | true                                             | number                                                              |
| status              | false                                            | enum: 'new', 'preparing', 'shipped', 'will_be_shipped', 'delivered' |
| orderNo             | false                                            | string                                                              |
| orderItemNo         | false                                            | string                                                              |
| isOrderStatusActive | false                                            | bool                                                                |

-   Response:

```js
{
  totalCount: 123,
  totalPages: 4,
  orders: [],
}
```

---

-   `ciceksepeti.order.count([params])`

Counts orders on Çiçeksepeti.

| param               | required | type                                                                |
| ------------------- | -------- | ------------------------------------------------------------------- |
| startDate           | true     | string                                                              |
| endDate             | true     | string                                                              |
| status              | false    | enum: 'new', 'preparing', 'shipped', 'will_be_shipped', 'delivered' |
| isOrderStatusActive | false    | bool                                                                |

-   Response:

```js
{
    totalCount: 123
}
```

---

-   `ciceksepeti.order.get([params])`

Gets an order by orderNo.

| param       | required | type   |
| ----------- | -------- | ------ |
| orderNo     | true     | number |
| orderItemNo | false    | number |

-   Response:

```js
{
  orderId: 123456789,
  ...
}
```

---

-   `ciceksepeti.order.sendInvoice([items])`

Send invoice to customer. Items is an array of objects:

| param       | required | type               |
| ----------- | -------- | ------------------ |
| orderItemId | true     | number             |
| document    | false    | base64 or pdf file |
| documentUrl | false    | string             |

**Note:** Either document or documentUrl must be provided.

## Cargo

-   `ciceksepeti.cargo.sendMeasurements([items])`

Changes cargo measurement. Items is an array of objects:

| param          | required | type   |
| -------------- | -------- | ------ |
| orderProductId | true     | number |
| deci           | true     | number |
| quantity       | true     | number |

---

-   `ciceksepeti.cargo.changeCompany([items])`

Changes cargo company. Items is an array of objects:

| param          | required | type                                                                                                                            |
| -------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------- |
| orderProductId | true     | number                                                                                                                          |
| cargoCompany   | true     | enum: "mng_kargo", "yurtici_Kargo", "surat_kargo", "aras_kargo", "ptt_kargo", "ups_kargo", "horoz_lojistik", "borusan_lojistik" |

---

-   `ciceksepeti.cargo.sendWithCiceksepeti([orderItemIds])`

Sends a cargo using Çiçek Sepeti's cargo service. OrderItemIds is an array of numbers.

| param       | required | type   |
| ----------- | -------- | ------ |
| orderItemId | true     | number |

---

-   `ciceksepeti.cargo.sendWithOwnCargo([items])`

Sends a cargo using your own cargo service. Items is an array of objects:

| param               | required | type                                                                                                                            |
| ------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------- |
| orderItemId         | true     | number                                                                                                                          |
| orderItemStatus     | true     | enum: 'new', 'preparing', 'shipped', 'will_be_shipped', 'delivered', 'delivered_to_car', 'returned_to_firm'                     |
| cargoBusiness       | false    | enum: 'mng_kargo', 'yurtici_Kargo', 'surat_kargo', 'aras_kargo', 'ptt_kargo', 'ups_kargo', 'horoz_lojistik', 'borusan_lojistik' |
| shipmentNumber      | false    | number                                                                                                                          |
| shipmentTrackingUrl | false    | string                                                                                                                          |
| receiverName        | false    | string                                                                                                                          |
| deliveryTime        | false    | string                                                                                                                          |

## Category

-   `ciceksepeti.category.list()`

Lists categories on Çiçeksepeti.

-   Response:

```js
{
  categories: [],
}
```

---

## Seller Question

-   `ciceksepeti.sellerquestion.list([params])`

Gets seller questions on Çiçeksepeti.

| param          | required | type    |
| -------------- | -------- | ------- |
| id             | false    | number  |
| productCode    | false    | string  |
| answered       | false    | boolean |
| startDate      | false    | string  |
| endDate        | false    | string  |
| branchActionId | false    | number  |
| agentActionId  | false    | number  |
| approve        | false    | boolean |
| sortType       | false    | number  |
| sortField      | false    | number  |
| page           | false    | number  |

-   Response:

```js
{
  items: item[],
  hasNextPage: true,
}
```

---

-   `ciceksepeti.sellerquestion.answer(id, [params])`

Answers a seller question on Çiçeksepeti.

**Note:** Id is the id of the question.

| param              | required | type                                                                                                               |
| ------------------ | -------- | ------------------------------------------------------------------------------------------------------------------ |
| answer             | false    | string                                                                                                             |
| branchAction       | false    | enum: "answer_question", "answer_question_private", "inappropriate_question", "question_belongs_to_another_seller" |
| branchActionDetail | false    | enum: "answered_before", "question_is_about_order", "other"                                                        |
| branchDescription  | false    | string                                                                                                             |

---

## Canceled Order

-   `ciceksepeti.canceledOrder.list([params])`

Gets canceled orders on Çiçeksepeti.

| param           | required | type                                                                                                    |
| --------------- | -------- | ------------------------------------------------------------------------------------------------------- |
| orderItemStatus | false    | enum: 'return_started', 'return_in_cargo', 'return_in_supplier', 'return_waiting_for_supplier_approval' |
| pageSize        | true     | number                                                                                                  |
| page            | true     | number                                                                                                  |
| startDate       | false    | string                                                                                                  |
| endDate         | false    | string                                                                                                  |

-   Response:

```js
{
  orderItemsList: orderItem[],
}
```

---

-   `ciceksepeti.canceledOrder.approveOrReject([params])`

Approves or rejects the canceled order item by the seller.

| param       | required | type                      |
| ----------- | -------- | ------------------------- |
| orderItemId | true     | number                    |
| process     | true     | enum: 'approve', 'reject' |

-   Response:

```js
{
  isSuccess: true,
  message: ""
}
```

---

-   `ciceksepeti.canceledOrder.recieved([params])`

Approves that the order item is received by the seller.

| param        | required | type     |
| ------------ | -------- | -------- |
| orderItemIds | true     | number[] |

-   Response:

```js
{
  orderItems: orderItem[],
}
```

---

where `params` is a plain JavaScript object.
