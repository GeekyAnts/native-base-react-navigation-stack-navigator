jest.doMock('RCTDeviceEventEmitter', () => new (require('fbemitter').EventEmitter));
jest.useFakeTimers();

import Notifications from '../Notifications';
import { EventEmitter } from 'fbemitter';

const mockNotificationObject = {origin: 'selected', data: {}};
const mockNotificationString = JSON.stringify({origin: 'received', data: {}});

describe('Notifications', () => {
  it('emits the initial notification to listeners', () => {
    Notifications._setInitialNotification(mockNotificationObject);

    const callback = jest.fn();
    Notifications.addListener(callback);
    expect(callback).not.toBeCalled();
    jest.runAllTimers();
    expect(callback).toHaveBeenCalledWith(mockNotificationObject);
  });


  it('only emits the initial notification once', () => {
    Notifications._setInitialNotification(mockNotificationObject);

    const callback = jest.fn();
    Notifications.addListener(callback);
    expect(callback).not.toBeCalled();
    jest.runAllTimers();
    expect(callback).toHaveBeenCalledTimes(1);

    const secondCallback = jest.fn();
    Notifications.addListener(secondCallback);
    jest.runAllTimers();
    expect(secondCallback).not.toBeCalled();
  });

  it('converts a string notification to an object for initial notification', () => {
    Notifications._setInitialNotification(mockNotificationString);

    const callback = jest.fn();
    Notifications.addListener(callback);
    jest.runAllTimers();
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(JSON.parse(mockNotificationString));
  });

  it('emits a notification when Exponent.notification is emitted on DeviceEventEmitter', () => {
    const callback = jest.fn();
    Notifications.addListener(callback);
    expect(callback).not.toBeCalled();
    emitNativeNotification(mockNotificationObject);
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(mockNotificationObject);
  });

  it('converts the Exponent.notification from a string to an object if necessary', () => {
    const callback = jest.fn();
    Notifications.addListener(callback);
    emitNativeNotification(mockNotificationString);
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(JSON.parse(mockNotificationString));
  });

  it('converts the data key from string to an object if necessary', () => {
    const callback = jest.fn();
    Notifications.addListener(callback);

    const data = JSON.stringify({a: 'b'});
    const mockNotificationObjectWithDataString = {origin: 'selected', data};
    emitNativeNotification(mockNotificationObjectWithDataString);

    let expectedResult = {...mockNotificationObjectWithDataString, data: JSON.parse(data)};
    expect(callback).toHaveBeenCalledWith(expectedResult);
  });

  it('stops receiving events when removed', () => {
    const callback = jest.fn();
    let subscription = Notifications.addListener(callback);
    emitNativeNotification(mockNotificationObject);
    expect(callback).toHaveBeenCalledTimes(1);
    subscription.remove();
    emitNativeNotification(mockNotificationString);
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

function emitNativeNotification(notif) {
  require('RCTDeviceEventEmitter').emit('Exponent.notification', notif);
}
