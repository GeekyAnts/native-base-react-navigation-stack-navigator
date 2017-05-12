import React, { PureComponent } from 'react';
import { Animated, View, StyleSheet } from 'react-native';

var babelPluginFlowReactPropTypes_proptype_Style = require('../../TypeDefinition').babelPluginFlowReactPropTypes_proptype_Style || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_NavigationScreenProp = require('../../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationScreenProp || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_NavigationState = require('../../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationState || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_NavigationAction = require('../../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationAction || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_TabScene = require('./TabView').babelPluginFlowReactPropTypes_proptype_TabScene || require('react').PropTypes.any;

export default class TabBarIcon extends PureComponent {

  render() {
    const {
      position,
      scene,
      navigation,
      activeTintColor,
      inactiveTintColor,
      style
    } = this.props;
    const { route, index } = scene;
    const { routes } = navigation.state;
    // Prepend '-1', so there are always at least 2 items in inputRange
    const inputRange = [-1, ...routes.map((x, i) => i)];
    const activeOpacity = position.interpolate({
      inputRange,
      outputRange: inputRange.map(i => i === index ? 1 : 0)
    });
    const inactiveOpacity = position.interpolate({
      inputRange,
      outputRange: inputRange.map(i => i === index ? 0 : 1)
    });
    // We render the icon twice at the same position on top of each other:
    // active and inactive one, so we can fade between them.
    return <View style={style}>
        <Animated.View style={[styles.icon, { opacity: activeOpacity }]}>
          {this.props.renderIcon({
          route,
          index,
          focused: true,
          tintColor: activeTintColor
        })}
        </Animated.View>
        <Animated.View style={[styles.icon, { opacity: inactiveOpacity }]}>
          {this.props.renderIcon({
          route,
          index,
          focused: false,
          tintColor: inactiveTintColor
        })}
        </Animated.View>
      </View>;
  }
}

TabBarIcon.propTypes = {
  activeTintColor: require('prop-types').string.isRequired,
  inactiveTintColor: require('prop-types').string.isRequired,
  scene: babelPluginFlowReactPropTypes_proptype_TabScene,
  position: require('prop-types').any.isRequired,
  navigation: babelPluginFlowReactPropTypes_proptype_NavigationScreenProp,
  renderIcon: require('prop-types').func.isRequired,
  style: babelPluginFlowReactPropTypes_proptype_Style
};
TabBarIcon.propTypes = {
  activeTintColor: require('prop-types').string.isRequired,
  inactiveTintColor: require('prop-types').string.isRequired,
  scene: babelPluginFlowReactPropTypes_proptype_TabScene,
  position: require('prop-types').any.isRequired,
  navigation: babelPluginFlowReactPropTypes_proptype_NavigationScreenProp,
  renderIcon: require('prop-types').func.isRequired,
  style: babelPluginFlowReactPropTypes_proptype_Style
};
const styles = StyleSheet.create({
  icon: {
    // We render the icon twice at the same position on top of each other:
    // active and inactive one, so we can fade between them:
    // Cover the whole iconContainer:
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
});