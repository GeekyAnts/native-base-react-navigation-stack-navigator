import { NativeModules, NativeEventEmitter } from 'react-native';
import dedent from 'dedent';

// const AccountModule = SafeModule.create({
//   moduleName: ['SomeNativeModule', 'SomeOldNameOfThatModule'],
//   isEventEmitter: true,
//   getVersion: module => module.VERSION,
//   onInit: (module, version) => {},
//   onNoModuleFound: () => {},
//   onVersionFound: (version) => {},
//   onOverrideUsed: (version, overrideName) => {},
//   onOverrideCalled: (version, overrideName) => {},
//   mock: {
//     push: () => Promise.resolve(),
//     pushNative: () => Promise.resolve(),
//     setTitle: noop,
//   },
//   overrides: {
//     7: {
//       push: old => (id, props, options) => {
//         return old(id, props, !!options.animated);
//       },
//     },
//   },
// });

const hasOwnProperty = Object.prototype.hasOwnProperty;

const UNMOCKED_PROPERTY_WHITELIST = {
  VERSION: true,
  addListener: true,
  removeListeners: true,
};

const eventEmitterMock = {
  addListener() {},
  removeListeners() {},
};

const first = (array, fn) => {
  let result;
  let i = 0;
  /* eslint no-plusplus: 0 */
  for (; i < array.length; i++) {
    result = fn(array[i]);
    if (result) return result;
  }
  return null;
};

const moduleWithName = (nameOrArray) => {
  if (!nameOrArray) return null;
  if (Array.isArray(nameOrArray)) return first(nameOrArray, moduleWithName);
  return NativeModules[nameOrArray];
};

const getPrimaryName = (nameOrArray) => {
  return Array.isArray(nameOrArray) ? getPrimaryName(nameOrArray[0]) : nameOrArray;
};

const getModule = (moduleNameOrNames, mock, isEventEmitter) => {
  const module = moduleWithName(moduleNameOrNames);
  // TODO: in __DEV__, we should console.warn if anything but the first module got used.
  if (module) return module;
  // For Platform.OS === 'ios', we must ensure that `module` contains event
  // emitter methods expected by `NativeEventEmitter`, even in the case of a
  // mock. Otherwise, calling the emitter will throw an error.
  if (isEventEmitter) return Object.assign({}, mock, eventEmitterMock);
  return mock;
};

const defaultGetVersion = module => module.VERSION;


const create = function SafeModuleCreate(options) {
  if (!options) {
    throw new Error(dedent`
      SafeModule.module(...) was invoked without any options parameter.
    `);
  }
  const {
    moduleName,
    mock,
    isEventEmitter,
    versionOverrides,
    } = options;
  let {
    getVersion,
    } = options;

  if (!getVersion) {
    getVersion = defaultGetVersion;
  }

  if (!moduleName) {
    throw new Error(dedent`
      SafeModule.module(...) requires a moduleName property to be specified.
    `);
  }
  const MODULE_NAME = getPrimaryName(moduleName);

  if (!mock) {
    throw new Error(dedent`
      Missing a "mock" parameter.
    `);
  }

  const result = {};

  const module = getModule(moduleName, mock, isEventEmitter);
  const version = getVersion(module);

  if (__DEV__) {
    Object.keys(module).forEach((key) => {
      if (!hasOwnProperty.call(mock, key) && !UNMOCKED_PROPERTY_WHITELIST[key]) {
        console.warn(dedent`
          ReactNative.NativeModules.${MODULE_NAME}.${key} did not have a corresponding prop defined
          in the mock provided to SafeModule.
        `);
      }
    });
  }

  if (isEventEmitter) {
    // TODO(lmr): should this be put inside of a try/catch?
    result.emitter = new NativeEventEmitter(module);
  }

  let overrides;
  let boundOverrides;
  if (versionOverrides) {
    overrides = versionOverrides[version];
    boundOverrides = {};
    if (overrides) {
      Object.keys(overrides).forEach((key) => {
        if (typeof overrides[key] === 'function') {
          boundOverrides[key] = overrides[key](module[key], module);
        } else {
          boundOverrides[key] = overrides[key];
        }
      });
    }
  }

  Object.assign(
    result,
    mock,
    module,
    boundOverrides
  );

  return result;
};

module.exports = create;
