'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _invariant = require('fbjs/lib/invariant');

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var babelPluginFlowReactPropTypes_proptype_NavigationRoute = require('../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationRoute || require('react').PropTypes.any;

var deprecatedKeys = ['tabBar'];

/**
 * Make sure screen options returned by the `getScreenOption`
 * are valid
 */

exports.default = function (screenOptions, route) {
  var keys = Object.keys(screenOptions);

  var deprecatedKey = keys.find(function (key) {
    return deprecatedKeys.includes(key);
  });

  if (typeof screenOptions.title === 'function') {
    (0, _invariant2.default)(false, ['`title` cannot be defined as a function in navigation options for `' + route.routeName + '` screen. \n', 'Try replacing the following:', '{', '    title: ({ state }) => state...', '}', '', 'with:', '({ navigation }) => ({', '    title: navigation.state...', '})'].join('\n'));
  }

  if (deprecatedKey && typeof screenOptions[deprecatedKey] === 'function') {
    (0, _invariant2.default)(false, ['`' + deprecatedKey + '` cannot be defined as a function in navigation options for `' + route.routeName + '` screen. \n', 'Try replacing the following:', '{', '    ' + deprecatedKey + ': ({ state }) => ({', '         key: state...', '    })', '}', '', 'with:', '({ navigation }) => ({', '    ' + deprecatedKey + 'Key: navigation.state...', '})'].join('\n'));
  }

  if (deprecatedKey && _typeof(screenOptions[deprecatedKey]) === 'object') {
    (0, _invariant2.default)(false, ['Invalid key `' + deprecatedKey + '` defined in navigation options for `' + route.routeName + '` screen.', '\n', 'Try replacing the following navigation options:', '{', '    ' + deprecatedKey + ': {'].concat(_toConsumableArray(Object.keys(screenOptions[deprecatedKey]).map(function (key) {
      return '        ' + key + ': ...,';
    })), ['    },', '}', '\n', 'with:', '{'], _toConsumableArray(Object.keys(screenOptions[deprecatedKey]).map(function (key) {
      return '    ' + (deprecatedKey + key[0].toUpperCase() + key.slice(1)) + ': ...,';
    })), ['}']).join('\n'));
  }
};