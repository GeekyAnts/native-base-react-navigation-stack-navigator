import { NativeModules, NativeEventEmitter } from 'react-native';
import { expect } from 'chai';
import sinon from 'sinon';
import NativeSafeModule from '../src/NativeSafeModule';
import NativeSafeComponent from '../src/NativeSafeComponent';

const SafeModule = {
  create: NativeSafeModule,
  module: NativeSafeModule,
  component: NativeSafeComponent,
};

let i = 1;
const uniqueModuleName = () => {
  i += 1;
  return `ExampleModule${i}`;
};

describe('SafeModule', () => {
  it('throws if no definition is passed in', () => {
    expect(() => SafeModule.create()).to.throw();
  });

  it('throws if no module name is passed in', () => {
    expect(() => SafeModule.create({
      mock: {},
    })).to.throw();
  });

  it('throws if no mock is passed in', () => {
    expect(() => SafeModule.create({
      moduleName: uniqueModuleName(),
    })).to.throw();
  });

  it('uses the mock if module is not found', () => {
    const moduleName = uniqueModuleName();
    const mock = {
      foo: sinon.spy(),
    };
    const result = SafeModule.create({
      moduleName,
      mock,
    });

    result.foo();

    expect(mock.foo).callCount(1);
  });


  it('uses module in preference to mock', () => {
    const moduleName = uniqueModuleName();
    const module = {
      foo: sinon.spy(),
    };
    const mock = {
      foo: sinon.spy(),
    };
    NativeModules[moduleName] = module;
    const result = SafeModule.create({
      moduleName,
      mock,
    });

    result.foo();

    expect(module.foo).callCount(1);
    expect(mock.foo).callCount(0);
  });

  it('uses overrides for specific version', () => {
    const moduleName = uniqueModuleName();
    const module = {
      VERSION: 5,
      foo: sinon.spy(),
    };
    const mock = {
      foo: sinon.spy(),
      bar: 'mock',
    };
    const v5spy = sinon.spy();
    const v5 = {
      foo: () => v5spy,
      bar: 'v5',
    };
    sinon.spy(v5, 'foo');
    const v6spy = sinon.spy();
    const v6 = {
      foo: () => v6spy,
      bar: 'v6',
    };
    sinon.spy(v6, 'foo');
    NativeModules[moduleName] = module;
    const result = SafeModule.create({
      moduleName,
      mock,
      versionOverrides: {
        6: v6,
        5: v5,
      },
    });

    expect(v6.foo).callCount(0);
    expect(v6spy).callCount(0);
    expect(v5spy).callCount(0);
    expect(mock.foo).callCount(0);
    expect(module.foo).callCount(0);

    expect(v5.foo).callCount(1);
    expect(v5.foo).calledWith(module.foo, module);

    result.foo('a', 'b', 'c');

    expect(v6.foo).callCount(0);
    expect(v6spy).callCount(0);

    expect(v5.foo).callCount(1);
    expect(v5spy).callCount(1);
    expect(v5spy).calledWith('a', 'b', 'c');

    expect(result.bar).to.equal('v5');
  });

  it('allow getVersion to get custom version', () => {
    const moduleName = uniqueModuleName();
    const module = {
      VERSION: 'BAD',
      foo: sinon.spy(),
    };
    const mock = {
      foo: sinon.spy(),
    };
    const GOOD = { foo: sinon.spy(() => 'PROP') };
    const BAD = { foo: sinon.spy() };
    const getVersion = sinon.spy(() => 'GOOD');
    NativeModules[moduleName] = module;
    const result = SafeModule.create({
      moduleName,
      mock,
      getVersion,
      versionOverrides: {
        GOOD,
        BAD,
      },
    });

    expect(getVersion).callCount(1);
    expect(getVersion).calledWith(module);
    expect(GOOD.foo).callCount(1);
    expect(GOOD.foo).calledWith(module.foo, module);
    expect(BAD.foo).callCount(0);
    expect(result.foo).to.equal('PROP');
  });

  it('isEventEmitter option creates an EventEmitter', () => {
    const moduleName = uniqueModuleName();
    const module = {
      foo: sinon.spy(),
    };
    const mock = {
      foo: sinon.spy(),
    };
    NativeModules[moduleName] = module;
    const result = SafeModule.create({
      moduleName,
      mock,
      isEventEmitter: true,
    });
    expect(result.emitter).instanceOf(NativeEventEmitter);
  });

  it('mock has EventEmitter methods when isEventEmitter=true', () => {
    const moduleName = uniqueModuleName();
    const mock = {
      foo: sinon.spy(),
    };
    const result = SafeModule.create({
      moduleName,
      mock,
      isEventEmitter: true,
    });
    expect(result.emitter).instanceOf(NativeEventEmitter);
    expect(result.addListener).to.be.a('function');
    expect(result.removeListeners).to.be.a('function');
  });

  it('falls back to older module name if newer name isnt present', () => {
    const moduleName1 = uniqueModuleName();
    const moduleName2 = uniqueModuleName();
    const module = {
      foo: sinon.spy(),
    };
    const mock = {
      foo: sinon.spy(),
    };
    NativeModules[moduleName2] = module;
    const result = SafeModule.create({
      moduleName: [moduleName1, moduleName2],
      mock,
    });

    result.foo();

    expect(module.foo).callCount(1);
    expect(mock.foo).callCount(0);
  });

  it('prefers the first module name', () => {
    const moduleName1 = uniqueModuleName();
    const moduleName2 = uniqueModuleName();
    const module1 = {
      foo: sinon.spy(),
    };
    const module2 = {
      foo: sinon.spy(),
    };
    const mock = {
      foo: sinon.spy(),
    };
    NativeModules[moduleName1] = module1;
    NativeModules[moduleName2] = module2;
    const result = SafeModule.create({
      moduleName: [moduleName1, moduleName2],
      mock,
    });

    result.foo();

    expect(module1.foo).callCount(1);
    expect(module2.foo).callCount(0);
    expect(mock.foo).callCount(0);
  });
});
