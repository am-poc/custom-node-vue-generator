[![Express Logo](https://i.cloudup.com/zfY6lL7eFa-3000x3000.png)](http://expressjs.com/)

Custom Express application generator.

This repo belongs to the Custom Express App Generator.
This custom generator creates a template project with two parts:
1. Server: an express/node backend app
2. Client: a vue-cli frontend app (to be initialized using ```vue init```)

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![Linux Build][travis-image]][travis-url]
[![Windows Build][appveyor-image]][appveyor-url]

## Installation

```sh
$ npm install -S -g "git+ssh://git@github.com:afshanaman81/custom-node-vue-generator.git"
```

OR

```sh
$ npm install -S -g "https://github.com/afshanaman81/custom-node-vue-generator.git"
```

## Create a custom app from the custom generator
1. create a folder for you project
2. cd to that folder
3. generate your custom project as follows:
```sh
$ cted-express
```

## Next Steps
 are in the README file in the root folder, after installation

## License

[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/express-generator.svg
[npm-url]: https://npmjs.org/package/express-generator
[travis-image]: https://img.shields.io/travis/expressjs/generator/master.svg?label=linux
[travis-url]: https://travis-ci.org/expressjs/generator
[appveyor-image]: https://img.shields.io/appveyor/ci/dougwilson/generator/master.svg?label=windows
[appveyor-url]: https://ci.appveyor.com/project/dougwilson/generator
[downloads-image]: https://img.shields.io/npm/dm/express-generator.svg
[downloads-url]: https://npmjs.org/package/express-generator
