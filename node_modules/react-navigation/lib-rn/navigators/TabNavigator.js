import React from 'react';
import { Platform } from 'react-native';

import createNavigator from './createNavigator';
import createNavigationContainer from '../createNavigationContainer';
import TabRouter from '../routers/TabRouter';
import TabView from '../views/TabView/TabView';
import TabBarTop from '../views/TabView/TabBarTop';
import TabBarBottom from '../views/TabView/TabBarBottom';

import NavigatorTypes from './NavigatorTypes';

var babelPluginFlowReactPropTypes_proptype_TabViewConfig = require('../views/TabView/TabView').babelPluginFlowReactPropTypes_proptype_TabViewConfig || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_NavigationTabRouterConfig = require('../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationTabRouterConfig || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_NavigationRouteConfigMap = require('../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationRouteConfigMap || require('react').PropTypes.any;

const TabNavigator = (routeConfigs, config = {}) => {
  // Use the look native to the platform by default
  const mergedConfig = { ...TabNavigator.Presets.Default, ...config };
  const {
    tabBarComponent,
    tabBarPosition,
    tabBarOptions,
    swipeEnabled,
    animationEnabled,
    lazy,
    ...tabsConfig
  } = mergedConfig;

  const router = TabRouter(routeConfigs, tabsConfig);

  const navigator = createNavigator(router, routeConfigs, config, NavigatorTypes.STACK)(props => <TabView {...props} tabBarComponent={tabBarComponent} tabBarPosition={tabBarPosition} tabBarOptions={tabBarOptions} swipeEnabled={swipeEnabled} animationEnabled={animationEnabled} lazy={lazy} />);

  return createNavigationContainer(navigator, tabsConfig.containerOptions);
};

const Presets = {
  iOSBottomTabs: {
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    animationEnabled: false,
    lazy: false
  },
  AndroidTopTabs: {
    tabBarComponent: TabBarTop,
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
  Default: Platform.OS === 'ios' ? Presets.iOSBottomTabs : Presets.AndroidTopTabs
};

export default TabNavigator;