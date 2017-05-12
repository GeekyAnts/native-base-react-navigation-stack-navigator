'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Linking = exports.Linking = {
  addEventListener: function addEventListener() {},
  removeEventListener: function removeEventListener() {},
  getInitialURL: function getInitialURL() {
    return Promise.reject('Unsupported platform');
  }
};

var BackAndroid = exports.BackAndroid = {
  addEventListener: function addEventListener() {}
};