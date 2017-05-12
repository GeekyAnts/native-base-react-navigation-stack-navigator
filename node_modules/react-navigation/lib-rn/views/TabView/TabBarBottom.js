import React, { PureComponent } from 'react';
import { Animated, View, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import TabBarIcon from './TabBarIcon';

var babelPluginFlowReactPropTypes_proptype_Style = require('../../TypeDefinition').babelPluginFlowReactPropTypes_proptype_Style || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_NavigationScreenProp = require('../../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationScreenProp || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_NavigationState = require('../../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationState || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_NavigationRoute = require('../../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationRoute || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_NavigationAction = require('../../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationAction || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_TabScene = require('./TabView').babelPluginFlowReactPropTypes_proptype_TabScene || require('react').PropTypes.any;

export default class TabBarBottom extends PureComponent {
  // See https://developer.apple.com/library/content/documentation/UserExperience/Conceptual/UIKitUICatalog/UITabBar.html
  static defaultProps = {
    activeTintColor: '#3478f6', // Default active tint color in iOS 10
    activeBackgroundColor: 'transparent',
    inactiveTintColor: '#929292', // Default inactive tint color in iOS 10
    inactiveBackgroundColor: 'transparent',
    showLabel: true,
    showIcon: true
  };

  _renderLabel = scene => {
    const {
      position,
      navigation,
      activeTintColor,
      inactiveTintColor,
      labelStyle,
      showLabel
    } = this.props;
    if (showLabel === false) {
      return null;
    }
    const { index } = scene;
    const { routes } = navigation.state;
    // Prepend '-1', so there are always at least 2 items in inputRange
    const inputRange = [-1, ...routes.map((x, i) => i)];
    const outputRange = inputRange.map(inputIndex => inputIndex === index ? activeTintColor : inactiveTintColor);
    const color = position.interpolate({
      inputRange,
      outputRange
    });

    const label = this.props.getLabel(scene);
    if (typeof label === 'string') {
      return <Animated.Text style={[styles.label, { color }, labelStyle]}>
          {label}
        </Animated.Text>;
    }
    if (typeof label === 'function') {
      return label(scene);
    }

    return label;
  };

  _renderIcon = scene => {
    const {
      position,
      navigation,
      activeTintColor,
      inactiveTintColor,
      renderIcon,
      showIcon
    } = this.props;
    if (showIcon === false) {
      return null;
    }
    return <TabBarIcon position={position} navigation={navigation} activeTintColor={activeTintColor} inactiveTintColor={inactiveTintColor} renderIcon={renderIcon} scene={scene} style={styles.icon} />;
  };

  render() {
    const {
      position,
      navigation,
      jumpToIndex,
      activeBackgroundColor,
      inactiveBackgroundColor,
      style
    } = this.props;
    const { routes } = navigation.state;
    // Prepend '-1', so there are always at least 2 items in inputRange
    const inputRange = [-1, ...routes.map((x, i) => i)];
    return <View style={[styles.tabBar, style]}>
        {routes.map((route, index) => {
        const focused = index === navigation.state.index;
        const scene = { route, index, focused };
        const outputRange = inputRange.map(inputIndex => inputIndex === index ? activeBackgroundColor : inactiveBackgroundColor);
        const backgroundColor = position.interpolate({
          inputRange,
          outputRange
        });
        const justifyContent = this.props.showIcon ? 'flex-end' : 'center';
        return <TouchableWithoutFeedback key={route.key} onPress={() => jumpToIndex(index)}>
              <Animated.View style={[styles.tab, { backgroundColor, justifyContent }]}>
                {this._renderIcon(scene)}
                {this._renderLabel(scene)}
              </Animated.View>
            </TouchableWithoutFeedback>;
      })}
      </View>;
  }
}

TabBarBottom.propTypes = {
  activeTintColor: require('prop-types').string.isRequired,
  activeBackgroundColor: require('prop-types').string.isRequired,
  inactiveTintColor: require('prop-types').string.isRequired,
  inactiveBackgroundColor: require('prop-types').string.isRequired,
  position: require('prop-types').any.isRequired,
  navigation: babelPluginFlowReactPropTypes_proptype_NavigationScreenProp,
  jumpToIndex: require('prop-types').func.isRequired,
  getLabel: require('prop-types').func.isRequired,
  renderIcon: require('prop-types').func.isRequired,
  showLabel: require('prop-types').bool.isRequired,
  style: babelPluginFlowReactPropTypes_proptype_Style,
  labelStyle: babelPluginFlowReactPropTypes_proptype_Style,
  showIcon: require('prop-types').bool.isRequired
};
TabBarBottom.propTypes = {
  activeTintColor: require('prop-types').string.isRequired,
  activeBackgroundColor: require('prop-types').string.isRequired,
  inactiveTintColor: require('prop-types').string.isRequired,
  inactiveBackgroundColor: require('prop-types').string.isRequired,
  position: require('prop-types').any.isRequired,
  navigation: babelPluginFlowReactPropTypes_proptype_NavigationScreenProp,
  jumpToIndex: require('prop-types').func.isRequired,
  getLabel: require('prop-types').func.isRequired,
  renderIcon: require('prop-types').func.isRequired,
  showLabel: require('prop-types').bool.isRequired,
  style: babelPluginFlowReactPropTypes_proptype_Style,
  labelStyle: babelPluginFlowReactPropTypes_proptype_Style,
  showIcon: require('prop-types').bool.isRequired
};
const styles = StyleSheet.create({
  tabBar: {
    height: 49, // Default tab bar height in iOS 10
    flexDirection: 'row',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(0, 0, 0, .2)',
    backgroundColor: '#f4f4f4' },
  tab: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-end'
  },
  icon: {
    flexGrow: 1
  },
  label: {
    textAlign: 'center',
    fontSize: 10,
    marginBottom: 1.5,
    backgroundColor: 'transparent'
  }
});