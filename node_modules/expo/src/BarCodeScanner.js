import React, { PropTypes } from 'react';
import {
  NativeModules,
  Platform,
  StyleSheet,
  requireNativeComponent,
  View,
} from 'react-native';

const BarCodeScannerManager = (
  NativeModules.ExponentBarCodeScannerManager ||
  NativeModules.ExponentBarCodeScannerModule
);

function convertNativeProps(props) {
  const newProps = { ...props };
  if (typeof props.torchMode === 'string') {
    newProps.torchMode = BarCodeScanner.Constants.TorchMode[props.torchMode];
  }

  if (typeof props.type === 'string') {
    newProps.type = BarCodeScanner.Constants.Type[props.type];
  }

  return newProps;
}

const EventThrottleMs = 500;

export default class BarCodeScanner extends React.Component {
  static Constants = {
    BarCodeType: BarCodeScannerManager.BarCodeType,
    Type: BarCodeScannerManager.Type,
    TorchMode: BarCodeScannerManager.TorchMode
  };

  static propTypes = {
    ...View.propTypes,
    onBarCodeRead: PropTypes.func,
    barCodeTypes: PropTypes.array,
    torchMode: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    type: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ])
  };

  static defaultProps = {
    type: BarCodeScannerManager.Type.back,
    torchMode: BarCodeScannerManager.TorchMode.off,
    barCodeTypes: Object.values(BarCodeScannerManager.BarCodeType),
  };

  setNativeProps(props) {
    this.refs[CAMERA_REF].setNativeProps(props);
  }

  render() {
    const nativeProps = convertNativeProps(this.props);

    return (
      <ExponentBarCodeScanner
        {...nativeProps}
        onBarCodeRead={this._onBarCodeRead}
      />
    );
  }

  _onBarCodeRead = ({nativeEvent}) => {
    if (this._lastEvent &&
        JSON.stringify(nativeEvent) === this._lastEvent &&
        (new Date() - this._lastEventTime) < EventThrottleMs) {
      return;
    }

    if (this.props.onBarCodeRead) {
      this.props.onBarCodeRead(nativeEvent)
      this._lastEvent = JSON.stringify(nativeEvent);
      this._lastEventTime = new Date();
    }
  };
}

export const Constants = BarCodeScanner.Constants;

const ExponentBarCodeScanner = requireNativeComponent('ExponentBarCodeScanner', BarCodeScanner, {
  nativeOnly: {
    onBarCodeRead: true,
  },
});
