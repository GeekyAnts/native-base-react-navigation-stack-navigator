'use strict';

import {
  NativeModules,
  PixelRatio,
  Platform,
} from 'react-native';

import AssetRegistry from 'react-native/Libraries/Image/AssetRegistry';
import AssetSourceResolver from  'react-native/Libraries/Image/AssetSourceResolver';
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';

import { manifest } from './Constants';

// Return { uri, hash } for an asset's file, picking the correct scale, based on
// its React Native metadata. If the asset isn't an image just picks the first
// file.
const pickScale = (meta) => {
  // This logic is based on that in AssetSourceResolver.js, we just do it with
  // our own tweaks for Exponent

  const scale = meta.scales.length > 1 ?
                AssetSourceResolver.pickScale(meta.scales, PixelRatio.get()) :
                1;
  const index = meta.scales.findIndex(s => s === scale);
  const hash = meta.fileHashes[index] || meta.fileHashes[0];

  if (manifest.xde) {
    // Development server URI is pieced together
    const suffix = scale === 1 ? '' : '@' + scale + 'x';
    return {
      uri: manifest.bundleUrl.match(/^https?:\/\/.*?\//)[0] +
           meta.httpServerLocation.replace(/^\/?/, '') +
           '/' + meta.name + suffix + '.' + meta.type +
           '?platform=' + Platform.OS + '&hash=' + meta.hash,
      hash,
    };
  }

  // CDN URI is based directly on the hash
  return {
    uri: 'https://d1wp6m56sqw74a.cloudfront.net/~assets/' + hash,
    hash,
  };
};

export default class Asset {
  static byModule = {};

  constructor({ name, type, hash, uri, width, height }) {
    this.name = name;
    this.type = type;
    this.hash = hash;
    this.uri = uri;
    if (typeof width === 'number') {
      this.width = width;
    }
    if (typeof height === 'number') {
      this.height = height;
    }

    this.downloading = false;
    this.downloaded = false;
    this.downloadCallbacks = [];
  }

  static fromModule(moduleId) {
    if (Asset.byModule[moduleId]) {
      return Asset.byModule[moduleId];
    }

    // TODO(nikki): Make React Native's AssetRegistry save moduleId so we don't
    //              have to do this here.
    const meta = AssetRegistry.getAssetByID(moduleId);
    meta.moduleId = moduleId;
    const { uri, hash } = pickScale(meta);

    const asset = new Asset({
      name: meta.name,
      type: meta.type,
      hash,
      uri,
      width: meta.width,
      height: meta.height,
    });
    Asset.byModule[moduleId] = asset;
    return asset;
  }

  async downloadAsync() {
    if (this.downloaded) {
      return;
    }
    if (this.downloading) {
      await new Promise((resolve, reject) =>
        this.downloadCallbacks.push({ resolve, reject }));
      return;
    }
    this.downloading = true;

    try {
      const path = `ExponentAsset-${this.hash}.${this.type}`;
      let exists, md5, uri;
      ({ exists, md5, uri } = await NativeModules.ExponentFileSystem.getInfoAsync(
        path, { cache: true, md5: true }));
      if (!exists || md5 !== this.hash) {
        ({ md5, uri } = await NativeModules.ExponentFileSystem.downloadAsync(
          this.uri, path, { cache: true, md5: true }));
        if (md5 !== this.hash) {
          throw new Error(`Downloaded file for asset '${this.name}.${this.type}' ` +
                          `failed MD5 integrity check`);
        }
      }
      this.localUri = uri;
      this.downloaded = true;
      this.downloadCallbacks.forEach(({ resolve }) => resolve());
    } catch (e) {
      this.downloadCallbacks.forEach(({ reject }) => reject(e));
      throw e;
    } finally {
      this.downloading = false;
      this.downloadCallbacks = [];
    }
  }
}

// Override React Native's asset resolution for `Image` components
resolveAssetSource.setCustomSourceTransformer((resolver) => {
  if (!resolver.asset.moduleId) {
    return resolver.fromSource(pickScale(resolver.asset).uri);
  }
  const asset = Asset.fromModule(resolver.asset.moduleId);
  return resolver.fromSource(asset.downloaded ? asset.localUri : asset.uri);
});

