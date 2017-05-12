'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var babelPluginFlowReactPropTypes_proptype_Style = require('../TypeDefinition').babelPluginFlowReactPropTypes_proptype_Style || require('react').PropTypes.any;

var HeaderTitle = function HeaderTitle(_ref) {
  var style = _ref.style,
      rest = _objectWithoutProperties(_ref, ['style']);

  return _react2.default.createElement(_reactNative.Text, _extends({
    numberOfLines: 1
  }, rest, {
    style: [styles.title, style],
    accessibilityTraits: 'header'
  }));
};

HeaderTitle.propTypes = {
  tintColor: require('prop-types').string,
  style: babelPluginFlowReactPropTypes_proptype_Style
};
var styles = _reactNative.StyleSheet.create({
  title: {
    fontSize: _reactNative.Platform.OS === 'ios' ? 17 : 18,
    fontWeight: _reactNative.Platform.OS === 'ios' ? '600' : '500',
    color: 'rgba(0, 0, 0, .9)',
    textAlign: _reactNative.Platform.OS === 'ios' ? 'center' : 'left',
    marginHorizontal: 16
  }
});

exports.default = HeaderTitle;