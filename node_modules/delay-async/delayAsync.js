'use strict';

module.exports = function delayAsync(ms) {
  return new Promise(function(resolve, reject) {
    setTimeout(resolve, ms);
  });
};
