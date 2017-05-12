'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createXDLStore = createXDLStore;
exports.getStore = getStore;

var _redux;

function _load_redux() {
  return _redux = require('redux');
}

var _reduxLogger;

function _load_reduxLogger() {
  return _reduxLogger = _interopRequireDefault(require('redux-logger'));
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let _store;

function createXDLStore(reducers) {
  const reducer = (0, (_redux || _load_redux()).combineReducers)(reducers);

  const middleware = [];

  // Only enable logging in development
  if (process.env.NODE_ENV === 'development') {
    const logger = (0, (_reduxLogger || _load_reduxLogger()).default)({
      collapsed: true
    });
    middleware.push(logger);
  }

  const enhancer = (0, (_redux || _load_redux()).compose)((0, (_redux || _load_redux()).applyMiddleware)(...middleware));

  const store = (0, (_redux || _load_redux()).createStore)(reducer, enhancer);

  // Enable Webpack hot module replacement for reducers :)
  if (module.hot) {
    // $FlowFixMe
    module.hot.accept('./', () => {
      const nextReducers = require('./').reducers;
      store.replaceReducer((0, (_redux || _load_redux()).combineReducers)(nextReducers));
    });
  }

  _store = store;
  return store;
}

function getStore() {
  return _store;
}
//# sourceMappingURL=../__sourcemaps__/state/store.js.map
