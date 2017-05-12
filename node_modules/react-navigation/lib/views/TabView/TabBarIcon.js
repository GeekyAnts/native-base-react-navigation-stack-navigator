'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var babelPluginFlowReactPropTypes_proptype_Style = require('../../TypeDefinition').babelPluginFlowReactPropTypes_proptype_Style || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_NavigationScreenProp = require('../../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationScreenProp || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_NavigationState = require('../../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationState || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_NavigationAction = require('../../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationAction || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_TabScene = require('./TabView').babelPluginFlowReactPropTypes_proptype_TabScene || require('react').PropTypes.any;

var TabBarIcon = function (_PureComponent) {
  _inherits(TabBarIcon, _PureComponent);

  function TabBarIcon() {
    _classCallCheck(this, TabBarIcon);

    return _possibleConstructorReturn(this, (TabBarIcon.__proto__ || Object.getPrototypeOf(TabBarIcon)).apply(this, arguments));
  }

  _createClass(TabBarIcon, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          position = _props.position,
          scene = _props.scene,
          navigation = _props.navigation,
          activeTintColor = _props.activeTintColor,
          inactiveTintColor = _props.inactiveTintColor,
          style = _props.style;
      var route = scene.route,
          index = scene.index;
      var routes = navigation.state.routes;
      // Prepend '-1', so there are always at least 2 items in inputRange

      var inputRange = [-1].concat(_toConsumableArray(routes.map(function (x, i) {
        return i;
      })));
      var activeOpacity = position.interpolate({
        inputRange: inputRange,
        outputRange: inputRange.map(function (i) {
          return i === index ? 1 : 0;
        })
      });
      var inactiveOpacity = position.interpolate({
        inputRange: inputRange,
        outputRange: inputRange.map(function (i) {
          return i === index ? 0 : 1;
        })
      });
      // We render the icon twice at the same position on top of each other:
      // active and inactive one, so we can fade between them.
      return _react2.default.createElement(
        _reactNative.View,
        { style: style },
        _react2.default.createElement(
          _reactNative.Animated.View,
          { style: [styles.icon, { opacity: activeOpacity }] },
          this.props.renderIcon({
            route: route,
            index: index,
            focused: true,
            tintColor: activeTintColor
          })
        ),
        _react2.default.createElement(
          _reactNative.Animated.View,
          { style: [styles.icon, { opacity: inactiveOpacity }] },
          this.props.renderIcon({
            route: route,
            index: index,
            focused: false,
            tintColor: inactiveTintColor
          })
        )
      );
    }
  }]);

  return TabBarIcon;
}(_react.PureComponent);

TabBarIcon.propTypes = {
  activeTintColor: require('prop-types').string.isRequired,
  inactiveTintColor: require('prop-types').string.isRequired,
  scene: babelPluginFlowReactPropTypes_proptype_TabScene,
  position: require('prop-types').any.isRequired,
  navigation: babelPluginFlowReactPropTypes_proptype_NavigationScreenProp,
  renderIcon: require('prop-types').func.isRequired,
  style: babelPluginFlowReactPropTypes_proptype_Style
};
TabBarIcon.propTypes = {
  activeTintColor: require('prop-types').string.isRequired,
  inactiveTintColor: require('prop-types').string.isRequired,
  scene: babelPluginFlowReactPropTypes_proptype_TabScene,
  position: require('prop-types').any.isRequired,
  navigation: babelPluginFlowReactPropTypes_proptype_NavigationScreenProp,
  renderIcon: require('prop-types').func.isRequired,
  style: babelPluginFlowReactPropTypes_proptype_Style
};
exports.default = TabBarIcon;


var styles = _reactNative.StyleSheet.create({
  icon: {
    // We render the icon twice at the same position on top of each other:
    // active and inactive one, so we can fade between them:
    // Cover the whole iconContainer:
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
});