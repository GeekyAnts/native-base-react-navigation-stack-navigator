import { NativeModules } from 'react-native';
import createSensorWrapper from './lib/createSensorWrapper';

const { ExponentAccelerometer } = NativeModules;

export default createSensorWrapper(ExponentAccelerometer, 'accelerometerDidUpdate');
