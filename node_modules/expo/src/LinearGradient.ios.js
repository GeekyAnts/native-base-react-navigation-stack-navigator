'use strict';

import React, {
  Component,
  PropTypes,
} from 'react';

import {
  View,
  processColor,
  requireNativeComponent,
} from 'react-native';

export default class LinearGradient extends Component {
  static propTypes = {
    start: PropTypes.arrayOf(PropTypes.number),
    end: PropTypes.arrayOf(PropTypes.number),
    colors: PropTypes.arrayOf(PropTypes.string).isRequired,
    locations: PropTypes.arrayOf(PropTypes.number),
    ...View.propTypes,
  };

  render() {
    const {
      colors,
      locations,
      ...otherProps,
    } = this.props;
    if ((colors && locations) && (colors.length !== locations.length)) {
      console.warn('LinearGradient colors and locations props should be arrays of the same length');
    }

    return (
      <NativeLinearGradient
        {...otherProps}
        colors={colors.map(processColor)}
        locations={locations ? locations.slice(0, colors.length) : null}
      />
    );
  }
}

const NativeLinearGradient = requireNativeComponent('ExponentLinearGradient', null);
