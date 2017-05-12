// @flow

import {
  NativeModules,
} from 'react-native';
import Asset from './Asset';

type SoundStatus = {
  isPlaying: boolean,
  positionMillis: number,
  rate: number,
  shouldCorrectPitch: boolean,
  volume: number,
  isMuted: boolean,
  isLooping: boolean,
}

var _enabled: boolean = false;
const _DISABLED_ERROR: Error = new Error('Cannot complete operation because audio is not enabled.');
const _NOT_LOADED_ERROR: Error = new Error('Cannot complete operation because sound is not loaded.');
const _DEFAULT_POLLING_TIMEOUT_MILLIS: number = 500;

export async function setIsEnabledAsync(value: boolean): Promise<void> {
  _enabled = value;
  await NativeModules.ExponentAudio.setIsEnabled(value);
}

export class Sound {
  uri: string;
  loaded: boolean;
  key: number;
  durationMillis: number;
  statusChangeCallback: ?(status: SoundStatus) => void;
  userPlaybackFinishedCallback: ?() => void;
  statusPollingTimeoutVariable: ?number;
  statusPollingTimeoutMillis: number;

  constructor({ source } : { source: number | string | Asset }) {
    if (typeof source === 'number') { // source is an asset module
      let asset = Asset.fromModule(source);
      this.uri = asset.localUri || asset.uri;
    } else if (typeof source === 'string') { // source is a remote URI
      this.uri = source;
    } else { // source is an Asset
      this.uri = source.localUri || source.uri;
    }

    this.loaded = false;
    this.key = -1;
    this.durationMillis = 0;
    this.statusChangeCallback = null;
    this.userPlaybackFinishedCallback = null;
    this.statusPollingTimeoutVariable = null;
    this.statusPollingTimeoutMillis = _DEFAULT_POLLING_TIMEOUT_MILLIS;
  }

  _statusPollingLoop = () => {
    if (!_enabled) {
      return;
    }
    if (this.statusChangeCallback != null) {
      this.getStatusAsync(); // Automatically calls this.statusChangeCallback.
    }
    if (this.loaded) {
      this.statusPollingTimeoutVariable = setTimeout(this._statusPollingLoop, this.statusPollingTimeoutMillis);
    }
  }

  _disableStatusPolling() {
    if (this.statusPollingTimeoutVariable != null) {
      clearTimeout(this.statusPollingTimeoutVariable);
      this.statusPollingTimeoutVariable = null;
    }
  }

  _enableStatusPolling() {
    if (_enabled) {
      this._disableStatusPolling();
      this._statusPollingLoop();
    }
  }

  _tryCallStatusChangeCallbackForStatus(status: SoundStatus) {
    if (this.statusChangeCallback != null) {
      this.statusChangeCallback(status);
    }
  }

  _internalPlaybackFinishedCallback = (status: SoundStatus) => {
    this._tryCallStatusChangeCallbackForStatus(status);
    if (this.userPlaybackFinishedCallback != null) {
      this.userPlaybackFinishedCallback();
    }
    this._setInternalPlaybackFinishedCallback(); // Callbacks are only called once and then released.
  }

  _setInternalPlaybackFinishedCallback() {
    if (this.loaded) {
      NativeModules.ExponentAudio.setPlaybackFinishedCallback(this.key, this._internalPlaybackFinishedCallback);
    }
  }

  async _performOperationAndUpdateStatusAsync(operation: () => Promise<{ status: SoundStatus }>): Promise<SoundStatus> {
    if (!_enabled) {
      throw _DISABLED_ERROR;
    }
    if (this.loaded) {
      const { status } : { status: SoundStatus } = await operation();
      this._tryCallStatusChangeCallbackForStatus(status);
      return status;
    } else {
      throw _NOT_LOADED_ERROR;
    }
  }

  async loadAsync(): Promise<void> {
    if (!_enabled) {
      throw _DISABLED_ERROR;
    }
    if (!this.loaded) {
      const result: {
        key: number,
        durationMillis: number,
        status: SoundStatus
      } = await NativeModules.ExponentAudio.load(this.uri);
      this.key = result.key;
      this.durationMillis = result.durationMillis;
      this.loaded = true;
      this._setInternalPlaybackFinishedCallback();
    }
  }

  isLoaded(): boolean {
    return this.loaded;
  }

  getDurationMillis(): ?number {
    return this.loaded ? this.durationMillis : null;
  }

  setStatusChangeCallback(callback: ?(status: SoundStatus) => void) {
    this.statusChangeCallback = callback;
    if (callback == null) {
      this._disableStatusPolling();
    } else {
      this._enableStatusPolling();
    }
  }

  setPlaybackFinishedCallback(callback: ?() => void) {
    this.userPlaybackFinishedCallback = callback;
  }

  setStatusPollingTimeoutMillis(value: number) {
    this.statusPollingTimeoutMillis = value;
  }

  async unloadAsync(): Promise<void> {
    if (this.loaded) {
      this.loaded = false;
      this._disableStatusPolling();
      this.userPlaybackFinishedCallback = null;
      this.statusChangeCallback = null;
      return await NativeModules.ExponentAudio.unload(this.key);
    }
  }

  async playAsync(): Promise<SoundStatus> {
    return this._performOperationAndUpdateStatusAsync(
      () => NativeModules.ExponentAudio.play(this.key));
  }

  async pauseAsync(): Promise<SoundStatus> {
    return this._performOperationAndUpdateStatusAsync(
      () => NativeModules.ExponentAudio.pause(this.key));
  }

  async stopAsync(): Promise<SoundStatus> {
    return this._performOperationAndUpdateStatusAsync(
      () => NativeModules.ExponentAudio.stop(this.key));
  }

  async setPositionAsync(millis: number): Promise<SoundStatus> {
    return this._performOperationAndUpdateStatusAsync(
      () => NativeModules.ExponentAudio.setPosition(this.key, millis));
  }

  async setRateAsync(value: number, shouldCorrectPitch: boolean): Promise<SoundStatus> {
    if (value < 0.0 || value > 32.0) {
      throw new Error('Rate value must be between 0.0 and 32.0.');
    }
    return this._performOperationAndUpdateStatusAsync(
      () => NativeModules.ExponentAudio.setRate(this.key, value, shouldCorrectPitch));
  }

  async setVolumeAsync(value: number): Promise<SoundStatus> {
    if (value < 0.0 || value > 1.0) {
      throw new Error('Volume value must be between 0.0 and 1.0.');
    }
    return this._performOperationAndUpdateStatusAsync(
      () => NativeModules.ExponentAudio.setVolume(this.key, value));
  }

  async setIsMutedAsync(value: boolean): Promise<SoundStatus> {
    return this._performOperationAndUpdateStatusAsync(
      () => NativeModules.ExponentAudio.setIsMuted(this.key, value));
  }

  async setIsLoopingAsync(value: boolean): Promise<SoundStatus> {
    return this._performOperationAndUpdateStatusAsync(
      () => NativeModules.ExponentAudio.setIsLooping(this.key, value));
  }

  async getStatusAsync(): Promise<SoundStatus> {
    return this._performOperationAndUpdateStatusAsync(
      () => NativeModules.ExponentAudio.getStatus(this.key));
  }
}
