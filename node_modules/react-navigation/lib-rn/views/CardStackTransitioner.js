import React, { Component } from 'react';
import { NativeModules } from 'react-native';

import CardStack from './CardStack';
import CardStackStyleInterpolator from './CardStackStyleInterpolator';
import Transitioner from './Transitioner';
import TransitionConfigs from './TransitionConfigs';

var babelPluginFlowReactPropTypes_proptype_TransitionConfig = require('../TypeDefinition').babelPluginFlowReactPropTypes_proptype_TransitionConfig || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_Style = require('../TypeDefinition').babelPluginFlowReactPropTypes_proptype_Style || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_HeaderMode = require('../TypeDefinition').babelPluginFlowReactPropTypes_proptype_HeaderMode || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_NavigationRouter = require('../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationRouter || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_NavigationTransitionProps = require('../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationTransitionProps || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_NavigationState = require('../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationState || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_NavigationStackScreenOptions = require('../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationStackScreenOptions || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_NavigationScreenProp = require('../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationScreenProp || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_NavigationSceneRenderer = require('../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationSceneRenderer || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_NavigationAction = require('../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationAction || require('react').PropTypes.any;

const NativeAnimatedModule = NativeModules && NativeModules.NativeAnimatedModule;

class CardStackTransitioner extends Component {

  static defaultProps = {
    mode: 'card'
  };

  render() {
    return <Transitioner configureTransition={this._configureTransition} navigation={this.props.navigation} render={this._render} style={this.props.style} onTransitionStart={this.props.onTransitionStart} onTransitionEnd={this.props.onTransitionEnd} />;
  }

  _configureTransition = (
  // props for the new screen
  transitionProps, prevTransitionProps) => {
    const isModal = this.props.mode === 'modal';
    // Copy the object so we can assign useNativeDriver below
    // (avoid Flow error, transitionSpec is of type NavigationTransitionSpec).
    const transitionSpec = {
      ...TransitionConfigs.getTransitionConfig(this.props.transitionConfig, transitionProps, prevTransitionProps, isModal).transitionSpec
    };
    if (!!NativeAnimatedModule &&
    // Native animation support also depends on the transforms used:
    CardStackStyleInterpolator.canUseNativeDriver(isModal)) {
      // Internal undocumented prop
      transitionSpec.useNativeDriver = true;
    }
    return transitionSpec;
  };

  _render = props => {
    const {
      screenProps,
      headerMode,
      mode,
      router,
      cardStyle,
      transitionConfig,
      style
    } = this.props;
    return <CardStack screenProps={screenProps} headerMode={headerMode} mode={mode} router={router} cardStyle={cardStyle} transitionConfig={transitionConfig} style={style} {...props} />;
  };
}

CardStackTransitioner.propTypes = {
  screenProps: require('prop-types').shape({}),
  headerMode: babelPluginFlowReactPropTypes_proptype_HeaderMode,
  mode: require('prop-types').oneOf(['card', 'modal']).isRequired,
  navigation: babelPluginFlowReactPropTypes_proptype_NavigationScreenProp,
  router: babelPluginFlowReactPropTypes_proptype_NavigationRouter,
  cardStyle: babelPluginFlowReactPropTypes_proptype_Style,
  onTransitionStart: require('prop-types').func,
  onTransitionEnd: require('prop-types').func,
  style: babelPluginFlowReactPropTypes_proptype_Style,
  transitionConfig: require('prop-types').func
};
export default CardStackTransitioner;