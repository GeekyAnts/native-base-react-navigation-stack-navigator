'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultExtensions = undefined;
exports.mapModule = mapModule;
exports.manipulatePluginOptions = manipulatePluginOptions;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

var _findBabelConfig = require('find-babel-config');

var _findBabelConfig2 = _interopRequireDefault(_findBabelConfig);

var _getRealPath = require('./getRealPath');

var _getRealPath2 = _interopRequireDefault(_getRealPath);

var _import = require('./transformers/import');

var _import2 = _interopRequireDefault(_import);

var _systemImport = require('./transformers/systemImport');

var _systemImport2 = _interopRequireDefault(_systemImport);

var _jest = require('./transformers/jest');

var _jest2 = _interopRequireDefault(_jest);

var _require = require('./transformers/require');

var _require2 = _interopRequireDefault(_require);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultBabelExtensions = ['.js', '.jsx', '.es', '.es6'];
var defaultExtensions = exports.defaultExtensions = defaultBabelExtensions;

function mapModule(sourcePath, currentFile, pluginOpts, cwd) {
  // Do not map source starting with a dot
  if (sourcePath[0] === '.') {
    return null;
  }

  return (0, _getRealPath2.default)(sourcePath, currentFile, {
    cwd: cwd,
    pluginOpts: pluginOpts,
    extensions: pluginOpts.extensions || defaultExtensions
  });
}

function manipulatePluginOptions(pluginOpts) {
  if (pluginOpts.root) {
    // eslint-disable-next-line no-param-reassign
    pluginOpts.root = pluginOpts.root.reduce(function (resolvedDirs, dirPath) {
      if (_glob2.default.hasMagic(dirPath)) {
        return resolvedDirs.concat(_glob2.default.sync(dirPath).filter(function (p) {
          return _fs2.default.lstatSync(p).isDirectory();
        }));
      }
      return resolvedDirs.concat(dirPath);
    }, []);
  }

  return pluginOpts;
}

exports.default = function (_ref) {
  var t = _ref.types;
  return {
    manipulateOptions: function manipulateOptions(babelOptions) {
      var _this = this;

      var findPluginOptions = babelOptions.plugins.find(function (plugin) {
        return plugin[0] === _this;
      })[1];
      findPluginOptions = manipulatePluginOptions(findPluginOptions);

      this.customCWD = findPluginOptions.cwd;
    },
    pre: function pre(file) {
      var customCWD = this.plugin.customCWD;

      if (customCWD === 'babelrc') {
        var startPath = file.opts.filename === 'unknown' ? './' : file.opts.filename;

        var _findBabelConfig$sync = _findBabelConfig2.default.sync(startPath),
            babelFile = _findBabelConfig$sync.file;

        customCWD = babelFile ? _path2.default.dirname(babelFile) : null;
      }

      this.moduleResolverCWD = customCWD || process.cwd();
    },


    visitor: {
      CallExpression: {
        exit: function exit(nodePath, state) {
          if (nodePath.node.seen) {
            return;
          }

          (0, _require2.default)(t, nodePath, mapModule, state, this.moduleResolverCWD);
          (0, _jest2.default)(t, nodePath, mapModule, state, this.moduleResolverCWD);
          (0, _systemImport2.default)(t, nodePath, mapModule, state, this.moduleResolverCWD);

          // eslint-disable-next-line no-param-reassign
          nodePath.node.seen = true;
        }
      },
      ImportDeclaration: {
        exit: function exit(nodePath, state) {
          (0, _import2.default)(t, nodePath, mapModule, state, this.moduleResolverCWD);
        }
      }
    }
  };
};