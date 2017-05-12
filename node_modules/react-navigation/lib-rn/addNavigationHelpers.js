var babelPluginFlowReactPropTypes_proptype_NavigationParams = require('./TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationParams || require('react').PropTypes.any; /**
                                                                                                                                                                                      * 
                                                                                                                                                                                      *
                                                                                                                                                                                      * Helpers for navigation.
                                                                                                                                                                                      */

var babelPluginFlowReactPropTypes_proptype_NavigationProp = require('./TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationProp || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_NavigationAction = require('./TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationAction || require('react').PropTypes.any;

import NavigationActions from './NavigationActions';

export default function (navigation) {
  return {
    ...navigation,
    goBack: key => navigation.dispatch(NavigationActions.back({
      key: key === undefined ? navigation.state.key : key
    })),
    navigate: (routeName, params, action) => navigation.dispatch(NavigationActions.navigate({
      routeName,
      params,
      action
    })),
    /**
     * For updating current route params. For example the nav bar title and
     * buttons are based on the route params.
     * This means `setParams` can be used to update nav bar for example.
     */
    setParams: params => navigation.dispatch(NavigationActions.setParams({
      params,
      key: navigation.state.key
    }))
  };
}