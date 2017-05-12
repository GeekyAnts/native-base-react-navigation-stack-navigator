var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _templateObject=_taggedTemplateLiteral(['\n      SafeModule.module(...) was invoked without any options parameter.\n    '],['\n      SafeModule.module(...) was invoked without any options parameter.\n    ']),_templateObject2=_taggedTemplateLiteral(['\n      SafeModule.module(...) requires a moduleName property to be specified.\n    '],['\n      SafeModule.module(...) requires a moduleName property to be specified.\n    ']),_templateObject3=_taggedTemplateLiteral(['\n      Missing a "mock" parameter.\n    '],['\n      Missing a "mock" parameter.\n    ']),_templateObject4=_taggedTemplateLiteral(['\n          ReactNative.NativeModules.','.',' did not have a corresponding prop defined\n          in the mock provided to SafeModule.\n        '],['\n          ReactNative.NativeModules.','.',' did not have a corresponding prop defined\n          in the mock provided to SafeModule.\n        ']);var _reactNative=require('react-native');
var _dedent=require('dedent');var _dedent2=_interopRequireDefault(_dedent);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _taggedTemplateLiteral(strings,raw){return Object.freeze(Object.defineProperties(strings,{raw:{value:Object.freeze(raw)}}));}

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

var hasOwnProperty=Object.prototype.hasOwnProperty;

var UNMOCKED_PROPERTY_WHITELIST={
VERSION:true,
addListener:true,
removeListeners:true};


var eventEmitterMock={
addListener:function addListener(){},
removeListeners:function removeListeners(){}};


var first=function first(array,fn){
var result=void 0;
var i=0;
/* eslint no-plusplus: 0 */
for(;i<array.length;i++){
result=fn(array[i]);
if(result)return result;
}
return null;
};

var moduleWithName=function moduleWithName(nameOrArray){
if(!nameOrArray)return null;
if(Array.isArray(nameOrArray))return first(nameOrArray,moduleWithName);
return _reactNative.NativeModules[nameOrArray];
};

var getPrimaryName=function getPrimaryName(nameOrArray){
return Array.isArray(nameOrArray)?getPrimaryName(nameOrArray[0]):nameOrArray;
};

var getModule=function getModule(moduleNameOrNames,mock,isEventEmitter){
var module=moduleWithName(moduleNameOrNames);
// TODO: in __DEV__, we should console.warn if anything but the first module got used.
if(module)return module;
// For Platform.OS === 'ios', we must ensure that `module` contains event
// emitter methods expected by `NativeEventEmitter`, even in the case of a
// mock. Otherwise, calling the emitter will throw an error.
if(isEventEmitter)return _extends({},mock,eventEmitterMock);
return mock;
};

var defaultGetVersion=function defaultGetVersion(module){return module.VERSION;};


var create=function SafeModuleCreate(options){
if(!options){
throw new Error((0,_dedent2.default)(_templateObject));


}var

moduleName=



options.moduleName;var mock=options.mock;var isEventEmitter=options.isEventEmitter;var versionOverrides=options.versionOverrides;var

getVersion=
options.getVersion;

if(!getVersion){
getVersion=defaultGetVersion;
}

if(!moduleName){
throw new Error((0,_dedent2.default)(_templateObject2));


}
var MODULE_NAME=getPrimaryName(moduleName);

if(!mock){
throw new Error((0,_dedent2.default)(_templateObject3));


}

var result={};

var module=getModule(moduleName,mock,isEventEmitter);
var version=getVersion(module);

if(__DEV__){
Object.keys(module).forEach(function(key){
if(!hasOwnProperty.call(mock,key)&&!UNMOCKED_PROPERTY_WHITELIST[key]){
console.warn((0,_dedent2.default)(_templateObject4,
MODULE_NAME,key));


}
});
}

if(isEventEmitter){
// TODO(lmr): should this be put inside of a try/catch?
result.emitter=new _reactNative.NativeEventEmitter(module);
}

var overrides=void 0;
var boundOverrides=void 0;
if(versionOverrides){
overrides=versionOverrides[version];
boundOverrides={};
if(overrides){
Object.keys(overrides).forEach(function(key){
if(typeof overrides[key]==='function'){
boundOverrides[key]=overrides[key](module[key],module);
}else{
boundOverrides[key]=overrides[key];
}
});
}
}

_extends(
result,
mock,
module,
boundOverrides);


return result;
};

module.exports=create;