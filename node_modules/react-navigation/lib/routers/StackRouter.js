'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _pathToRegexp = require('path-to-regexp');

var _pathToRegexp2 = _interopRequireDefault(_pathToRegexp);

var _NavigationActions = require('../NavigationActions');

var _NavigationActions2 = _interopRequireDefault(_NavigationActions);

var _createConfigGetter = require('./createConfigGetter');

var _createConfigGetter2 = _interopRequireDefault(_createConfigGetter);

var _getScreenForRouteName = require('./getScreenForRouteName');

var _getScreenForRouteName2 = _interopRequireDefault(_getScreenForRouteName);

var _StateUtils = require('../StateUtils');

var _StateUtils2 = _interopRequireDefault(_StateUtils);

var _validateRouteConfigMap = require('./validateRouteConfigMap');

var _validateRouteConfigMap2 = _interopRequireDefault(_validateRouteConfigMap);

var _getScreenConfigDeprecated = require('./getScreenConfigDeprecated');

var _getScreenConfigDeprecated2 = _interopRequireDefault(_getScreenConfigDeprecated);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var babelPluginFlowReactPropTypes_proptype_NavigationStackRouterConfig = require('../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationStackRouterConfig || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_NavigationStackAction = require('../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationStackAction || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_NavigationState = require('../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationState || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_NavigationParams = require('../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationParams || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_NavigationResetAction = require('../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationResetAction || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_NavigationRouteConfigMap = require('../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationRouteConfigMap || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_NavigationRouter = require('../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationRouter || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_NavigationNavigateAction = require('../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationNavigateAction || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_NavigationComponent = require('../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationComponent || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_NavigationAction = require('../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationAction || require('react').PropTypes.any;

var uniqueBaseId = 'id-' + Date.now();
var uuidCount = 0;
function _getUuid() {
  return uniqueBaseId + '-' + uuidCount++;
}

exports.default = function (routeConfigs) {
  var stackConfig = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  // Fail fast on invalid route definitions
  (0, _validateRouteConfigMap2.default)(routeConfigs);

  var childRouters = {};
  var routeNames = Object.keys(routeConfigs);

  routeNames.forEach(function (routeName) {
    var screen = (0, _getScreenForRouteName2.default)(routeConfigs, routeName);
    if (screen && screen.router) {
      // If it has a router it's a navigator.
      childRouters[routeName] = screen.router;
    } else {
      // If it doesn't have router it's an ordinary React component.
      childRouters[routeName] = null;
    }
  });

  var initialRouteParams = stackConfig.initialRouteParams;


  var initialRouteName = stackConfig.initialRouteName || routeNames[0];

  var initialChildRouter = childRouters[initialRouteName];
  var paths = stackConfig.paths || {};

  routeNames.forEach(function (routeName) {
    var pathPattern = paths[routeName] || routeConfigs[routeName].path;
    var matchExact = !!pathPattern && !childRouters[routeName];
    if (typeof pathPattern !== 'string') {
      pathPattern = routeName;
    }
    var keys = [];
    var re = (0, _pathToRegexp2.default)(pathPattern, keys);
    if (!matchExact) {
      var wildcardRe = (0, _pathToRegexp2.default)(pathPattern + '/*', keys);
      re = new RegExp('(?:' + re.source + ')|(?:' + wildcardRe.source + ')');
    }
    /* $FlowFixMe */
    paths[routeName] = { re: re, keys: keys, toPath: _pathToRegexp2.default.compile(pathPattern) };
  });

  return {
    getComponentForState: function getComponentForState(state) {
      var activeChildRoute = state.routes[state.index];
      var routeName = activeChildRoute.routeName;

      if (childRouters[routeName]) {
        return childRouters[routeName].getComponentForState(activeChildRoute);
      }
      return (0, _getScreenForRouteName2.default)(routeConfigs, routeName);
    },
    getComponentForRouteName: function getComponentForRouteName(routeName) {
      return (0, _getScreenForRouteName2.default)(routeConfigs, routeName);
    },
    getStateForAction: function getStateForAction(passedAction, state) {
      var action = _NavigationActions2.default.mapDeprecatedActionAndWarn(passedAction);

      // Set up the initial state if needed
      if (!state) {
        var route = {};
        if (action.type === _NavigationActions2.default.NAVIGATE && childRouters[action.routeName] !== undefined) {
          return {
            index: 0,
            routes: [_extends({}, action, {
              type: undefined,
              key: 'Init'
            })]
          };
        }
        if (initialChildRouter) {
          route = initialChildRouter.getStateForAction(_NavigationActions2.default.navigate({
            routeName: initialRouteName,
            params: initialRouteParams
          }));
        }
        var params = (route.params || action.params || initialRouteParams) && _extends({}, route.params || {}, action.params || {}, initialRouteParams || {});
        route = _extends({}, route, {
          routeName: initialRouteName,
          key: 'Init'
        }, params ? { params: params } : {});
        // eslint-disable-next-line no-param-reassign
        state = {
          index: 0,
          routes: [route]
        };
      }

      // Check if a child scene wants to handle the action as long as it is not a reset to the root stack
      if (action.type !== _NavigationActions2.default.RESET || action.key !== null) {
        var keyIndex = action.key ? _StateUtils2.default.indexOf(state, action.key) : -1;
        var childIndex = keyIndex >= 0 ? keyIndex : state.index;
        var childRoute = state.routes[childIndex];
        var childRouter = childRouters[childRoute.routeName];
        if (childRouter) {
          var _route = childRouter.getStateForAction(action, childRoute);
          if (_route === null) {
            return state;
          }
          if (_route && _route !== childRoute) {
            return _StateUtils2.default.replaceAt(state, childRoute.key, _route);
          }
        }
      }

      // Handle explicit push navigation action
      if (action.type === _NavigationActions2.default.NAVIGATE && childRouters[action.routeName] !== undefined) {
        var _childRouter = childRouters[action.routeName];
        var _route2 = void 0;
        if (_childRouter) {
          var childAction = action.action || _NavigationActions2.default.init({ params: action.params });
          _route2 = _extends({
            params: action.params
          }, _childRouter.getStateForAction(childAction), {
            key: _getUuid(),
            routeName: action.routeName
          });
        } else {
          _route2 = {
            params: action.params,
            key: _getUuid(),
            routeName: action.routeName
          };
        }
        return _StateUtils2.default.push(state, _route2);
      }

      // Handle navigation to other child routers that are not yet pushed
      if (action.type === _NavigationActions2.default.NAVIGATE) {
        var childRouterNames = Object.keys(childRouters);
        for (var i = 0; i < childRouterNames.length; i++) {
          var childRouterName = childRouterNames[i];
          var _childRouter2 = childRouters[childRouterName];
          if (_childRouter2) {
            // For each child router, start with a blank state
            var initChildRoute = _childRouter2.getStateForAction(_NavigationActions2.default.init());
            // Then check to see if the router handles our navigate action
            var navigatedChildRoute = _childRouter2.getStateForAction(action, initChildRoute);
            var routeToPush = null;
            if (navigatedChildRoute === null) {
              // Push the route if the router has 'handled' the action and returned null
              routeToPush = initChildRoute;
            } else if (navigatedChildRoute !== initChildRoute) {
              // Push the route if the state has changed in response to this navigation
              routeToPush = navigatedChildRoute;
            }
            if (routeToPush) {
              return _StateUtils2.default.push(state, _extends({}, routeToPush, {
                key: _getUuid(),
                routeName: childRouterName
              }));
            }
          }
        }
      }

      if (action.type === _NavigationActions2.default.SET_PARAMS) {
        var lastRoute = state.routes.find(
        /* $FlowFixMe */
        function (route) {
          return route.key === action.key;
        });
        if (lastRoute) {
          var _params = _extends({}, lastRoute.params, action.params);
          var routes = [].concat(_toConsumableArray(state.routes));
          routes[state.routes.indexOf(lastRoute)] = _extends({}, lastRoute, {
            params: _params
          });
          return _extends({}, state, {
            routes: routes
          });
        }
      }

      if (action.type === _NavigationActions2.default.RESET) {
        var resetAction = action;

        return _extends({}, state, {
          routes: resetAction.actions.map(function (childAction, index) {
            var router = childRouters[childAction.routeName];
            if (router) {
              return _extends({}, childAction, router.getStateForAction(childAction), {
                routeName: childAction.routeName,
                key: 'Init' + index
              });
            }
            var route = _extends({}, childAction, {
              key: 'Init' + index
            });
            delete route.type;
            return route;
          }),
          index: action.index
        });
      }

      if (action.type === _NavigationActions2.default.BACK) {
        var backRouteIndex = null;
        if (action.key) {
          var backRoute = state.routes.find(
          /* $FlowFixMe */
          function (route) {
            return route.key === action.key;
          });
          /* $FlowFixMe */
          backRouteIndex = state.routes.indexOf(backRoute);
        }
        if (backRouteIndex == null) {
          return _StateUtils2.default.pop(state);
        }
        if (backRouteIndex > 0) {
          return _extends({}, state, {
            routes: state.routes.slice(0, backRouteIndex),
            index: backRouteIndex - 1
          });
        }
      }
      return state;
    },
    getPathAndParamsForState: function getPathAndParamsForState(state) {
      var route = state.routes[state.index];
      var routeName = route.routeName;
      var screen = (0, _getScreenForRouteName2.default)(routeConfigs, routeName);
      /* $FlowFixMe */
      var subPath = paths[routeName].toPath(route.params);
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
    getActionForPathAndParams: function getActionForPathAndParams(pathToResolve) {
      // If the path is empty (null or empty string)
      // just return the initial route action
      if (!pathToResolve) {
        return _NavigationActions2.default.navigate({
          routeName: initialRouteName
        });
      }

      var _pathToResolve$split = pathToResolve.split('?'),
          _pathToResolve$split2 = _slicedToArray(_pathToResolve$split, 2),
          pathNameToResolve = _pathToResolve$split2[0],
          queryString = _pathToResolve$split2[1];

      // Attempt to match `pathNameToResolve` with a route in this router's
      // routeConfigs


      var matchedRouteName = void 0;
      var pathMatch = void 0;
      var pathMatchKeys = void 0;

      // eslint-disable-next-line no-restricted-syntax
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = Object.entries(paths)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _step$value = _slicedToArray(_step.value, 2),
              routeName = _step$value[0],
              path = _step$value[1];

          /* $FlowFixMe */
          var re = path.re,
              keys = path.keys;

          pathMatch = re.exec(pathNameToResolve);
          if (pathMatch && pathMatch.length) {
            pathMatchKeys = keys;
            matchedRouteName = routeName;
            break;
          }
        }

        // We didn't match -- return null
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      if (!matchedRouteName) {
        return null;
      }

      // Determine nested actions:
      // If our matched route for this router is a child router,
      // get the action for the path AFTER the matched path for this
      // router
      var nestedAction = void 0;
      if (childRouters[matchedRouteName]) {
        nestedAction = childRouters[matchedRouteName].getActionForPathAndParams(
        /* $FlowFixMe */
        pathMatch.slice(pathMatchKeys.length).join('/'));
      }

      // reduce the items of the query string. any query params may
      // be overridden by path params
      var queryParams = (queryString || '').split('&').reduce(function (result, item) {
        if (item !== '') {
          var nextResult = result || {};

          var _item$split = item.split('='),
              _item$split2 = _slicedToArray(_item$split, 2),
              key = _item$split2[0],
              value = _item$split2[1];

          nextResult[key] = value;
          return nextResult;
        }
        return result;
      }, null);

      // reduce the matched pieces of the path into the params
      // of the route. `params` is null if there are no params.
      /* $FlowFixMe */
      var params = pathMatch.slice(1).reduce(function (result, matchResult, i) {
        var key = pathMatchKeys[i];
        if (key.asterisk || !key) {
          return result;
        }
        var nextResult = result || {};
        var paramName = key.name;
        nextResult[paramName] = matchResult;
        return nextResult;
      }, queryParams);

      return _NavigationActions2.default.navigate(_extends({
        routeName: matchedRouteName
      }, params ? { params: params } : {}, nestedAction ? { action: nestedAction } : {}));
    },


    getScreenOptions: (0, _createConfigGetter2.default)(routeConfigs, stackConfig.navigationOptions),

    getScreenConfig: _getScreenConfigDeprecated2.default
  };
};