// @flow

import { Component } from 'react';
import { NativeModules } from 'react-native';

const { ExponentKeepAwake } = NativeModules;

export default class KeepAwake extends Component {
  static activate = ExponentKeepAwake.activate;
  static deactivate = ExponentKeepAwake.deactivate;

  componentDidMount() {
    ExponentKeepAwake.activate();
  }

  componentWillUnmount() {
    ExponentKeepAwake.deactivate();
  }

  render() {
    return null;
  }
}
