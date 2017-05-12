import React from 'react';
import invariant from 'fbjs/lib/invariant';
import { BackAndroid, Linking } from './PlatformHelpers';
import NavigationActions from './NavigationActions';
import addNavigationHelpers from './addNavigationHelpers';

var babelPluginFlowReactPropTypes_proptype_NavigationNavigatorProps = require('./TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationNavigatorProps || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_NavigationScreenProp = require('./TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationScreenProp || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_NavigationState = require('./TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationState || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_NavigationAction = require('./TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationAction || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_NavigationRoute = require('./TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationRoute || require('react').PropTypes.any;

/**
 * Create an HOC that injects the navigation and manages the navigation state
 * in case it's not passed from above.
 * This allows to use e.g. the StackNavigator and TabNavigator as root-level
 * components.
 */
export default function createNavigationContainer(Component, containerOptions) {
  invariant(typeof containerOptions === 'undefined', 'containerOptions.URIPrefix has been removed. Pass the uriPrefix prop to the navigator instead');

  class NavigationContainer extends React.Component {

    subs = null;

    static router = Component.router;

    constructor(props) {
      super(props);

      this._validateProps(props);

      this.state = {
        nav: this._isStateful() ? Component.router.getStateForAction(NavigationActions.init()) : null
      };
    }

    _isStateful() {
      return !this.props.navigation;
    }

    _validateProps(props) {
      if (this._isStateful()) {
        return;
      }

      const {
        navigation,
        screenProps,
        ...containerProps
      } = props;

      const keys = Object.keys(containerProps);

      invariant(keys.length === 0, 'This navigator has both navigation and container props, so it is ' + `unclear if it should own its own state. Remove props: "${keys.join(', ')}" ` + 'if the navigator should get its state from the navigation prop. If the ' + 'navigator should maintain its own state, do not pass a navigation prop.');
    }

    _urlToPathAndParams(url) {
      const params = {};
      const delimiter = this.props.uriPrefix || '://';
      let path = url.split(delimiter)[1];
      if (!path) {
        path = url;
      }
      return {
        path,
        params
      };
    }

    _handleOpenURL = url => {
      const parsedUrl = this._urlToPathAndParams(url);
      if (parsedUrl) {
        const { path, params } = parsedUrl;
        const action = Component.router.getActionForPathAndParams(path, params);
        if (action) {
          this.dispatch(action);
        }
      }
    };

    _onNavigationStateChange(prevNav, nav, action) {
      if (typeof this.props.onNavigationStateChange === 'undefined' && this._isStateful()) {
        /* eslint-disable no-console */
        if (console.group) {
          console.group('Navigation Dispatch: ');
          console.log('Action: ', action);
          console.log('New State: ', nav);
          console.log('Last State: ', prevNav);
          console.groupEnd();
        } else {
          console.log('Navigation Dispatch: ', {
            action,
            newState: nav,
            lastState: prevNav
          });
        }
        /* eslint-enable no-console */
        return;
      }

      if (typeof this.props.onNavigationStateChange === 'function') {
        this.props.onNavigationStateChange(prevNav, nav, action);
      }
    }

    componentWillReceiveProps(nextProps) {
      this._validateProps(nextProps);
    }

    componentDidMount() {
      if (!this._isStateful()) {
        return;
      }

      this.subs = BackAndroid.addEventListener('backPress', () => this.dispatch(NavigationActions.back()));

      Linking.addEventListener('url', ({ url }) => {
        this._handleOpenURL(url);
      });

      Linking.getInitialURL().then(url => url && this._handleOpenURL(url));
    }

    componentWillUnmount() {
      Linking.removeEventListener('url', this._handleOpenURL);
      this.subs && this.subs.remove();
    }

    dispatch = action => {
      const { state } = this;
      if (!this._isStateful()) {
        return false;
      }
      const nav = Component.router.getStateForAction(action, state.nav);
      if (nav && nav !== state.nav) {
        this.setState({ nav }, () => this._onNavigationStateChange(state.nav, nav, action));
        return true;
      }
      return false;
    };

    render() {
      let navigation = this.props.navigation;
      if (this._isStateful()) {
        if (!this._navigation || this._navigation.state !== this.state.nav) {
          this._navigation = addNavigationHelpers({
            dispatch: this.dispatch,
            state: this.state.nav
          });
        }
        navigation = this._navigation;
      }
      return <Component {...this.props} navigation={navigation} />;
    }
  }

  return NavigationContainer;
}