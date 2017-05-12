'use strict';

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _expo = require('expo');

var _expo2 = _interopRequireDefault(_expo);

var _App = require('../../../../App');

var _App2 = _interopRequireDefault(_App);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// we don't want this to require transformation
var AwakeInDevApp = function (_React$Component) {
  (0, _inherits3.default)(AwakeInDevApp, _React$Component);

  function AwakeInDevApp() {
    (0, _classCallCheck3.default)(this, AwakeInDevApp);
    return (0, _possibleConstructorReturn3.default)(this, (AwakeInDevApp.__proto__ || (0, _getPrototypeOf2.default)(AwakeInDevApp)).apply(this, arguments));
  }

  (0, _createClass3.default)(AwakeInDevApp, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_reactNative.View, {
        style: {
          flex: 1
        }
      }, _react2.default.createElement(_App2.default), _react2.default.createElement(process.env.NODE_ENV === 'development' ? _expo2.default.KeepAwake : _reactNative.View));
    }
  }]);
  return AwakeInDevApp;
}(_react2.default.Component);

_expo2.default.registerRootComponent(AwakeInDevApp);
//# sourceMappingURL=crna-entry.js.map