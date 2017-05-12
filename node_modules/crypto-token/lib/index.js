
/**
 * Module depenndencies.
 */

var crypto = require('crypto');

/**
 * 62 characters in the ascii range that can be used in URLs without special
 * encoding.
 */

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

/**
 * Return a token of `length` characters.
 *
 * @param {Number} length
 * @param {Function} fn
 */

module.exports = function(length, fn){
  if (typeof length === 'function') fn = length, length = null;
  if (!length) length = 10;
  if (!fn) return str(crypto.randomBytes(length));

  crypto.randomBytes(length, function(err, bytes){
    if (err) return fn(err);
    fn(null, str(bytes));
  })
}

/**
 * Make a Buffer into a string ready for use in URLs.
 *
 * @param {Buffer}
 * @returns {String}
 * @api private
 */

function str(bytes){
  var res = [];
  for (var i = 0; i < bytes.length; i++){
    res.push(chars[bytes[i] % chars.length]);
  }
  return res.join('');
}

