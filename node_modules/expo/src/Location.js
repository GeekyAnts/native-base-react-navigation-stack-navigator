// @flow

import {
  NativeEventEmitter,
  NativeModules,
  Platform,
} from 'react-native';

type LocationOptions = {
  enableHighAccuracy: ?bool,
  timeInterval: ?number,
  distanceInterval: ?number,
}

type LocationData = {
  coords: {
    latitude: number,
    longitude: number,
    altitude: number,
    accuracy: number,
    heading: number,
    speed: number,
  },
  timestamp: number,
}

type LocationCallback = (data: LocationData) => any;

const LocationEventEmitter = new NativeEventEmitter(NativeModules.ExponentLocation);

let nextWatchId = 0;
let watchCallbacks: { [watchId: number]: LocationCallback } = {};
let deviceEventSubscription: ?Function;

export function getCurrentPositionAsync(options: LocationOptions) {
  // On Android we have a native method for this case.
  if (Platform.OS === 'android') {
    return NativeModules.ExponentLocation.getCurrentPositionAsync(options);
  }

  // On iOS we implement it in terms of `.watchPositionAsync(...)`
  // TODO: Use separate native method for iOS too?
  return new Promise(async (resolve, reject) => {
    try {

      let done = false; // To make sure we only resolve once.

      let subscription;
      subscription = await watchPositionAsync(options, (location) => {
        if (!done) {
          resolve(location);
          done = true;
        }
        if (subscription) {
          subscription.remove();
        }
      });

      // In case the callback is fired before we get here.
      if (done) {
        subscription.remove();
      }
    } catch (e) {
      reject(e);
    }
  });
}

export async function watchPositionAsync(options: LocationOptions, callback: LocationCallback) {
  let { ExponentLocation } = NativeModules;

  if (!deviceEventSubscription) {
    deviceEventSubscription = LocationEventEmitter.addListener(
      'Exponent.locationChanged',
      ({ watchId, location }) => {
        const callback = watchCallbacks[watchId];
        if (callback) {
          callback(location);
        } else {
          ExponentLocation.removeWatchAsync(watchId);
        }
      },
    );
  }

  const watchId = nextWatchId++; // XXX: thread safe?
  watchCallbacks[watchId] = callback;
  await ExponentLocation.watchPositionImplAsync(watchId, options);

  let removed = false;
  return {
    remove() {
      if (!removed) {
        ExponentLocation.removeWatchAsync(watchId);
        delete watchCallbacks[watchId];
        if (Object.keys(watchCallbacks).length === 0) {
          LocationEventEmitter.removeSubscription(deviceEventSubscription);
          deviceEventSubscription = null;
        }
        removed = true;
      }
    },
  };
}

