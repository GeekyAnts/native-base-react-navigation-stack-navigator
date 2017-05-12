'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _createNavigator = require('./createNavigator');

var _createNavigator2 = _interopRequireDefault(_createNavigator);

var _createNavigationContainer = require('../createNavigationContainer');

var _createNavigationContainer2 = _interopRequireDefault(_createNavigationContainer);

var _TabRouter = require('../routers/TabRouter');

var _TabRouter2 = _interopRequireDefault(_TabRouter);

var _TabView = require('../views/TabView/TabView');

var _TabView2 = _interopRequireDefault(_TabView);

var _TabBarTop = require('../views/TabView/TabBarTop');

var _TabBarTop2 = _interopRequireDefault(_TabBarTop);

var _TabBarBottom = require('../views/TabView/TabBarBottom');

var _TabBarBottom2 = _interopRequireDefault(_TabBarBottom);

var _NavigatorTypes = require('./NavigatorTypes');

var _NavigatorTypes2 = _interopRequireDefault(_NavigatorTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var babelPluginFlowReactPropTypes_proptype_TabViewConfig = require('../views/TabView/TabView').babelPluginFlowReactPropTypes_proptype_TabViewConfig || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_NavigationTabRouterConfig = require('../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationTabRouterConfig || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_NavigationRouteConfigMap = require('../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationRouteConfigMap || require('react').PropTypes.any;

var TabNavigator = function TabNavigator(routeConfigs) {
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  // Use the look native to the platform by default
  var mergedConfig = _extends({}, TabNavigator.Presets.Default, config);

  var tabBarComponent = mergedConfig.tabBarComponent,
      tabBarPosition = mergedConfig.tabBarPosition,
      tabBarOptions = mergedConfig.tabBarOptions,
      swipeEnabled = mergedConfig.swipeEnabled,
      animationEnabled = mergedConfig.animationEnabled,
      lazy = mergedConfig.lazy,
      tabsConfig = _objectWithoutProperties(mergedConfig, ['tabBarComponent', 'tabBarPosition', 'tabBarOptions', 'swipeEnabled', 'animationEnabled', 'lazy']);

  var router = (0, _TabRouter2.default)(routeConfigs, tabsConfig);

  var navigator = (0, _createNavigator2.default)(router, routeConfigs, config, _NavigatorTypes2.default.STACK)(function (props) {
    return _react2.default.createElement(_TabView2.default, _extends({}, props, {
      tabBarComponent: tabBarComponent,
      tabBarPosition: tabBarPosition,
      tabBarOptions: tabBarOptions,
      swipeEnabled: swipeEnabled,
      animationEnabled: animationEnabled,
      lazy: lazy
    }));
  });

  return (0, _createNavigationContainer2.default)(navigator, tabsConfig.containerOptions);
};

var Presets = {
  iOSBottomTabs: {
    tabBarComponent: _TabBarBottom2.default,
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    animationEnabled: false,
    lazy: false
  },
  AndroidTopTabs: {
    tabBarComponent: _TabBarTop2.default,
    tabBarPosition: 'top',
    swipeEnabled: true,
    animationEnabled: true,
    lazy: false
  }
};

/**
 * Use these to get Android-style top tabs even on iOS or vice versa.
 *
 * Example:
 * ```
 * const HomeScreenTabNavigator = TabNavigator({
 *  Chat: {
 *    screen: ChatScreen,
 *  },
 *  ...
 * }, {
 *  ...TabNavigator.Presets.AndroidTopTabs,
 *  tabBarOptions: {
 *    ...
 *  },
 * });
 *```
 */
TabNavigator.Presets = {
  iOSBottomTabs: Presets.iOSBottomTabs,
  AndroidTopTabs: Presets.AndroidTopTabs,
  Default: _reactNative.Platform.OS === 'ios' ? Presets.iOSBottomTabs : Presets.AndroidTopTabs
};

exports.default = TabNavigator;