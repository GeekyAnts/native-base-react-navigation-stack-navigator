Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}// A basic, minimalist EventEmitter

// Subscription { remove() {} }
var
EventEmitter=function(){
function EventEmitter(){_classCallCheck(this,EventEmitter);
this.registry={};
}_createClass(EventEmitter,[{key:"addListener",value:function addListener(

eventType,listener){var _this=this;
if(!this.registry[eventType]){
this.registry[eventType]=[];
}
this.registry[eventType].push(listener);
return{remove:function remove(){return _this.removeListener(eventType,listener);}};
}},{key:"once",value:function once(

eventType,listener,context){
var h=function h(){for(var _len=arguments.length,args=Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key];}
result.remove();
listener.apply(context,args);
};
var result=this.addListener(eventType,h);
return result;
}},{key:"removeAllListeners",value:function removeAllListeners(

eventType){
this.registry[eventType]=[];
}

// eslint-disable-next-line class-methods-use-this
},{key:"removeSubscription",value:function removeSubscription(subscription){
subscription.remove();
}},{key:"listeners",value:function listeners(

eventType){
return this.registry[eventType];
}},{key:"emit",value:function emit(

eventType){for(var _len2=arguments.length,args=Array(_len2>1?_len2-1:0),_key2=1;_key2<_len2;_key2++){args[_key2-1]=arguments[_key2];}
var events=this.registry[eventType];
if(!events)return;
events.forEach(function(handler){return handler.apply(undefined,args);});
}},{key:"removeListener",value:function removeListener(

eventType,listener){
var events=this.registry[eventType];
if(!events)return;
var index=events.indexOf(listener);
if(index===-1)return;
events.splice(index,1);
if(events.length===0){
delete this.registry[eventType];
}
}}]);return EventEmitter;}();exports.default=EventEmitter;