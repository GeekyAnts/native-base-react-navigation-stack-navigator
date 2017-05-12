import { NativeModules } from 'react-native';
import createSensorWrapper from './lib/createSensorWrapper';

const { ExponentGyroscope } = NativeModules;

export default createSensorWrapper(ExponentGyroscope, 'gyroscopeDidUpdate');
