'use strict';

import React from 'react';

import {
  NativeModules,
  requireNativeComponent,
} from 'react-native';

const NativeAppLoading = requireNativeComponent('ExponentAppLoading', null);

export default class AppLoading extends React.Component {
  componentWillUnmount() {
    NativeModules.ExponentAppLoadingManager.finishedAsync();
  }

  render() {
    return <NativeAppLoading />;
  }
}
