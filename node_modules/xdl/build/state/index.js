'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connect = exports.actions = exports.store = exports.reducers = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _reactRedux;

function _load_reactRedux() {
  return _reactRedux = require('react-redux');
}

var _notifications;

function _load_notifications() {
  return _notifications = _interopRequireWildcard(require('./reducers/notifications'));
}

var _projects;

function _load_projects() {
  return _projects = _interopRequireWildcard(require('./reducers/projects'));
}

var _store;

function _load_store() {
  return _store = require('./store');
}

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// Reducers
const reducers = exports.reducers = {
  notifications: (_notifications || _load_notifications()).reducer,
  projects: (_projects || _load_projects()).reducer
};

const store = exports.store = (0, (_store || _load_store()).createXDLStore)(reducers);

// Actions
const actions = exports.actions = {
  notifications: (_notifications || _load_notifications()).actions,
  projects: (_projects || _load_projects()).actions
};

const connect = exports.connect = (mapStateToProps, mapDispatchToProps, mergeProps, options = {}) => {
  return (0, (_reactRedux || _load_reactRedux()).connect)(mapStateToProps, mapDispatchToProps, mergeProps, _extends({
    storeKey: 'xdlStore'
  }, options));
};
//# sourceMappingURL=../__sourcemaps__/state/index.js.map
