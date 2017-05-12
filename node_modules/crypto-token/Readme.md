
# crypto-token

Creates a cryptographically secure token which is unguessable, inspired by `uid2`.

## Installation

    $ npm install crypto-token

## Quickstart

```js
var token = require('crypto-token');

// sync

var t = token(); // 'jkwT1GzLbn'

// or async

token(function(err, res){
  console.log(res); // 'sXLWkN4vMG'
});

// of a custom `length`

token(32); // 'Rc0Mta5BW7X5ULYWq6QmnIqwVCPAsZKG'
```

## Usage

### token([length], [fn])

  Returns a token of `length` characters, will call back with `fn` or return directly depending on whether generation is synchronous or asynchronous

## License

The MIT License

Copyright &copy; 2014, Segment.io &lt;friends@segment.io&gt;

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
