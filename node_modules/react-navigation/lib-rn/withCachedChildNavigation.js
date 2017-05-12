import React, { PureComponent } from 'react';

import addNavigationHelpers from './addNavigationHelpers';

var babelPluginFlowReactPropTypes_proptype_NavigationAction = require('./TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationAction || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_NavigationScreenProp = require('./TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationScreenProp || require('react').PropTypes.any;

/**
 * HOC which caches the child navigation items.
 */
export default function withCachedChildNavigation(Comp) {
  return class extends PureComponent {
    static displayName = `withCachedChildNavigation(${Comp.displayName || Comp.name})`;

    componentWillMount() {
      this._updateNavigationProps(this.props.navigation);
    }

    componentWillReceiveProps(nextProps) {
      this._updateNavigationProps(nextProps.navigation);
    }

    _updateNavigationProps = navigation => {
      // Update props for each child route
      if (!this._childNavigationProps) {
        this._childNavigationProps = {};
      }
      navigation.state.routes.forEach(route => {
        const childNavigation = this._childNavigationProps[route.key];
        if (childNavigation && childNavigation.state === route) {
          return;
        }
        this._childNavigationProps[route.key] = addNavigationHelpers({
          ...navigation,
          state: route
        });
      });
    };

    render() {
      return <Comp {...this.props} childNavigationProps={this._childNavigationProps} />;
    }
  };
}