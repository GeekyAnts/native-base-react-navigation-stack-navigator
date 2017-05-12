'use strict';

import React, {
  Component,
  PropTypes,
} from 'react';

import {
  View,
  requireNativeComponent,
 } from 'react-native';

import deprecatedPropType from 'react-native/Libraries/Utilities/deprecatedPropType';

export default class BlurView extends Component {
  static propTypes = {
    tintEffect: deprecatedPropType(
      PropTypes.string,
      'Use the `tint` prop instead.'
    ),
    tint: PropTypes.oneOf(['light', 'default', 'dark']).isRequired,
    intensity: PropTypes.number.isRequired,
    ...View.propTypes,
  };

  static defaultProps = {
    tint: 'default',
    intensity: 50,
  }

  render() {
    let { style, ...nativeProps } = this.props;

    if (nativeProps.tintEffect) {
      nativeProps.tint = nativeProps.tintEffect;
      delete nativeProps.tintEffect;
    }

    return (
      <NativeBlurView
        {...nativeProps}
        style={[this.props.style, { backgroundColor: 'transparent' }]}
      />
    );
  }
}

const NativeBlurView = requireNativeComponent('ExponentBlurView', null);
