/**
*  @flow
 */

import {
  NativeModules,
} from 'react-native';

export default function apisAreAvailable():bool {
  return !!NativeModules.ExponentConstants;
}
