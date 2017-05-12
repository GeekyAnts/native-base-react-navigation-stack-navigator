import {
  Platform,
  NativeEventEmitter,
} from 'react-native';

export default function createSensorWrapper(NativeSensorModule, eventName) {
  const SensorEventEmitter = new NativeEventEmitter(NativeSensorModule);

  class SensorWrapper {
    hasListeners() {
      return this.getListenerCount() > 0;
    }

    getListenerCount() {
      return SensorEventEmitter.listeners(eventName).length;
    }

    addListener(listener) {
      if (Platform.OS === 'android') {
        if (!this.hasListeners()) {
          NativeSensorModule.startObserving();
        }
      }

      let emitterSubscription = SensorEventEmitter.addListener(eventName, listener);
      let originalRemove = emitterSubscription.remove;

      emitterSubscription.remove = () => {
        return this.removeSubscription(emitterSubscription);
      }

      return emitterSubscription;
    }

    removeAllListeners() {
      if (Platform.OS === 'android') {
        NativeSensorModule.stopObserving();
      }

      return SensorEventEmitter.removeAllListeners(eventName);
    }

    removeSubscription(subscription) {
      if (Platform.OS === 'android') {
        if (this.getListenerCount() === 1) {
          NativeSensorModule.stopObserving();
        }
      }

      return SensorEventEmitter.removeSubscription(subscription);
    }

    setUpdateInterval(intervalMs) {
      NativeSensorModule.setUpdateInterval(intervalMs);
    }
  }

  return new SensorWrapper;
}
