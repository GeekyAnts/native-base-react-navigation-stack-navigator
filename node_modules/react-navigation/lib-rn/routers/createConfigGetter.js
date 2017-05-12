import invariant from 'fbjs/lib/invariant';

import getScreenForRouteName from './getScreenForRouteName';
import addNavigationHelpers from '../addNavigationHelpers';
import validateScreenOptions from './validateScreenOptions';

var babelPluginFlowReactPropTypes_proptype_NavigationScreenConfigProps = require('../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationScreenConfigProps || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_NavigationScreenConfig = require('../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationScreenConfig || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_NavigationRouteConfigMap = require('../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationRouteConfigMap || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_NavigationStateRoute = require('../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationStateRoute || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_NavigationRoute = require('../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationRoute || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_NavigationAction = require('../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationAction || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_NavigationScreenProp = require('../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationScreenProp || require('react').PropTypes.any;

function applyConfig(configurer, navigationOptions, configProps) {
  if (typeof configurer === 'function') {
    return {
      ...navigationOptions,
      ...configurer({
        ...configProps,
        navigationOptions
      })
    };
  }
  if (typeof configurer === 'object') {
    return {
      ...navigationOptions,
      ...configurer
    };
  }
  return navigationOptions;
}

export default ((routeConfigs, navigatorScreenConfig) => (navigation, screenProps) => {
  const { state, dispatch } = navigation;
  const route = state;
  // $FlowFixMe
  const { routes, index } = route;

  invariant(route.routeName && typeof route.routeName === 'string', 'Cannot get config because the route does not have a routeName.');

  const Component = getScreenForRouteName(routeConfigs, route.routeName);

  let outputConfig = {};

  if (Component.router) {
    invariant(route && routes && index != null, `Expect nav state to have routes and index, ${JSON.stringify(route)}`);
    const childRoute = routes[index];
    const childNavigation = addNavigationHelpers({
      state: childRoute,
      dispatch
    });
    outputConfig = Component.router.getScreenOptions(childNavigation, screenProps);
  }

  const routeConfig = routeConfigs[route.routeName];

  const routeScreenConfig = routeConfig.navigationOptions;
  const componentScreenConfig = Component.navigationOptions;

  const configOptions = { navigation, screenProps: screenProps || {} };

  outputConfig = applyConfig(navigatorScreenConfig, outputConfig, configOptions);
  outputConfig = applyConfig(componentScreenConfig, outputConfig, configOptions);
  outputConfig = applyConfig(routeScreenConfig, outputConfig, configOptions);

  validateScreenOptions(outputConfig, route);

  return outputConfig;
});