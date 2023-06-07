# Çiçeksepeti API

[![Version npm][npm-ciceksepeti-api-badge]][npm-ciceksepeti-api]
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

Çiçeksepeti Marketplace API bindings for Node.js.

## Installation:

```shell
$ npm install --save ciceksepeti-api
```

## API

This module exports a constructor function which takes an options object.

### `Ciceksepeti(options)`

Creates a new `Ciceksepeti` instance.

#### Arguments

-   `options` - Required - A plain JavaScript object that contains the
    configuration options.

#### Options

-   `apiKey` - A string that specifies the API key of the app.

#### Return value

A `Ciceksepeti` instance.

#### Exceptions

Throws an `Error` exception if the required options are missing.

#### Example

```js
const Ciceksepeti = require('ciceksepeti-api')

const ciceksepeti = new Ciceksepeti({
    apiKey: 'your-api-key',
})
```

## Available resources and methods

View the [documentation](https://github.com/Coskntkk/ciceksepeti-api/blob/main/documentation.md) for a list of available resources and methods.

## Contributing

Contributions are always welcome!

See [`CONTRIBUTING.md`](https://github.com/Coskntkk/ciceksepeti-api/blob/main/CONTRIBUTING.md) for ways to get started.

## License

[MIT](LICENSE)

## Supporting

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/yellow_img.png)](https://www.buymeacoffee.com/coskntkk)

[npm-ciceksepeti-api-badge]: https://img.shields.io/npm/v/ciceksepeti-api.svg
[npm-ciceksepeti-api]: https://www.npmjs.com/package/ciceksepeti-api
[ci-ciceksepeti-api-badge]: https://img.shields.io/github/workflow/status/Coskntkk/ciceksepeti-api/CI/main?label=CI
[ci-ciceksepeti-api]: https://github.com/Coskntkk/ciceksepeti-api/actions?query=workflow%3ACI+branch%3Amain
[coverage-ciceksepeti-api-badge]: https://img.shields.io/coveralls/Coskntkk/ciceksepeti-api/main.svg
[coverage-ciceksepeti-api]: https://coveralls.io/github/Coskntkk/ciceksepeti-api
