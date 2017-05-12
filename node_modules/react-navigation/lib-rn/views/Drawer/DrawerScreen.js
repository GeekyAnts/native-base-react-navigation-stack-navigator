import React, { PureComponent } from 'react';

import SceneView from '../SceneView';
import withCachedChildNavigation from '../../withCachedChildNavigation';

var babelPluginFlowReactPropTypes_proptype_NavigationDrawerScreenOptions = require('../../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationDrawerScreenOptions || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_NavigationRouter = require('../../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationRouter || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_NavigationAction = require('../../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationAction || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_NavigationRoute = require('../../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationRoute || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_NavigationState = require('../../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationState || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_NavigationScreenProp = require('../../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationScreenProp || require('react').PropTypes.any;

/**
 * Component that renders the child screen of the drawer.
 */
class DrawerScreen extends PureComponent {

  render() {
    const {
      router,
      navigation,
      childNavigationProps,
      screenProps
    } = this.props;
    const { routes, index } = navigation.state;
    const childNavigation = childNavigationProps[routes[index].key];
    const Content = router.getComponentForRouteName(routes[index].routeName);
    return <SceneView screenProps={screenProps} component={Content} navigation={childNavigation} />;
  }
}

DrawerScreen.propTypes = {
  screenProps: require('prop-types').shape({}),
  router: babelPluginFlowReactPropTypes_proptype_NavigationRouter,
  navigation: babelPluginFlowReactPropTypes_proptype_NavigationScreenProp,
  childNavigationProps: require('prop-types').shape({}).isRequired
};
DrawerScreen.propTypes = {
  screenProps: require('prop-types').shape({}),
  router: babelPluginFlowReactPropTypes_proptype_NavigationRouter,
  navigation: babelPluginFlowReactPropTypes_proptype_NavigationScreenProp,
  childNavigationProps: require('prop-types').shape({}).isRequired
};
export default withCachedChildNavigation(DrawerScreen);