/**
 * Modified from https://github.com/thenables/thenify
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2016-present Exponent
 * Copyright (c) 2014-2016 Jonathan Ong me@jongleberry.com and contributors
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
'use strict';

var BARE_FUNCTION_NAME_REGEX = /([a-z_$][a-z\d_$]*)\]?$/i;

function promisify(fn, withArrayResult) {
  // The `name` property of a function may have a prefix and a symbol
  // description according to the spec
  var match = BARE_FUNCTION_NAME_REGEX.exec(fn.name);
  var bareName = match ? match[1] : '';

  if (withArrayResult) {
    (function () {
      var originalFn = fn;
      fn = function fn() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        var callback = args[args.length - 1];
        args[args.length - 1] = function (err) {
          for (var _len2 = arguments.length, values = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
            values[_key2 - 1] = arguments[_key2];
          }

          return callback.call(this, err, values);
        };
        return originalFn.apply(this, args);
      };
    })();
  }

  // The wrapper function's source code that we eval refers to this variable
  var $$__fn__$$ = fn;
  return eval(createWrapper(bareName, withArrayResult));
}

function createCallback(resolve, reject) {
  return function (err, value) {
    if (err) {
      reject(err);
    } else {
      resolve(value);
    }
  };
}

function createWrapper(name, withArrayResult) {
  return '({\n' + ('  "' + name + '": function() {\n') + '    var self = this;\n' + '    var length = arguments.length;\n' + '    var args = new Array(length + 1);\n' + '    for (var ii = 0; ii < length; ii++) {\n' + '      args[ii] = arguments[ii];\n' + '    }\n' + '    var lastIndex = ii;\n' + '    return new Promise(function(resolve, reject) {\n' + '      args[lastIndex] = createCallback(resolve, reject);\n' + '      $$__fn__$$.apply(self, args); \n' + '    });\n' + '  }\n' + ('})["' + name + '"]');
}

module.exports = promisify;