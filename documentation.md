## Product

  - `ciceksepeti.product.list([params])`

Lists products on Çiçeksepeti.
  
| param | required | type |
| --- | --- | --- |
| status | false | enum: 'draft', 'waiting_for_approval', 'published', 'rejected', 'passive', 'published_waiting_for_approval', 'out_of_stock'  |
| page | false | number |
| limit | false | number |
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