'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getScreenForRouteName;

var _invariant = require('fbjs/lib/invariant');

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Simple helper that gets a single screen (React component or navigator)
 * out of the navigator config.
 */
var babelPluginFlowReactPropTypes_proptype_NavigationRouteConfigMap = require('../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationRouteConfigMap || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_NavigationComponent = require('../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationComponent || require('react').PropTypes.any;

function getScreenForRouteName( // eslint-disable-line consistent-return
routeConfigs, routeName) {
  var routeConfig = routeConfigs[routeName];

  (0, _invariant2.default)(routeConfig, 'There is no route defined for key ' + routeName + '.\n' + ('Must be one of: ' + Object.keys(routeConfigs).map(function (a) {
    return '\'' + a + '\'';
  }).join(',')));

  if (routeConfig.screen) {
    return routeConfig.screen;
  }

  if (typeof routeConfig.getScreen === 'function') {
    var screen = routeConfig.getScreen();
    (0, _invariant2.default)(typeof screen === 'function', 'The getScreen defined for route \'' + routeName + ' didn\'t return a valid ' + 'screen or navigator.\n\n' + 'Please pass it like this:\n' + (routeName + ': {\n  getScreen: () => require(\'./MyScreen\').default\n}'));
    return screen;
  }

  (0, _invariant2.default)(false, 'Route ' + routeName + ' must define a screen or a getScreen.');
}