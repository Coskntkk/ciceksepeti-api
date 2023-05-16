# Çiçeksepeti API

[![Version npm][npm-ciceksepeti-api-badge]][npm-ciceksepeti-api]
[![Build Status][ci-ciceksepeti-api-badge]][ci-ciceksepeti-api]
[![Coverage Status][coverage-ciceksepeti-api-badge]][coverage-ciceksepeti-api]

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

- `options` - Required - A plain JavaScript object that contains the
  configuration options.

#### Options

- `apiKey` - A string that specifies the API key of the app.

#### Return value

A `Ciceksepeti` instance.

#### Exceptions

Throws an `Error` exception if the required options are missing.

#### Example

```js
const Ciceksepeti = require("ciceksepeti-api");

const ciceksepeti = new Ciceksepeti({
  apiKey: "your-api-key",
});
```

## Available resources and methods

View the [documentation](https://github.com/Coskntkk/ciceksepeti-api/blob/main/documentation.md) for a list of available resources and methods.

## License

[MIT](LICENSE)

[npm-ciceksepeti-api-badge]: 
    https://img.shields.io/npm/v/ciceksepeti-api.svg
[npm-ciceksepeti-api]: 
    https://www.npmjs.com/package/ciceksepeti-api
[ci-ciceksepeti-api-badge]: 
    https://img.shields.io/github/workflow/status/Coskntkk/ciceksepeti-api/CI/master?label=CI
[ci-ciceksepeti-api]: 
    https://github.com/Coskntkk/ciceksepeti-api/actions?query=workflow%3ACI+branch%3Amaster
[coverage-ciceksepeti-api-badge]: 
    https://img.shields.io/coveralls/Coskntkk/ciceksepeti-api/master.svg
[coverage-ciceksepeti-api]: 
    https://coveralls.io/github/Coskntkk/ciceksepeti-api
