import {
  requireNativeComponent,
  UIManager,
  findNodeHandle,
  Platform,
} from 'react-native';
import dedent from 'dedent';
import SafeModule from './SafeModule';

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
  return UIManager[nameOrArray];
};

const findFirstResolver = namespace => function findFirstOnNamespace(nameOrArray) {
  if (!nameOrArray) return null;
  if (Array.isArray(nameOrArray)) return first(nameOrArray, findFirstOnNamespace);
  return nameOrArray in namespace ? nameOrArray : null;
};

const findFirstViewName = findFirstResolver(UIManager);

const getPrimaryName = (nameOrArray) => {
  return Array.isArray(nameOrArray) ? getPrimaryName(nameOrArray[0]) : nameOrArray;
};

const defaultGetVersion = module => module.VERSION;

function SafeComponentCreate(options) {
  if (!options) {
    throw new Error(dedent`
      SafeModule.create(...) was invoked without any options parameter.
    `);
  }
  const {
    viewName,
    propOverrides,
    componentOverrides,
    mockComponent,
    mock,
  } = options;
  let {
    getVersion,
  } = options;

  if (!getVersion) {
    getVersion = defaultGetVersion;
  }

  if (!viewName) {
    throw new Error(`
      SafeModule.component(...) requires a viewName property to be specified.
    `);
  }

  if (!mockComponent) {
    throw new Error(`
      SafeModule.component(...) requires a mockComponent property to be specified.
    `);
  }

  const PRIMARY_VIEW_NAME = getPrimaryName(viewName);

  const realViewName = findFirstViewName(viewName);
  const realViewConfig = UIManager[realViewName];

  if (!realViewName || !realViewConfig) {
    return mockComponent;
  }

  const moduleOptions = Object.assign({}, options, {
    mock: mock || {},
    moduleName: `${realViewName}Manager`,
  });

  const nativeModule = SafeModule(moduleOptions);

  const version = getVersion(realViewConfig.Constants || {});

  if (propOverrides) {
    const overrides = propOverrides[version];
    let boundOverrides = {};
    if (overrides) {
      if (typeof overrides === 'function') {
        boundOverrides = overrides(realViewConfig.NativeProps, realViewConfig, nativeModule);
      } else {
        boundOverrides = Object.assign({}, overrides);
      }
    }
    Object.assign(realViewConfig.NativeProps, boundOverrides);
  }

  const nativeComponent = requireNativeComponent(realViewName);

  let result = nativeComponent;

  result.runCommand = (instance, name, ...args) => {
    return Platform.select({
      android: () => UIManager.dispatchViewManagerCommand(
        findNodeHandle(instance),
        UIManager[realViewName].Commands[name],
        args
      ),
      ios: () => nativeModule[name](findNodeHandle(instance), ...args),
      default: () => {},
    })();
  };

  result.updateView = (instance, props) => {
    const native = () => UIManager.updateView(findNodeHandle(instance), realViewName, props);
    Platform.select({
      ios: native,
      android: native,
      default: () => {},
    })();
  };

  if (componentOverrides) {
    const overrides = componentOverrides[version];
    if (overrides) {
      if (__DEV__) {
        if (typeof overrides !== 'function') {
          console.error(dedent`
             When attempting to resolve the native component ${PRIMARY_VIEW_NAME},
             componentOverrides.${version} is expected to be a function, but found
             ${typeof overrides} instead.
          `);
        }
      }

      result = overrides(nativeComponent, nativeModule);

      if (__DEV__) {
        if (typeof result !== 'function') {
          console.error(dedent`
            When attempting to resolve the native component ${PRIMARY_VIEW_NAME},
            componentOverrides.${version} is expected to be a function that returns a React
            component. Instead, ${typeof result} was found.
          `);
        }
      }
    }
  }

  return result;
}

module.exports = SafeComponentCreate;
