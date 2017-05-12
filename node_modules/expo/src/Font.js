// @flow

import {
  NativeModules,
} from 'react-native';

import Asset from './Asset';
import Constants from './Constants';

function nativeName(name) {
  return `${Constants.sessionId}-${name}`;
}

const loaded = {};
const loading = {};
const onLoadPromises = {};

export function processFontFamily(name: ?string) {
  if (!name || Constants.systemFonts.includes(name) || name === 'System') {
    return name;
  }

  if (name.includes(Constants.sessionId)) {
    return name;
  }

  if (!isLoaded(name)) {
    if (__DEV__) {
      if (isLoading(name)) {
        console.error(
          `You started loading '${name}', but used it before it finished loading\n\n` +
          `- You need to wait for Exponent.Font.loadAsync to complete before using the font.\n\n` +
          `- We recommend loading all fonts before rendering the app, and rendering only ` +
          `Exponent.Components.AppLoading while waiting for loading to complete.`
        );
      } else {
        console.error(
          `fontFamily '${name}' is not a system font and has not been loaded through ` +
          `Exponent.Font.loadAsync.\n\n` +
          `- If you intended to use a system font, make sure you typed the name ` +
          `correctly and that it is supported by your device operating system.\n\n` +
          `- If this is a custom font, be sure to load it with Exponent.Font.loadAsync.`
        );
      }
    }

    return 'System';
  }

  return `ExponentFont-${nativeName(name)}`;
}

export function isLoaded(name: string) {
  return !!loaded[name];
}

export function isLoading(name: string) {
  return !!onLoadPromises[name];
}

export async function loadAsync(nameOrMap:any, uriOrModuleOrAsset:any) {
  if (typeof nameOrMap === 'object') {
    const names = Object.keys(nameOrMap);
    await Promise.all(names.map(name => loadAsync(name, nameOrMap[name])));
    return;
  }

  let name = nameOrMap;
  if (loaded[name]) {
    return;
  } else if (loading[name]) {
    await new Promise(resolve => { onLoadPromises[name].push(resolve); });
  } else {
    loading[name] = true;
    onLoadPromises[name] = [];

    let asset;
    if (typeof uriOrModuleOrAsset === 'string') {
      // TODO(nikki): need to implement Asset.fromUri(...)
      // asset = Asset.fromUri(uriOrModuleOrAsset);
      throw new Error("Loading fonts from remote URIs is temporarily not supported. Please download the font file and load it using require. See: https://docs.getexponent.com/versions/v8.0.0/guides/using-custom-fonts.html#downloading-the-font");
    } else if (typeof uriOrModuleOrAsset === 'number') {
      asset = Asset.fromModule(uriOrModuleOrAsset);
    } else {
      asset = uriOrModuleOrAsset;
    }

    await asset.downloadAsync();
    if (asset.downloaded) {
      await NativeModules.ExponentFontLoader.loadAsync(nativeName(name), asset.localUri);
    } else {
      throw new Error(`Couldn't download asset for font '${name}'`);
    }

    loaded[name] = true;
    delete loading[name];
    if (onLoadPromises[name]) {
      onLoadPromises[name].forEach(resolve => resolve());
      delete onLoadPromises[name];
    }
  }
}


export function style(name: string, options:{ignoreWarning: bool} = {ignoreWarning: false}) {
  if (!name) {
    return {
      fontFamily: undefined,
    };
  }

  if (!loaded[name] && !options.ignoreWarning) {
    console.warn(`[Exponent.Font] No font '${name}', or it hasn't been loaded yet`);
  }
  return {
    fontFamily: `ExponentFont-${nativeName(name)}`,
  };
}

