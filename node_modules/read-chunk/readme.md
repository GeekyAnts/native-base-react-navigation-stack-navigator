# read-chunk [![Build Status](https://travis-ci.org/sindresorhus/read-chunk.svg?branch=master)](https://travis-ci.org/sindresorhus/read-chunk)

> Read a chunk from a file

Because the built-in way is too much boilerplate.


## Install

```
$ npm install --save read-chunk
```


## Usage

```js
const readChunk = require('read-chunk');

// foo.txt => hello

readChunk.sync('foo.txt', 1, 3);
//=> 'ell'
```


## API

### readChunk(filepath, position, length)

Returns a promise for a buffer.

### readChunk.sync(filepath, position, length)

Returns a buffer.

#### filepath

Type: `string`

#### position

Type: `number`

Position to start reading.

#### length

Type: `number`

Number of bytes to read.


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
