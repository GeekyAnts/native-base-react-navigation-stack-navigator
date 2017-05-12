import React from 'react';
import createNavigationContainer from '../createNavigationContainer';
import createNavigator from './createNavigator';
import CardStackTransitioner from '../views/CardStackTransitioner';
import StackRouter from '../routers/StackRouter';
import NavigatorTypes from './NavigatorTypes';

var babelPluginFlowReactPropTypes_proptype_NavigationRouteConfigMap = require('../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationRouteConfigMap || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_NavigationStackViewConfig = require('../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationStackViewConfig || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_NavigationStackRouterConfig = require('../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationStackRouterConfig || require('react').PropTypes.any;

export default ((routeConfigMap, stackConfig = {}) => {
  const {
    initialRouteName,
    initialRouteParams,
    paths,
    headerMode,
    mode,
    cardStyle,
    transitionConfig,
    onTransitionStart,
    onTransitionEnd,
    navigationOptions
  } = stackConfig;
  const stackRouterConfig = {
    initialRouteName,
    initialRouteParams,
    paths,
    navigationOptions
  };

  const router = StackRouter(routeConfigMap, stackRouterConfig);

  const navigator = createNavigator(router, routeConfigMap, stackConfig, NavigatorTypes.STACK)(props => <CardStackTransitioner {...props} headerMode={headerMode} mode={mode} cardStyle={cardStyle} transitionConfig={transitionConfig} onTransitionStart={onTransitionStart} onTransitionEnd={onTransitionEnd} />);

  return createNavigationContainer(navigator, stackConfig.containerOptions);
});