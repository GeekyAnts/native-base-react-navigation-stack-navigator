import invariant from 'fbjs/lib/invariant';

/**
 * Simple helper that gets a single screen (React component or navigator)
 * out of the navigator config.
 */
var babelPluginFlowReactPropTypes_proptype_NavigationRouteConfigMap = require('../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationRouteConfigMap || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_NavigationComponent = require('../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationComponent || require('react').PropTypes.any;

export default function getScreenForRouteName( // eslint-disable-line consistent-return
routeConfigs, routeName) {
  const routeConfig = routeConfigs[routeName];

  invariant(routeConfig, `There is no route defined for key ${routeName}.\n` + `Must be one of: ${Object.keys(routeConfigs).map(a => `'${a}'`).join(',')}`);

  if (routeConfig.screen) {
    return routeConfig.screen;
  }

  if (typeof routeConfig.getScreen === 'function') {
    const screen = routeConfig.getScreen();
    invariant(typeof screen === 'function', `The getScreen defined for route '${routeName} didn't return a valid ` + 'screen or navigator.\n\n' + 'Please pass it like this:\n' + `${routeName}: {\n  getScreen: () => require('./MyScreen').default\n}`);
    return screen;
  }

  invariant(false, `Route ${routeName} must define a screen or a getScreen.`);
}