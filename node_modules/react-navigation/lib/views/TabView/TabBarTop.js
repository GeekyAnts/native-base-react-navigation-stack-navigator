'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _reactNativeTabView = require('react-native-tab-view');

var _TabBarIcon = require('./TabBarIcon');

var _TabBarIcon2 = _interopRequireDefault(_TabBarIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var babelPluginFlowReactPropTypes_proptype_Style = require('../../TypeDefinition').babelPluginFlowReactPropTypes_proptype_Style || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_NavigationState = require('../../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationState || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_NavigationScreenProp = require('../../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationScreenProp || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_NavigationAction = require('../../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationAction || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_TabScene = require('./TabView').babelPluginFlowReactPropTypes_proptype_TabScene || require('react').PropTypes.any;

var TabBarTop = function (_PureComponent) {
  _inherits(TabBarTop, _PureComponent);

  function TabBarTop() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, TabBarTop);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TabBarTop.__proto__ || Object.getPrototypeOf(TabBarTop)).call.apply(_ref, [this].concat(args))), _this), _this._renderLabel = function (scene) {
      var _this$props = _this.props,
          position = _this$props.position,
          navigation = _this$props.navigation,
          activeTintColor = _this$props.activeTintColor,
          inactiveTintColor = _this$props.inactiveTintColor,
          showLabel = _this$props.showLabel,
          upperCaseLabel = _this$props.upperCaseLabel,
          labelStyle = _this$props.labelStyle;

      if (showLabel === false) {
        return null;
      }
      var index = scene.index;
      var routes = navigation.state.routes;
      // Prepend '-1', so there are always at least 2 items in inputRange

      var inputRange = [-1].concat(_toConsumableArray(routes.map(function (x, i) {
        return i;
      })));
      var outputRange = inputRange.map(function (inputIndex) {
        return inputIndex === index ? activeTintColor : inactiveTintColor;
      });
      var color = position.interpolate({
        inputRange: inputRange,
        outputRange: outputRange
      });

      var label = _this.props.getLabel(scene);
      if (typeof label === 'string') {
        return _react2.default.createElement(
          _reactNative.Animated.Text,
          { style: [styles.label, { color: color }, labelStyle] },
          upperCaseLabel ? label.toUpperCase() : label
        );
      }
      if (typeof label === 'function') {
        return label(scene);
      }

      return label;
    }, _this._renderIcon = function (scene) {
      var _this$props2 = _this.props,
          position = _this$props2.position,
          navigation = _this$props2.navigation,
          activeTintColor = _this$props2.activeTintColor,
          inactiveTintColor = _this$props2.inactiveTintColor,
          renderIcon = _this$props2.renderIcon,
          showIcon = _this$props2.showIcon,
          iconStyle = _this$props2.iconStyle;

      if (showIcon === false) {
        return null;
      }
      return _react2.default.createElement(_TabBarIcon2.default, {
        position: position,
        navigation: navigation,
        activeTintColor: activeTintColor,
        inactiveTintColor: inactiveTintColor,
        renderIcon: renderIcon,
        scene: scene,
        style: [styles.icon, iconStyle]
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(TabBarTop, [{
    key: 'render',
    value: function render() {
      // TODO: Define full proptypes
      var props = this.props;

      return _react2.default.createElement(_reactNativeTabView.TabBar, _extends({}, props, {
        renderIcon: this._renderIcon,
        renderLabel: this._renderLabel
      }));
    }
  }]);

  return TabBarTop;
}(_react.PureComponent);

TabBarTop.defaultProps = {
  activeTintColor: '#fff',
  inactiveTintColor: '#fff',
  showIcon: false,
  showLabel: true,
  upperCaseLabel: true
};
TabBarTop.propTypes = {
  activeTintColor: require('prop-types').string.isRequired,
  inactiveTintColor: require('prop-types').string.isRequired,
  showIcon: require('prop-types').bool.isRequired,
  showLabel: require('prop-types').bool.isRequired,
  upperCaseLabel: require('prop-types').bool.isRequired,
  position: require('prop-types').any.isRequired,
  navigation: babelPluginFlowReactPropTypes_proptype_NavigationScreenProp,
  getLabel: require('prop-types').func.isRequired,
  renderIcon: require('prop-types').func.isRequired,
  labelStyle: babelPluginFlowReactPropTypes_proptype_Style,
  iconStyle: babelPluginFlowReactPropTypes_proptype_Style
};
TabBarTop.propTypes = {
  activeTintColor: require('prop-types').string.isRequired,
  inactiveTintColor: require('prop-types').string.isRequired,
  showIcon: require('prop-types').bool.isRequired,
  showLabel: require('prop-types').bool.isRequired,
  upperCaseLabel: require('prop-types').bool.isRequired,
  position: require('prop-types').any.isRequired,
  navigation: babelPluginFlowReactPropTypes_proptype_NavigationScreenProp,
  getLabel: require('prop-types').func.isRequired,
  renderIcon: require('prop-types').func.isRequired,
  labelStyle: babelPluginFlowReactPropTypes_proptype_Style,
  iconStyle: babelPluginFlowReactPropTypes_proptype_Style
};
exports.default = TabBarTop;


var styles = _reactNative.StyleSheet.create({
  icon: {
    height: 24,
    width: 24
  },
  label: {
    textAlign: 'center',
    fontSize: 13,
    margin: 8,
    backgroundColor: 'transparent'
  }
});