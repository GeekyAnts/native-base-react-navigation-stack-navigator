'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _invariant = require('fbjs/lib/invariant');

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Utilities to perform atomic operation with navigate state and routes.
 *
 * ```javascript
 * const state1 = {key: 'screen 1'};
 * const state2 = NavigationStateUtils.push(state1, {key: 'screen 2'});
 * ```
 */
var babelPluginFlowReactPropTypes_proptype_NavigationState = require('./TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationState || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_NavigationRoute = require('./TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationRoute || require('react').PropTypes.any;

var StateUtils = {
  /**
   * Gets a route by key. If the route isn't found, returns `null`.
   */
  get: function get(state, key) {
    return state.routes.find(function (route) {
      return route.key === key;
    }) || null;
  },


  /**
   * Returns the first index at which a given route's key can be found in the
   * routes of the navigation state, or -1 if it is not present.
   */
  indexOf: function indexOf(state, key) {
    return state.routes.map(function (route) {
      return route.key;
    }).indexOf(key);
  },


  /**
   * Returns `true` at which a given route's key can be found in the
   * routes of the navigation state.
   */
  has: function has(state, key) {
    return !!state.routes.some(function (route) {
      return route.key === key;
    });
  },


  /**
   * Pushes a new route into the navigation state.
   * Note that this moves the index to the positon to where the last route in the
   * stack is at.
   */
  push: function push(state, route) {
    (0, _invariant2.default)(StateUtils.indexOf(state, route.key) === -1, 'should not push route with duplicated key %s', route.key);

    var routes = state.routes.slice();
    routes.push(route);

    return _extends({}, state, {
      index: routes.length - 1,
      routes: routes
    });
  },


  /**
   * Pops out a route from the navigation state.
   * Note that this moves the index to the positon to where the last route in the
   * stack is at.
   */
  pop: function pop(state) {
    if (state.index <= 0) {
      // [Note]: Over-popping does not throw error. Instead, it will be no-op.
      return state;
    }
    var routes = state.routes.slice(0, -1);
    return _extends({}, state, {
      index: routes.length - 1,
      routes: routes
    });
  },


  /**
   * Sets the focused route of the navigation state by index.
   */
  jumpToIndex: function jumpToIndex(state, index) {
    if (index === state.index) {
      return state;
    }

    (0, _invariant2.default)(!!state.routes[index], 'invalid index %s to jump to', index);

    return _extends({}, state, {
      index: index
    });
  },


  /**
   * Sets the focused route of the navigation state by key.
   */
  jumpTo: function jumpTo(state, key) {
    var index = StateUtils.indexOf(state, key);
    return StateUtils.jumpToIndex(state, index);
  },


  /**
   * Sets the focused route to the previous route.
   */
  back: function back(state) {
    var index = state.index - 1;
    var route = state.routes[index];
    return route ? StateUtils.jumpToIndex(state, index) : state;
  },


  /**
   * Sets the focused route to the next route.
   */
  forward: function forward(state) {
    var index = state.index + 1;
    var route = state.routes[index];
    return route ? StateUtils.jumpToIndex(state, index) : state;
  },


  /**
   * Replace a route by a key.
   * Note that this moves the index to the positon to where the new route in the
   * stack is at.
   */
  replaceAt: function replaceAt(state, key, route) {
    var index = StateUtils.indexOf(state, key);
    return StateUtils.replaceAtIndex(state, index, route);
  },


  /**
   * Replace a route by a index.
   * Note that this moves the index to the positon to where the new route in the
   * stack is at.
   */
  replaceAtIndex: function replaceAtIndex(state, index, route) {
    (0, _invariant2.default)(!!state.routes[index], 'invalid index %s for replacing route %s', index, route.key);

    if (state.routes[index] === route) {
      return state;
    }

    var routes = state.routes.slice();
    routes[index] = route;

    return _extends({}, state, {
      index: index,
      routes: routes
    });
  },


  /**
   * Resets all routes.
   * Note that this moves the index to the positon to where the last route in the
   * stack is at if the param `index` isn't provided.
   */
  reset: function reset(state, routes, index) {
    (0, _invariant2.default)(routes.length && Array.isArray(routes), 'invalid routes to replace');

    var nextIndex = index === undefined ? routes.length - 1 : index;

    if (state.routes.length === routes.length && state.index === nextIndex) {
      var compare = function compare(route, ii) {
        return routes[ii] === route;
      };
      if (state.routes.every(compare)) {
        return state;
      }
    }

    (0, _invariant2.default)(!!routes[nextIndex], 'invalid index %s to reset', nextIndex);

    return _extends({}, state, {
      index: nextIndex,
      routes: routes
    });
  }
};

exports.default = StateUtils;