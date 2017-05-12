import React, { PureComponent } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { TabBar } from 'react-native-tab-view';
import TabBarIcon from './TabBarIcon';

var babelPluginFlowReactPropTypes_proptype_Style = require('../../TypeDefinition').babelPluginFlowReactPropTypes_proptype_Style || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_NavigationState = require('../../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationState || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_NavigationScreenProp = require('../../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationScreenProp || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_NavigationAction = require('../../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationAction || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_TabScene = require('./TabView').babelPluginFlowReactPropTypes_proptype_TabScene || require('react').PropTypes.any;

export default class TabBarTop extends PureComponent {
  static defaultProps = {
    activeTintColor: '#fff',
    inactiveTintColor: '#fff',
    showIcon: false,
    showLabel: true,
    upperCaseLabel: true
  };

  _renderLabel = scene => {
    const {
      position,
      navigation,
      activeTintColor,
      inactiveTintColor,
      showLabel,
      upperCaseLabel,
      labelStyle
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
          {upperCaseLabel ? label.toUpperCase() : label}
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
      showIcon,
      iconStyle
    } = this.props;
    if (showIcon === false) {
      return null;
    }
    return <TabBarIcon position={position} navigation={navigation} activeTintColor={activeTintColor} inactiveTintColor={inactiveTintColor} renderIcon={renderIcon} scene={scene} style={[styles.icon, iconStyle]} />;
  };

  render() {
    // TODO: Define full proptypes
    const props = this.props;

    return <TabBar {...props} renderIcon={this._renderIcon} renderLabel={this._renderLabel} />;
  }
}

TabBarTop.propTypes = {
  activeTintColor: require('prop-types').string.isRequired,
  inactiveTintColor: require('prop-types').string.isRequired,
  showIcon: require('prop-types').bool.isRequired,
  showLabel: require('prop-types').bool.isRequired,
  upperCaseLabel: require('prop-types').bool.isRequired,
  position: require('prop-types').any.isRequired,
  navigation: babelPluginFlowReactPropTypes_proptype_NavigationScreenProp,
  getLabel: require('prop-types').func.isRequired,
  renderIcon: require('prop-types').func.isRequired,
  labelStyle: babelPluginFlowReactPropTypes_proptype_Style,
  iconStyle: babelPluginFlowReactPropTypes_proptype_Style
};
TabBarTop.propTypes = {
  activeTintColor: require('prop-types').string.isRequired,
  inactiveTintColor: require('prop-types').string.isRequired,
  showIcon: require('prop-types').bool.isRequired,
  showLabel: require('prop-types').bool.isRequired,
  upperCaseLabel: require('prop-types').bool.isRequired,
  position: require('prop-types').any.isRequired,
  navigation: babelPluginFlowReactPropTypes_proptype_NavigationScreenProp,
  getLabel: require('prop-types').func.isRequired,
  renderIcon: require('prop-types').func.isRequired,
  labelStyle: babelPluginFlowReactPropTypes_proptype_Style,
  iconStyle: babelPluginFlowReactPropTypes_proptype_Style
};
const styles = StyleSheet.create({
  icon: {
    height: 24,
    width: 24
  },
  label: {
    textAlign: 'center',
    fontSize: 13,
    margin: 8,
    backgroundColor: 'transparent'
  }
});