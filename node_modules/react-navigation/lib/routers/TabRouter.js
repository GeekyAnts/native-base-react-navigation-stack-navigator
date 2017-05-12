'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _invariant = require('fbjs/lib/invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _getScreenForRouteName = require('./getScreenForRouteName');

var _getScreenForRouteName2 = _interopRequireDefault(_getScreenForRouteName);

var _createConfigGetter = require('./createConfigGetter');

var _createConfigGetter2 = _interopRequireDefault(_createConfigGetter);

var _NavigationActions = require('../NavigationActions');

var _NavigationActions2 = _interopRequireDefault(_NavigationActions);

var _validateRouteConfigMap = require('./validateRouteConfigMap');

var _validateRouteConfigMap2 = _interopRequireDefault(_validateRouteConfigMap);

var _getScreenConfigDeprecated = require('./getScreenConfigDeprecated');

var _getScreenConfigDeprecated2 = _interopRequireDefault(_getScreenConfigDeprecated);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var babelPluginFlowReactPropTypes_proptype_NavigationTabScreenOptions = require('../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationTabScreenOptions || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_NavigationTabRouterConfig = require('../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationTabRouterConfig || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_NavigationNavigateAction = require('../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationNavigateAction || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_NavigationRoute = require('../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationRoute || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_NavigationRouter = require('../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationRouter || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_NavigationParams = require('../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationParams || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_NavigationRouteConfigMap = require('../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationRouteConfigMap || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_NavigationState = require('../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationState || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_NavigationScreenComponent = require('../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationScreenComponent || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_NavigationComponent = require('../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationComponent || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_NavigationAction = require('../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationAction || require('react').PropTypes.any;

exports.default = function (routeConfigs) {
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  // Fail fast on invalid route definitions
  (0, _validateRouteConfigMap2.default)(routeConfigs);

  var order = config.order || Object.keys(routeConfigs);
  var paths = config.paths || {};
  var initialRouteName = config.initialRouteName || order[0];
  var initialRouteIndex = order.indexOf(initialRouteName);
  var backBehavior = config.backBehavior || 'initialRoute';
  var shouldBackNavigateToInitialRoute = backBehavior === 'initialRoute';
  var tabRouters = {};
  order.forEach(function (routeName) {
    var routeConfig = routeConfigs[routeName];
    paths[routeName] = typeof routeConfig.path === 'string' ? routeConfig.path : routeName;
    tabRouters[routeName] = null;
    if (routeConfig.screen && routeConfig.screen.router) {
      tabRouters[routeName] = routeConfig.screen.router;
    }
  });
  (0, _invariant2.default)(initialRouteIndex !== -1, 'Invalid initialRouteName \'' + initialRouteName + '\' for TabRouter. ' + ('Should be one of ' + order.map(function (n) {
    return '"' + n + '"';
  }).join(', ')));
  return {
    getStateForAction: function getStateForAction(action, inputState) {
      // eslint-disable-next-line no-param-reassign
      action = _NavigationActions2.default.mapDeprecatedActionAndWarn(action);

      // Establish a default state
      var state = inputState;
      if (!state) {
        var _routes = order.map(function (routeName) {
          var tabRouter = tabRouters[routeName];
          if (tabRouter) {
            var childAction = action.action || _NavigationActions2.default.init(_extends({}, action.params ? { params: action.params } : {}));
            return _extends({}, tabRouter.getStateForAction(childAction), {
              key: routeName,
              routeName: routeName
            });
          }
          return {
            key: routeName,
            routeName: routeName
          };
        });
        state = {
          routes: _routes,
          index: initialRouteIndex
        };
        // console.log(`${order.join('-')}: Initial state`, {state});
      }

      if (action.type === _NavigationActions2.default.INIT) {
        (function () {
          // Merge any params from the action into all the child routes
          var _action = action,
              params = _action.params;

          if (params) {
            state.routes = state.routes.map(function (route) {
              return _extends({}, route, {
                params: _extends({}, route.params, params)
              });
            });
          }
        })();
      }

      // Let the current tab handle it
      var activeTabLastState = state.routes[state.index];
      var activeTabRouter = tabRouters[order[state.index]];
      if (activeTabRouter) {
        var activeTabState = activeTabRouter.getStateForAction(action.action || action, activeTabLastState);
        if (!activeTabState && inputState) {
          return null;
        }
        if (activeTabState && activeTabState !== activeTabLastState) {
          var _routes2 = [].concat(_toConsumableArray(state.routes));
          _routes2[state.index] = activeTabState;
          return _extends({}, state, {
            routes: _routes2
          });
        }
      }

      // Handle tab changing. Do this after letting the current tab try to
      // handle the action, to allow inner tabs to change first
      var activeTabIndex = state.index;
      var isBackEligible = action.key == null || action.key === activeTabLastState.key;
      if (action.type === _NavigationActions2.default.BACK && isBackEligible && shouldBackNavigateToInitialRoute) {
        activeTabIndex = initialRouteIndex;
      }
      var didNavigate = false;
      if (action.type === _NavigationActions2.default.NAVIGATE) {
        var _ret2 = function () {
          var navigateAction = action;
          didNavigate = !!order.find(function (tabId, i) {
            if (tabId === navigateAction.routeName) {
              activeTabIndex = i;
              return true;
            }
            return false;
          });
          if (didNavigate) {
            var childState = state.routes[activeTabIndex];
            var newChildState = void 0;

            var tabRouter = tabRouters[action.routeName];

            if (action.action) {
              newChildState = tabRouter ? tabRouter.getStateForAction(action.action, childState) : null;
            } else if (!tabRouter && action.params) {
              newChildState = _extends({}, childState, {
                params: _extends({}, childState.params || {}, action.params)
              });
            }

            if (newChildState && newChildState !== childState) {
              var _routes3 = [].concat(_toConsumableArray(state.routes));
              _routes3[activeTabIndex] = newChildState;
              return {
                v: _extends({}, state, {
                  routes: _routes3,
                  index: activeTabIndex
                })
              };
            }
          }
        }();

        if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object") return _ret2.v;
      }
      if (action.type === _NavigationActions2.default.SET_PARAMS) {
        var lastRoute = state.routes.find(
        /* $FlowFixMe */
        function (route) {
          return route.key === action.key;
        });
        if (lastRoute) {
          var params = _extends({}, lastRoute.params, action.params);
          var _routes4 = [].concat(_toConsumableArray(state.routes));
          _routes4[state.routes.indexOf(lastRoute)] = _extends({}, lastRoute, {
            params: params
          });
          return _extends({}, state, {
            routes: _routes4
          });
        }
      }
      if (activeTabIndex !== state.index) {
        return _extends({}, state, {
          index: activeTabIndex
        });
      } else if (didNavigate && !inputState) {
        return state;
      } else if (didNavigate) {
        return null;
      }

      // Let other tabs handle it and switch to the first tab that returns a new state
      var index = state.index;
      /* $FlowFixMe */
      var routes = state.routes;
      order.find(function (tabId, i) {
        var tabRouter = tabRouters[tabId];
        if (i === index) {
          return false;
        }
        var tabState = routes[i];
        if (tabRouter) {
          // console.log(`${order.join('-')}: Processing child router:`, {action, tabState});
          tabState = tabRouter.getStateForAction(action, tabState);
        }
        if (!tabState) {
          index = i;
          return true;
        }
        if (tabState !== routes[i]) {
          routes = [].concat(_toConsumableArray(routes));
          routes[i] = tabState;
          index = i;
          return true;
        }
        return false;
      });
      // console.log(`${order.join('-')}: Processed other tabs:`, {lastIndex: state.index, index});

      if (index !== state.index || routes !== state.routes) {
        return _extends({}, state, {
          index: index,
          routes: routes
        });
      }
      return state;
    },
    getComponentForState: function getComponentForState(state) {
      var routeName = order[state.index];
      (0, _invariant2.default)(routeName, 'There is no route defined for index ' + state.index + '. Check that\n        that you passed in a navigation state with a valid tab/screen index.');
      var childRouter = tabRouters[routeName];
      if (childRouter) {
        return childRouter.getComponentForState(state.routes[state.index]);
      }
      return (0, _getScreenForRouteName2.default)(routeConfigs, routeName);
    },
    getComponentForRouteName: function getComponentForRouteName(routeName) {
      return (0, _getScreenForRouteName2.default)(routeConfigs, routeName);
    },
    getPathAndParamsForState: function getPathAndParamsForState(state) {
      var route = state.routes[state.index];
      var routeName = order[state.index];
      var subPath = paths[routeName];
      var screen = (0, _getScreenForRouteName2.default)(routeConfigs, routeName);
      var path = subPath;
      var params = route.params;
      if (screen && screen.router) {
        // If it has a router it's a navigator.
        // If it doesn't have router it's an ordinary React component.
        var child = screen.router.getPathAndParamsForState(route);
        path = subPath ? subPath + '/' + child.path : child.path;
        params = child.params ? _extends({}, params, child.params) : params;
      }
      return {
        path: path,
        params: params
      };
    },


    /**
     * Gets an optional action, based on a relative path and query params.
     *
     * This will return null if there is no action matched
     */
    getActionForPathAndParams: function getActionForPathAndParams(path, params) {
      return order.map(function (tabId) {
        var parts = path.split('/');
        var pathToTest = paths[tabId];
        if (parts[0] === pathToTest) {
          var tabRouter = tabRouters[tabId];
          var action = _NavigationActions2.default.navigate({
            routeName: tabId
          });
          if (tabRouter && tabRouter.getActionForPathAndParams) {
            action.action = tabRouter.getActionForPathAndParams(parts.slice(1).join('/'), params);
          } else if (params) {
            action.params = params;
          }
          return action;
        }
        return null;
      }).find(function (action) {
        return !!action;
      }) || order.map(function (tabId) {
        var tabRouter = tabRouters[tabId];
        return tabRouter && tabRouter.getActionForPathAndParams(path, params);
      }).find(function (action) {
        return !!action;
      }) || null;
    },


    getScreenOptions: (0, _createConfigGetter2.default)(routeConfigs, config.navigationOptions),

    getScreenConfig: _getScreenConfigDeprecated2.default
  };
};