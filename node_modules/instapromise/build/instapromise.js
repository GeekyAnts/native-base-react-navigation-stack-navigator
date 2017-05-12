'use strict';

var promisify = require('./promisify');

var nonProxiedPropertyNames = {
  constructor: true,
  promise: true,
  promiseArray: true
};

function defineMemoizedInstanceProperty(target, propertyName, factory) {
  var memoizedTargetProperty = void 0;
  Object.defineProperty(target, propertyName, {
    enumerable: false,
    configurable: true,
    get: function get() {
      // Don't override this getter on the original target since we still need
      // to call this getter via the prototype chain from other objects
      if (this === target) {
        if (memoizedTargetProperty === 'undefined') {
          memoizedTargetProperty = factory(this);
        }
        return memoizedTargetProperty;
      }

      var value = factory(this);
      Object.defineProperty(this, propertyName, {
        enumerable: false,
        configurable: true,
        value: value,
        writable: true
      });
      return value;
    },
    set: function set(value) {
      Object.defineProperty(this, propertyName, {
        enumerable: true,
        configurable: true,
        value: value,
        writable: true
      });
    }
  });
}

/**
 * Creates the proxy accessed via `source.promise` or `source.promiseArray`.
 */
function createPromisifiedProxy(source, promisifyPropertyName) {
  // TODO: Use actual proxy objects when supported
  var proxy = void 0;
  var withArrayResult = promisifyPropertyName === 'promiseArray';
  if (typeof source === 'function') {
    proxy = promisify(source, withArrayResult);

    // TODO: Use a symbol for the property name when supported
    Object.defineProperty(proxy, '___instapromiseOriginalFunction___', {
      enumerable: false,
      configurable: true,
      value: source,
      writable: true
    });

    var originalPrototype = Object.getPrototypeOf(source);
    if (originalPrototype !== Function.prototype) {
      setPrototypeOf(proxy, originalPrototype[promisifyPropertyName]);
    }
  } else {
    var _originalPrototype = Object.getPrototypeOf(source);
    var proxyPrototype = void 0;
    if (_originalPrototype && _originalPrototype[promisifyPropertyName]) {
      proxyPrototype = _originalPrototype[promisifyPropertyName];
    } else {
      proxyPrototype = _originalPrototype;
    }
    proxy = Object.create(proxyPrototype);

    var _propertyNames = Object.getOwnPropertyNames(source);
  }

  // Expose the functions of the source object through the proxy
  var propertyNames = Object.getOwnPropertyNames(source);
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = propertyNames[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var propertyName = _step.value;

      if (nonProxiedPropertyNames.hasOwnProperty(propertyName)) {
        continue;
      }
      // Ignore overrides of built-in methods like toString that can cause issues
      if (Object.prototype.hasOwnProperty(propertyName)) {
        continue;
      }
      var descriptor = Object.getOwnPropertyDescriptor(source, propertyName);
      // Getter methods are not supported since they can have unintentional side
      // effects when called in the wrong context
      if (descriptor.get) {
        continue;
      }
      // Proxy only functions
      if (typeof source[propertyName] !== 'function') {
        continue;
      }
      var asyncFunction = promisify(source[propertyName], withArrayResult).bind(source);
      asyncFunction.displayName = propertyName;

      Object.defineProperty(proxy, propertyName, {
        enumerable: descriptor.enumerable,
        configurable: descriptor.configurable,
        value: asyncFunction,
        writable: descriptor.writable
      });
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return proxy;
}

function setPrototypeOf(target, prototype) {
  if (typeof Object.setPrototypeOf === 'function') {
    Object.setPrototypeOf(target, prototype);
  } else {
    target.__proto__ = prototype;
  }
}

var _arr = [Object.prototype, Function.prototype];
for (var _i = 0; _i < _arr.length; _i++) {
  var base = _arr[_i];var _arr2 = ['promise', 'promiseArray'];

  var _loop = function _loop() {
    var promisifyPropertyName = _arr2[_i2];
    if (base.hasOwnProperty(promisifyPropertyName)) {
      return 'continue';
    }
    defineMemoizedInstanceProperty(base, promisifyPropertyName, function (target) {
      return createPromisifiedProxy(target, promisifyPropertyName);
    });
  };

  for (var _i2 = 0; _i2 < _arr2.length; _i2++) {
    var _ret = _loop();

    if (_ret === 'continue') continue;
  }
}