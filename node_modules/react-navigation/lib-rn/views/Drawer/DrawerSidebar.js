import React, { PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';

import withCachedChildNavigation from '../../withCachedChildNavigation';

var babelPluginFlowReactPropTypes_proptype_Style = require('../../TypeDefinition').babelPluginFlowReactPropTypes_proptype_Style || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_NavigationState = require('../../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationState || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_NavigationDrawerScreenOptions = require('../../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationDrawerScreenOptions || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_NavigationRouter = require('../../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationRouter || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_NavigationAction = require('../../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationAction || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_NavigationRoute = require('../../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationRoute || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_NavigationScreenProp = require('../../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationScreenProp || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_DrawerScene = require('./DrawerView').babelPluginFlowReactPropTypes_proptype_DrawerScene || require('react').PropTypes.any;

/**
 * Component that renders the sidebar screen of the drawer.
 */
class DrawerSidebar extends PureComponent {

  _getScreenOptions = routeKey => {
    const DrawerScreen = this.props.router.getComponentForRouteName('DrawerClose');
    return DrawerScreen.router.getScreenOptions(this.props.childNavigationProps[routeKey], this.props.screenProps);
  };

  _getLabel = ({ focused, tintColor, route }) => {
    const { drawerLabel, title } = this._getScreenOptions(route.key);
    if (drawerLabel) {
      return typeof drawerLabel === 'function' ? drawerLabel({ tintColor, focused }) : drawerLabel;
    }

    if (typeof title === 'string') {
      return title;
    }

    return route.routeName;
  };

  _renderIcon = ({ focused, tintColor, route }) => {
    const { drawerIcon } = this._getScreenOptions(route.key);
    if (drawerIcon) {
      return typeof drawerIcon === 'function' ? drawerIcon({ tintColor, focused }) : drawerIcon;
    }
    return null;
  };

  render() {
    const ContentComponent = this.props.contentComponent;
    return <View style={[styles.container, this.props.style]}>
        <ContentComponent {...this.props.contentOptions} navigation={this.props.navigation} getLabel={this._getLabel} renderIcon={this._renderIcon} router={this.props.router} />
      </View>;
  }
}

DrawerSidebar.propTypes = {
  router: babelPluginFlowReactPropTypes_proptype_NavigationRouter,
  navigation: babelPluginFlowReactPropTypes_proptype_NavigationScreenProp,
  childNavigationProps: require('prop-types').shape({}).isRequired,
  contentComponent: require('prop-types').any.isRequired,
  contentOptions: require('prop-types').shape({}),
  screenProps: require('prop-types').shape({}),
  style: babelPluginFlowReactPropTypes_proptype_Style
};
DrawerSidebar.propTypes = {
  router: babelPluginFlowReactPropTypes_proptype_NavigationRouter,
  navigation: babelPluginFlowReactPropTypes_proptype_NavigationScreenProp,
  childNavigationProps: require('prop-types').shape({}).isRequired,
  contentComponent: require('prop-types').any.isRequired,
  contentOptions: require('prop-types').shape({}),
  screenProps: require('prop-types').shape({}),
  style: babelPluginFlowReactPropTypes_proptype_Style
};
export default withCachedChildNavigation(DrawerSidebar);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});