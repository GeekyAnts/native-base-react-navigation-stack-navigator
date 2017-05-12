'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = function (navigation) {
  return _extends({}, navigation, {
    goBack: function goBack(key) {
      return navigation.dispatch(_NavigationActions2.default.back({
        key: key === undefined ? navigation.state.key : key
      }));
    },
    navigate: function navigate(routeName, params, action) {
      return navigation.dispatch(_NavigationActions2.default.navigate({
        routeName: routeName,
        params: params,
        action: action
      }));
    },
    /**
     * For updating current route params. For example the nav bar title and
     * buttons are based on the route params.
     * This means `setParams` can be used to update nav bar for example.
     */
    setParams: function setParams(params) {
      return navigation.dispatch(_NavigationActions2.default.setParams({
        params: params,
        key: navigation.state.key
      }));
    }
  });
};

var _NavigationActions = require('./NavigationActions');

var _NavigationActions2 = _interopRequireDefault(_NavigationActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var babelPluginFlowReactPropTypes_proptype_NavigationParams = require('./TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationParams || require('react').PropTypes.any; /**
                                                                                                                                                                                      * 
                                                                                                                                                                                      *
                                                                                                                                                                                      * Helpers for navigation.
                                                                                                                                                                                      */

var babelPluginFlowReactPropTypes_proptype_NavigationProp = require('./TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationProp || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_NavigationAction = require('./TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationAction || require('react').PropTypes.any;