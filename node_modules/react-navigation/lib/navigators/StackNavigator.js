'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _createNavigationContainer = require('../createNavigationContainer');

var _createNavigationContainer2 = _interopRequireDefault(_createNavigationContainer);

var _createNavigator = require('./createNavigator');

var _createNavigator2 = _interopRequireDefault(_createNavigator);

var _CardStackTransitioner = require('../views/CardStackTransitioner');

var _CardStackTransitioner2 = _interopRequireDefault(_CardStackTransitioner);

var _StackRouter = require('../routers/StackRouter');

var _StackRouter2 = _interopRequireDefault(_StackRouter);

var _NavigatorTypes = require('./NavigatorTypes');

var _NavigatorTypes2 = _interopRequireDefault(_NavigatorTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var babelPluginFlowReactPropTypes_proptype_NavigationRouteConfigMap = require('../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationRouteConfigMap || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_NavigationStackViewConfig = require('../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationStackViewConfig || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_NavigationStackRouterConfig = require('../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationStackRouterConfig || require('react').PropTypes.any;

exports.default = function (routeConfigMap) {
  var stackConfig = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var initialRouteName = stackConfig.initialRouteName,
      initialRouteParams = stackConfig.initialRouteParams,
      paths = stackConfig.paths,
      headerMode = stackConfig.headerMode,
      mode = stackConfig.mode,
      cardStyle = stackConfig.cardStyle,
      transitionConfig = stackConfig.transitionConfig,
      onTransitionStart = stackConfig.onTransitionStart,
      onTransitionEnd = stackConfig.onTransitionEnd,
      navigationOptions = stackConfig.navigationOptions;

  var stackRouterConfig = {
    initialRouteName: initialRouteName,
    initialRouteParams: initialRouteParams,
    paths: paths,
    navigationOptions: navigationOptions
  };

  var router = (0, _StackRouter2.default)(routeConfigMap, stackRouterConfig);

  var navigator = (0, _createNavigator2.default)(router, routeConfigMap, stackConfig, _NavigatorTypes2.default.STACK)(function (props) {
    return _react2.default.createElement(_CardStackTransitioner2.default, _extends({}, props, {
      headerMode: headerMode,
      mode: mode,
      cardStyle: cardStyle,
      transitionConfig: transitionConfig,
      onTransitionStart: onTransitionStart,
      onTransitionEnd: onTransitionEnd
    }));
  });

  return (0, _createNavigationContainer2.default)(navigator, stackConfig.containerOptions);
};