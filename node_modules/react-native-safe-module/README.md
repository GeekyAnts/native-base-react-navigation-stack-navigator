# react-native-safe-module

A safe way to consume React Native NativeModules


[![npm Version](https://img.shields.io/npm/v/react-native-safe-module.svg)](https://www.npmjs.com/package/react-native-safe-module) [![License](https://img.shields.io/npm/l/react-native-safe-module.svg)](https://www.npmjs.com/package/react-native-safe-module) [![Build Status](https://travis-ci.org/lelandrichardson/react-native-safe-module.svg)](https://travis-ci.org/airbnb/react-native-safe-module)


## Motivation

React Native enables a new aspect of mobile development: "Code Push".
Code Push provides developers a way to push updates to their JS code base
to mobile clients without going through the app store.

Since you can code push to older versions of the native client app, this 
type of deployment creates a new point of failure though: JavaScript
code that is incompatible with the native version of the app it's running
on.

React Native JS interacts with the Native code entirely through "Native Modules",
which are injected at run-time onto the `ReactNative.NativeModules`
namespace. As a result, having code that interacts with these modules
directly can result in run-time errors.  This library allows you to more
safely interact with native modules, and provide version-specific overrides
for the module, as well as mocks to use in the case that the method or module
is entirely absent.  The result is more robust code that can be code pushed
to more users, as well as code that can be tested in an environment without
a host app (e.g, Node).



## Installation

```bash
npm i --save react-native-safe-module
```

## Usage

Importing `SafeModule` is as simple as:

```js
import SafeModule from 'react-native-safe-module';
```

### Basic Usage

If you were using a Native Module before, such as `NativeModules.FooModule`
like this:

```js
import { NativeModules } from 'react-native';
const { FooModule } = NativeModules;

// ...

FooModule.doSomething().then(...)

```

You can instead do:

```js
import SafeModule from 'react-native-safe-module';
const FooModule = SafeModule.create({
  moduleName: 'FooModule',
  mock: {
    doSomething: () => Promise.resolve(...),
  },
});

// ...

FooModule.doSomething().then(...)
```


### Version-Specific Overrides

By default, `SafeModule` assumes that you are exporting a constant `VERSION`
with each Native Module that can be used to identify which version of the
native module it is. If you would like to specify the version a different
way, you are able to add a `getVersion` option to the SafeModule configuration
which is a function expected to return the correct version of the module.

Often times you may need to make a breaking change to the API of your Native Module,
but it can be made backwards compatible with SafeModule very easily.

For example, imagine we have a `Scrolling` module with a `scrollTo(...)`
method. 

In version "7" of the module, the method signature of `scrollTo`
looked something like `scrollTo(x: number, y: number, animated: true)`.

In the latest version of the module, we have changed the method signature
to look something like: `scrollTo(options: {x: number, y: number, animated: true})`.

This is a breaking change, but we can make it backwards compatible with SafeModule:

```js
// Scrolling.js
import SafeModule from 'react-native-safe-module';

module.exports = SafeModule.create({
  moduleName: 'MyCustomScrollingModule',
  mock: {
    scrollTo: () => { /* do nothing */},
  },
  overrides: {
    7: {
      // overrides are defined as higher-order functions which are first
      // called with the real module's method, and are expected to return
      // a new function with the current API.
      scrollTo: oldScrollTo => options => {
        return oldScrollTo(options.x, options.y, !!options.animated);
      },
    },
  },
});
```


### Module Name Changes

Sometimes we want to change the name of a Native Module. In this case,
we need to support both versions of the name. SafeModule allows you to
specify `moduleName` as an array of names. It will use the first name
it finds.

For example, consider the case where we have a module named `FooExperimentalModule`,
and we want to change the name of it to be just `FooModule`.

```js
// FooModule.js
import SafeModule from 'react-native-safe-module';

module.exports = SafeModule.create({
  moduleName: ['FooModule', 'FooExperimentalModule'],
  mock: {
    ...
  },
});
```

In this case, `SafeModule` will look for `FooModule` first, and then
`FooExperimentalModule` if it is not found. Finally, it will fall back
to the `mock` implementation if none is found.




## API

### `SafeModule.create(options)`

*Parameters:*

  - `options.moduleName`: (**required**, `string | Array<string>`) the name,
  or array of names, to look for the module at on the `NativeModules` namespace.
  - `options.mock`: (**required**, `mixed`) The mock implementation of the native module.
  - `options.getVersion`: (`(module) => string|number`) Optional. A function that returns 
  the version of the native module. Only needed if you are specifying overrides and not
  exporting a `VERSION` property on your native module. Defaults to `x => x.VERSION`.
  - `options.overrides`: (`{[version: string]: mixed`) Optional. A map of version numbers to
  overridden implementations of the corresponding property/method. If an overridden property
  or method is a function, it will be called during `SafeModule.create(...)` with two arguments,
  the original value of that property on the original module, and the original module itself. The
  return value of this function will be put on the return value of `SafeModule.create(...)`.
  - `options.isEventEmitter`: (`bool`) Optional. A flag indicating that the native module
  is expected to be an `EventEmitter`. Puts the `EventEmitter` instance on the `emitter` 
  property of the resulting module. Defaults to `false`.




## TODO

- [ ] Implement `onInit` lifecycle method
- [ ] Implement `onNoModuleFound` lifecycle method
- [ ] Implement `onVersionFound` lifecycle method
- [ ] Implement `onOverrideUsed` lifecycle method
- [ ] Implement `onOverrideCalled` lifecycle method
