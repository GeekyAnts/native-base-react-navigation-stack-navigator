var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _templateObject=_taggedTemplateLiteral(['\n      SafeModule.create(...) was invoked without any options parameter.\n    '],['\n      SafeModule.create(...) was invoked without any options parameter.\n    ']),_templateObject2=_taggedTemplateLiteral(['\n             When attempting to resolve the native component ',',\n             componentOverrides.',' is expected to be a function, but found\n             ',' instead.\n          '],['\n             When attempting to resolve the native component ',',\n             componentOverrides.',' is expected to be a function, but found\n             ',' instead.\n          ']),_templateObject3=_taggedTemplateLiteral(['\n            When attempting to resolve the native component ',',\n            componentOverrides.',' is expected to be a function that returns a React\n            component. Instead, ',' was found.\n          '],['\n            When attempting to resolve the native component ',',\n            componentOverrides.',' is expected to be a function that returns a React\n            component. Instead, ',' was found.\n          ']);var _reactNative=require('react-native');





var _dedent=require('dedent');var _dedent2=_interopRequireDefault(_dedent);
var _SafeModule=require('./SafeModule');var _SafeModule2=_interopRequireDefault(_SafeModule);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _taggedTemplateLiteral(strings,raw){return Object.freeze(Object.defineProperties(strings,{raw:{value:Object.freeze(raw)}}));}

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
return _reactNative.UIManager[nameOrArray];
};

var findFirstResolver=function findFirstResolver(namespace){return function findFirstOnNamespace(nameOrArray){
if(!nameOrArray)return null;
if(Array.isArray(nameOrArray))return first(nameOrArray,findFirstOnNamespace);
return nameOrArray in namespace?nameOrArray:null;
};};

var findFirstViewName=findFirstResolver(_reactNative.UIManager);

var getPrimaryName=function getPrimaryName(nameOrArray){
return Array.isArray(nameOrArray)?getPrimaryName(nameOrArray[0]):nameOrArray;
};

var defaultGetVersion=function defaultGetVersion(module){return module.VERSION;};

function SafeComponentCreate(options){
if(!options){
throw new Error((0,_dedent2.default)(_templateObject));


}var

viewName=




options.viewName;var propOverrides=options.propOverrides;var componentOverrides=options.componentOverrides;var mockComponent=options.mockComponent;var mock=options.mock;var

getVersion=
options.getVersion;

if(!getVersion){
getVersion=defaultGetVersion;
}

if(!viewName){
throw new Error('\n      SafeModule.component(...) requires a viewName property to be specified.\n    ');


}

if(!mockComponent){
throw new Error('\n      SafeModule.component(...) requires a mockComponent property to be specified.\n    ');


}

var PRIMARY_VIEW_NAME=getPrimaryName(viewName);

var realViewName=findFirstViewName(viewName);
var realViewConfig=_reactNative.UIManager[realViewName];

if(!realViewName||!realViewConfig){
return mockComponent;
}

var moduleOptions=_extends({},options,{
mock:mock||{},
moduleName:realViewName+'Manager'});


var nativeModule=(0,_SafeModule2.default)(moduleOptions);

var version=getVersion(realViewConfig.Constants||{});

if(propOverrides){
var overrides=propOverrides[version];
var boundOverrides={};
if(overrides){
if(typeof overrides==='function'){
boundOverrides=overrides(realViewConfig.NativeProps,realViewConfig,nativeModule);
}else{
boundOverrides=_extends({},overrides);
}
}
_extends(realViewConfig.NativeProps,boundOverrides);
}

var nativeComponent=(0,_reactNative.requireNativeComponent)(realViewName);

var result=nativeComponent;

result.runCommand=function(instance,name){for(var _len=arguments.length,args=Array(_len>2?_len-2:0),_key=2;_key<_len;_key++){args[_key-2]=arguments[_key];}
return _reactNative.Platform.select({
android:function android(){return _reactNative.UIManager.dispatchViewManagerCommand(
(0,_reactNative.findNodeHandle)(instance),
_reactNative.UIManager[realViewName].Commands[name],
args);},

ios:function ios(){return nativeModule[name].apply(nativeModule,[(0,_reactNative.findNodeHandle)(instance)].concat(args));},
default:function _default(){}})();

};

result.updateView=function(instance,props){
var native=function native(){return _reactNative.UIManager.updateView((0,_reactNative.findNodeHandle)(instance),realViewName,props);};
_reactNative.Platform.select({
ios:native,
android:native,
default:function _default(){}})();

};

if(componentOverrides){
var _overrides=componentOverrides[version];
if(_overrides){
if(__DEV__){
if(typeof _overrides!=='function'){
console.error((0,_dedent2.default)(_templateObject2,
PRIMARY_VIEW_NAME,
version,
typeof _overrides));

}
}

result=_overrides(nativeComponent,nativeModule);

if(__DEV__){
if(typeof result!=='function'){
console.error((0,_dedent2.default)(_templateObject3,
PRIMARY_VIEW_NAME,
version,
typeof result));

}
}
}
}

return result;
}

module.exports=SafeComponentCreate;