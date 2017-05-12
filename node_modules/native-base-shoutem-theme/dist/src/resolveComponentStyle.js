Object.defineProperty(exports,"__esModule",{value:true});exports.














































































































resolveComponentStyle=resolveComponentStyle;var _lodash=require('lodash');var _lodash2=_interopRequireDefault(_lodash);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function isStyleVariant(propertyName){return /^\./.test(propertyName);}function isChildStyle(propertyName){return /(^[^\.].*\.)|^\*$/.test(propertyName);}function splitStyle(style){return _lodash2.default.reduce(style,function(result,value,key){var styleSection=result.componentStyle;if(isStyleVariant(key)){styleSection=result.styleVariants;}else if(isChildStyle(key)){styleSection=result.childrenStyle;}styleSection[key]=value;return result;},{componentStyle:{},styleVariants:{},childrenStyle:{}});}function customMerge(obj1,obj2){var objToReturn={};var property1=void 0,property2=void 0;if(!obj1){return obj2;}else if(!obj2){return obj1;}for(property1 in obj1){for(property2 in obj2){if(property1===property2){if(typeof obj1[property1]!=='object'||typeof obj2[property1]!=='object'||!obj2[property1]||!obj1[property1]){objToReturn[property1]=obj2[property1];}else{objToReturn[property1]=customMerge(obj1[property1],obj2[property1]);}}else{if(objToReturn[property1]===undefined)objToReturn[property1]=obj1[property1];if(objToReturn[property2]===undefined)objToReturn[property2]=obj2[property2];}}}return objToReturn;}function resolveComponentStyle(
componentName)




{var styleNames=arguments.length>1&&arguments[1]!==undefined?arguments[1]:[];var themeStyle=arguments.length>2&&arguments[2]!==undefined?arguments[2]:{};var parentStyle=arguments.length>3&&arguments[3]!==undefined?arguments[3]:{};var themeCache=arguments[4];












var mergedStyle=customMerge(themeStyle,parentStyle[componentName]);
styleNames.forEach(function(sn,index){
mergedStyle=customMerge(mergedStyle,themeStyle[''+sn]);
});

styleNames.forEach(function(sn,index){
mergedStyle=customMerge(mergedStyle,parentStyle[''+componentName+sn]);
});













var resolvedStyle=customMerge(mergedStyle,parentStyle[componentName]);

styleNames.forEach(function(sn,index){
resolvedStyle=customMerge(resolvedStyle,mergedStyle[''+sn]);
});

styleNames.forEach(function(sn,index){
resolvedStyle=customMerge(resolvedStyle,parentStyle[''+componentName+sn]);
});

return resolvedStyle;
}
//# sourceMappingURL=resolveComponentStyle.js.map