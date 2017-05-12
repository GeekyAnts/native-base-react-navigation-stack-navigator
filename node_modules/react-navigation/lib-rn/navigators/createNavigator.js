import React from 'react';

var babelPluginFlowReactPropTypes_proptype_NavigationRouteConfigMap = require('../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationRouteConfigMap || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_NavigationNavigatorProps = require('../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationNavigatorProps || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_NavigationNavigator = require('../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationNavigator || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_NavigationRouter = require('../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationRouter || require('react').PropTypes.any;

/**
 * Creates a navigator based on a router and a view that renders the screens.
 */
var babelPluginFlowReactPropTypes_proptype_NavigatorType = require('./NavigatorTypes').babelPluginFlowReactPropTypes_proptype_NavigatorType || require('react').PropTypes.any;

const createNavigator = (router, routeConfigs, navigatorConfig, navigatorType) => View => {
  class Navigator extends React.Component {

    static router = router;

    static routeConfigs = routeConfigs;
    static navigatorConfig = navigatorConfig;
    static navigatorType = navigatorType;

    render() {
      return <View {...this.props} router={router} />;
    }
  }

  return Navigator;
};

export default createNavigator;