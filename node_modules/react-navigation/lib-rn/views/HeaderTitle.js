import React from 'react';

import { Platform, StyleSheet, Text } from 'react-native';

var babelPluginFlowReactPropTypes_proptype_Style = require('../TypeDefinition').babelPluginFlowReactPropTypes_proptype_Style || require('react').PropTypes.any;

const HeaderTitle = ({ style, ...rest }) => <Text numberOfLines={1} {...rest} style={[styles.title, style]} accessibilityTraits="header" />;

HeaderTitle.propTypes = {
  tintColor: require('prop-types').string,
  style: babelPluginFlowReactPropTypes_proptype_Style
};
const styles = StyleSheet.create({
  title: {
    fontSize: Platform.OS === 'ios' ? 17 : 18,
    fontWeight: Platform.OS === 'ios' ? '600' : '500',
    color: 'rgba(0, 0, 0, .9)',
    textAlign: Platform.OS === 'ios' ? 'center' : 'left',
    marginHorizontal: 16
  }
});

export default HeaderTitle;