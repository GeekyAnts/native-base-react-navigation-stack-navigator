// @flow

import {
  NativeModules,
} from 'react-native';

const { ExponentImagePicker } = NativeModules;

type ImageInfo = {|
  uri: string,
  width: number,
  height: number,
|};

type ImageResult =
  {| cancelled: true |} |
  {| cancelled: false |} & ImageInfo;


type ImageLibraryOptions = {
  allowsEditing?: boolean,
  aspect?: [number, number],
  quality?: number,
};

export async function launchImageLibraryAsync(
  options?: ImageLibraryOptions,
): Promise<ImageResult> {
  if (!options || typeof options !== 'object') {
    options = {};
  }
  return ExponentImagePicker.launchImageLibraryAsync(options);
}


type CameraOptions = {
  allowsEditing?: boolean,
  aspect?: [number, number],
  quality?: number,
};

export async function launchCameraAsync(
  options?: CameraOptions,
): Promise<ImageResult> {
  if (!options || typeof options !== 'object') {
    options = {};
  }
  return ExponentImagePicker.launchCameraAsync(options);
}
