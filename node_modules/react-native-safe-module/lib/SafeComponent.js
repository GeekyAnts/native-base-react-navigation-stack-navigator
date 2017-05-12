var _templateObject=_taggedTemplateLiteral(['\n      SafeModule.create(...) was invoked without any options parameter.\n    '],['\n      SafeModule.create(...) was invoked without any options parameter.\n    ']);var _dedent=require('dedent');var _dedent2=_interopRequireDefault(_dedent);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _taggedTemplateLiteral(strings,raw){return Object.freeze(Object.defineProperties(strings,{raw:{value:Object.freeze(raw)}}));}

function SafeComponentCreate(options){
if(!options){
throw new Error((0,_dedent2.default)(_templateObject));


}var

viewName=

options.viewName;var mockComponent=options.mockComponent;

if(!viewName){
throw new Error('\n      SafeModule.component(...) requires a viewName property to be specified.\n    ');


}

if(!mockComponent){
throw new Error('\n      SafeModule.component(...) requires a mockComponent property to be specified.\n    ');


}
return mockComponent;
}

module.exports=SafeComponentCreate;