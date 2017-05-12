module.exports = [
  {
    ExponentFileSystem: [
      { downloadAsync: 'function' },
      { getInfoAsync: 'function' },
      { deleteAsync: 'function' },
    ],
  },
  {
    ExponentNotifications: [
      { presentLocalNotification: 'function' },
      { getExponentPushTokenAsync: 'function' },
      { scheduleLocalNotification: 'function' },
      { cancelScheduledNotification: 'function' },
      { cancelAllScheduledNotifications: 'function' },
      { getBadgeNumberAsync: 'function' },
      { setBadgeNumberAsync: 'function' },
    ],
  },
  {
    ExponentAmplitude: [
      { initialize: 'function' },
      { setUserId: 'function' },
      { setUserProperties: 'function' },
      { clearUserProperties: 'function' },
      { logEvent: 'function' },
      { logEventWithProperties: 'function' },
      { setGroup: 'function' },
    ],
  },
  {
    ExponentSegment: [
      { initializeIOS: 'function' },
      { initializeAndroid: 'function' },
      { identify: 'function' },
      { identifyWithTraits: 'function' },
      { track: 'function' },
      { trackWithProperties: 'function' },
      { flush: 'function' },
    ],
  },
  {
    ExponentUtil: [
      { reload: 'function' },
      { getCurrentLocaleAsync: 'function' },
    ],
  },
  {
    ExponentAccelerometer: [
      { setUpdateInterval: 'function' },
      { addListener: 'function' },
      { removeListeners: 'function' },
    ],
  },
  { ExponentAppLoadingManager: [{ finishedAsync: 'function' }] },
  {
    ExponentAudio: [
      { setIsEnabled: 'function' },
      { load: 'function' },
      { play: 'function' },
      { pause: 'function' },
      { stop: 'function' },
      { unload: 'function' },
      { setPosition: 'function' },
      { setVolume: 'function' },
      { setIsMuted: 'function' },
      { setIsLooping: 'function' },
      { getStatus: 'function' },
      { setPlaybackFinishedCallback: 'function' },
    ],
  },
  {
    ExponentBarCodeScannerManager: [
      { BarCodeType: 'object' },
      { Type: 'object' },
      { TorchMode: 'object' },
    ],
  },
  { ExponentBlurViewManager: [] },
  { ExponentContacts: [{ getContactsAsync: 'function' }] },
  { ExponentFacebook: [{ logInWithReadPermissionsAsync: 'function' }] },
  {
    ExponentFingerprint: [
      { hasHardwareAsync: 'function' },
      { isEnrolledAsync: 'function' },
      { authenticateAsync: 'function' },
    ],
  },
  { ExponentFontLoader: [{ loadAsync: 'function' }] },
  { ExponentGLViewManager: [] },
  { ExponentGoogle: [{ logInAsync: 'function' }] },
  {
    ExponentGyroscope: [
      { setUpdateInterval: 'function' },
      { addListener: 'function' },
      { removeListeners: 'function' },
    ],
  },
  {
    ExponentImagePicker: [
      { launchCameraAsync: 'function' },
      { launchImageLibraryAsync: 'function' },
    ],
  },
  { ExponentKeepAwake: [{ activate: 'function' }, { deactivate: 'function' }] },
  { ExponentLinearGradientManager: [] },
  {
    ExponentLocation: [
      { getCurrentPositionAsync: 'function' },
      { watchPositionImplAsync: 'function' },
      { removeWatchAsync: 'function' },
      { addListener: 'function' },
      { removeListeners: 'function' },
    ],
  },
  { ExponentPermissions: [{ getAsync: 'function' }, { askAsync: 'function' }] },
  {
    ExponentVideoManager: [
      { ScaleToFill: 'string' },
      { ScaleAspectFill: 'string' },
      { ScaleAspectFit: 'string' },
      { ScaleNone: 'string' },
    ],
  },
  {
    ExponentWebBrowser: [
      { openBrowserAsync: 'function' },
      { dismissBrowser: 'function' },
    ],
  },
  {
    ExponentConstants: [
      { isDevice: 'boolean' },
      { linkingUri: 'string' },
      { deviceId: 'string' },
      { manifest: 'object' },
      { deviceName: 'string' },
      { platform: 'object' },
      { statusBarHeight: 'number' },
      { sessionId: 'string' },
      { systemFonts: 'object' },
      { exponentVersion: 'string' },
      { deviceYearClass: 'number' },
      { appOwnership: 'string' },
    ],
  },
];
