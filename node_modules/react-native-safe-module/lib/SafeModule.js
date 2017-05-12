var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _templateObject=_taggedTemplateLiteral(['\n      SafeModule.module(...) was invoked without any options parameter.\n    '],['\n      SafeModule.module(...) was invoked without any options parameter.\n    ']),_templateObject2=_taggedTemplateLiteral(['\n      SafeModule.module(...) requires a moduleName property to be specified.\n    '],['\n      SafeModule.module(...) requires a moduleName property to be specified.\n    ']),_templateObject3=_taggedTemplateLiteral(['\n      Missing a "mock" parameter.\n    '],['\n      Missing a "mock" parameter.\n    ']);var _dedent=require('dedent');var _dedent2=_interopRequireDefault(_dedent);
var _EventEmitter=require('./EventEmitter');var _EventEmitter2=_interopRequireDefault(_EventEmitter);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _taggedTemplateLiteral(strings,raw){return Object.freeze(Object.defineProperties(strings,{raw:{value:Object.freeze(raw)}}));}

var create=function SafeModuleCreate(options){
if(!options){
throw new Error((0,_dedent2.default)(_templateObject));


}var

moduleName=


options.moduleName;var mock=options.mock;var isEventEmitter=options.isEventEmitter;

if(!moduleName){
throw new Error((0,_dedent2.default)(_templateObject2));


}

if(!mock){
throw new Error((0,_dedent2.default)(_templateObject3));


}

var result={};

if(isEventEmitter){
// TODO(lmr): should this be put inside of a try/catch?
result.emitter=new _EventEmitter2.default();
}

_extends(result,mock);

return result;
};

module.exports=create;