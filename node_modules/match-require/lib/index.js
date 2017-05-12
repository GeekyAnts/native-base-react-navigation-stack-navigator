'use strict';

var IMPORT_RE = /(\bimport\s+(?:[^'"]+\s+from\s+)??)(['"])([^'"]+)(\2)/g;
var EXPORT_RE = /(\bexport\s+(?:[^'"]+\s+from\s+)??)(['"])([^'"]+)(\2)/g;
var REQUIRE_RE = /(\brequire\s*?\(\s*?)(['"])([^'"]+)(\2\s*?\))/g;

/**
 * Extract all required modules from a `code` string.
 */
var blockCommentRe = /\/\*(.|\n)*?\*\//g;
var lineCommentRe = /\/\/.+(\n|$)/g;

// from react-native packager
function findAll(code) {
  var deps = [];

  code.replace(blockCommentRe, '').replace(lineCommentRe, '')
  // Parse the sync dependencies this module has. When the module is
  // required, all it's sync dependencies will be loaded into memory.
  // Sync dependencies can be defined either using `require` or the ES6
  // `import` or `export` syntaxes:
  //   const dep1 = require('dep1');
  .replace(IMPORT_RE, function (match, pre, quot, dep, post) {
    deps.push(dep);
    return match;
  }).replace(EXPORT_RE, function (match, pre, quot, dep, post) {
    deps.push(dep);
    return match;
  }).replace(REQUIRE_RE, function (match, pre, quot, dep, post) {
    deps.push(dep);
    return match;
  });

  return deps;
}

function replaceAll(code, replacer) {
  function doIt(_match, pre, quot, dep, post) {
    return '' + pre + quot + replacer(dep) + post;
  }
  return code.replace(blockCommentRe, '').replace(lineCommentRe, '').replace(IMPORT_RE, doIt).replace(EXPORT_RE, doIt).replace(REQUIRE_RE, doIt);
}

function splitPackageName(moduleName) {
  var index = moduleName.indexOf('/');
  if (index !== -1) {
    // support domain package
    // require('@ali/matrix')
    if (moduleName.charAt(0) === '@') {
      index = moduleName.indexOf('/', index + 1);
    }
  }
  if (index !== -1) {
    return {
      packageName: moduleName.slice(0, index),
      suffix: moduleName.slice(index)
    };
  } else {
    return {
      packageName: moduleName,
      suffix: ''
    };
  }
}

function startsWith(str, prefix) {
  return str.slice(0, prefix.length) === prefix;
}

module.exports = {
  findAll: findAll,
  replaceAll: replaceAll,
  findAllImports: findAll,
  splitPackageName: splitPackageName,
  isRelativeModule: function isRelativeModule(dep) {
    return startsWith(dep, './') || startsWith(dep, '../');
  }
};