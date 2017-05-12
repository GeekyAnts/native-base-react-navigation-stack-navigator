'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _invariant = require('fbjs/lib/invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _getScreenForRouteName = require('./getScreenForRouteName');

var _getScreenForRouteName2 = _interopRequireDefault(_getScreenForRouteName);

var _addNavigationHelpers = require('../addNavigationHelpers');

var _addNavigationHelpers2 = _interopRequireDefault(_addNavigationHelpers);

var _validateScreenOptions = require('./validateScreenOptions');

var _validateScreenOptions2 = _interopRequireDefault(_validateScreenOptions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var babelPluginFlowReactPropTypes_proptype_NavigationScreenConfigProps = require('../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationScreenConfigProps || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_NavigationScreenConfig = require('../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationScreenConfig || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_NavigationRouteConfigMap = require('../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationRouteConfigMap || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_NavigationStateRoute = require('../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationStateRoute || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_NavigationRoute = require('../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationRoute || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_NavigationAction = require('../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationAction || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_NavigationScreenProp = require('../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationScreenProp || require('react').PropTypes.any;

function applyConfig(configurer, navigationOptions, configProps) {
  if (typeof configurer === 'function') {
    return _extends({}, navigationOptions, configurer(_extends({}, configProps, {
      navigationOptions: navigationOptions
    })));
  }
  if ((typeof configurer === 'undefined' ? 'undefined' : _typeof(configurer)) === 'object') {
    return _extends({}, navigationOptions, configurer);
  }
  return navigationOptions;
}

exports.default = function (routeConfigs, navigatorScreenConfig) {
  return function (navigation, screenProps) {
    var state = navigation.state,
        dispatch = navigation.dispatch;

    var route = state;
    // $FlowFixMe
    var _ref = route,
        routes = _ref.routes,
        index = _ref.index;


    (0, _invariant2.default)(route.routeName && typeof route.routeName === 'string', 'Cannot get config because the route does not have a routeName.');

    var Component = (0, _getScreenForRouteName2.default)(routeConfigs, route.routeName);

    var outputConfig = {};

    if (Component.router) {
      (0, _invariant2.default)(route && routes && index != null, 'Expect nav state to have routes and index, ' + JSON.stringify(route));
      var childRoute = routes[index];
      var childNavigation = (0, _addNavigationHelpers2.default)({
        state: childRoute,
        dispatch: dispatch
      });
      outputConfig = Component.router.getScreenOptions(childNavigation, screenProps);
    }

    var routeConfig = routeConfigs[route.routeName];

    var routeScreenConfig = routeConfig.navigationOptions;
    var componentScreenConfig = Component.navigationOptions;

    var configOptions = { navigation: navigation, screenProps: screenProps || {} };

    outputConfig = applyConfig(navigatorScreenConfig, outputConfig, configOptions);
    outputConfig = applyConfig(componentScreenConfig, outputConfig, configOptions);
    outputConfig = applyConfig(routeScreenConfig, outputConfig, configOptions);

    (0, _validateScreenOptions2.default)(outputConfig, route);

    return outputConfig;
  };
};