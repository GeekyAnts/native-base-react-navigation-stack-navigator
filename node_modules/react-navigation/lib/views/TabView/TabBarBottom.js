'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _TabBarIcon = require('./TabBarIcon');

var _TabBarIcon2 = _interopRequireDefault(_TabBarIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var babelPluginFlowReactPropTypes_proptype_Style = require('../../TypeDefinition').babelPluginFlowReactPropTypes_proptype_Style || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_NavigationScreenProp = require('../../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationScreenProp || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_NavigationState = require('../../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationState || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_NavigationRoute = require('../../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationRoute || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_NavigationAction = require('../../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationAction || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_TabScene = require('./TabView').babelPluginFlowReactPropTypes_proptype_TabScene || require('react').PropTypes.any;

var TabBarBottom = function (_PureComponent) {
  _inherits(TabBarBottom, _PureComponent);

  function TabBarBottom() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, TabBarBottom);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TabBarBottom.__proto__ || Object.getPrototypeOf(TabBarBottom)).call.apply(_ref, [this].concat(args))), _this), _this._renderLabel = function (scene) {
      var _this$props = _this.props,
          position = _this$props.position,
          navigation = _this$props.navigation,
          activeTintColor = _this$props.activeTintColor,
          inactiveTintColor = _this$props.inactiveTintColor,
          labelStyle = _this$props.labelStyle,
          showLabel = _this$props.showLabel;

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
          label
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
          showIcon = _this$props2.showIcon;

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
        style: styles.icon
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }
  // See https://developer.apple.com/library/content/documentation/UserExperience/Conceptual/UIKitUICatalog/UITabBar.html


  _createClass(TabBarBottom, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          position = _props.position,
          navigation = _props.navigation,
          jumpToIndex = _props.jumpToIndex,
          activeBackgroundColor = _props.activeBackgroundColor,
          inactiveBackgroundColor = _props.inactiveBackgroundColor,
          style = _props.style;
      var routes = navigation.state.routes;
      // Prepend '-1', so there are always at least 2 items in inputRange

      var inputRange = [-1].concat(_toConsumableArray(routes.map(function (x, i) {
        return i;
      })));
      return _react2.default.createElement(
        _reactNative.View,
        { style: [styles.tabBar, style] },
        routes.map(function (route, index) {
          var focused = index === navigation.state.index;
          var scene = { route: route, index: index, focused: focused };
          var outputRange = inputRange.map(function (inputIndex) {
            return inputIndex === index ? activeBackgroundColor : inactiveBackgroundColor;
          });
          var backgroundColor = position.interpolate({
            inputRange: inputRange,
            outputRange: outputRange
          });
          var justifyContent = _this2.props.showIcon ? 'flex-end' : 'center';
          return _react2.default.createElement(
            _reactNative.TouchableWithoutFeedback,
            {
              key: route.key,
              onPress: function onPress() {
                return jumpToIndex(index);
              }
            },
            _react2.default.createElement(
              _reactNative.Animated.View,
              {
                style: [styles.tab, { backgroundColor: backgroundColor, justifyContent: justifyContent }]
              },
              _this2._renderIcon(scene),
              _this2._renderLabel(scene)
            )
          );
        })
      );
    }
  }]);

  return TabBarBottom;
}(_react.PureComponent);

TabBarBottom.defaultProps = {
  activeTintColor: '#3478f6', // Default active tint color in iOS 10
  activeBackgroundColor: 'transparent',
  inactiveTintColor: '#929292', // Default inactive tint color in iOS 10
  inactiveBackgroundColor: 'transparent',
  showLabel: true,
  showIcon: true
};
TabBarBottom.propTypes = {
  activeTintColor: require('prop-types').string.isRequired,
  activeBackgroundColor: require('prop-types').string.isRequired,
  inactiveTintColor: require('prop-types').string.isRequired,
  inactiveBackgroundColor: require('prop-types').string.isRequired,
  position: require('prop-types').any.isRequired,
  navigation: babelPluginFlowReactPropTypes_proptype_NavigationScreenProp,
  jumpToIndex: require('prop-types').func.isRequired,
  getLabel: require('prop-types').func.isRequired,
  renderIcon: require('prop-types').func.isRequired,
  showLabel: require('prop-types').bool.isRequired,
  style: babelPluginFlowReactPropTypes_proptype_Style,
  labelStyle: babelPluginFlowReactPropTypes_proptype_Style,
  showIcon: require('prop-types').bool.isRequired
};
TabBarBottom.propTypes = {
  activeTintColor: require('prop-types').string.isRequired,
  activeBackgroundColor: require('prop-types').string.isRequired,
  inactiveTintColor: require('prop-types').string.isRequired,
  inactiveBackgroundColor: require('prop-types').string.isRequired,
  position: require('prop-types').any.isRequired,
  navigation: babelPluginFlowReactPropTypes_proptype_NavigationScreenProp,
  jumpToIndex: require('prop-types').func.isRequired,
  getLabel: require('prop-types').func.isRequired,
  renderIcon: require('prop-types').func.isRequired,
  showLabel: require('prop-types').bool.isRequired,
  style: babelPluginFlowReactPropTypes_proptype_Style,
  labelStyle: babelPluginFlowReactPropTypes_proptype_Style,
  showIcon: require('prop-types').bool.isRequired
};
exports.default = TabBarBottom;


var styles = _reactNative.StyleSheet.create({
  tabBar: {
    height: 49, // Default tab bar height in iOS 10
    flexDirection: 'row',
    borderTopWidth: _reactNative.StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(0, 0, 0, .2)',
    backgroundColor: '#f4f4f4' },
  tab: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-end'
  },
  icon: {
    flexGrow: 1
  },
  label: {
    textAlign: 'center',
    fontSize: 10,
    marginBottom: 1.5,
    backgroundColor: 'transparent'
  }
});