'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = createNavigationContainer;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _invariant = require('fbjs/lib/invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _PlatformHelpers = require('./PlatformHelpers');

var _NavigationActions = require('./NavigationActions');

var _NavigationActions2 = _interopRequireDefault(_NavigationActions);

var _addNavigationHelpers = require('./addNavigationHelpers');

var _addNavigationHelpers2 = _interopRequireDefault(_addNavigationHelpers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var babelPluginFlowReactPropTypes_proptype_NavigationNavigatorProps = require('./TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationNavigatorProps || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_NavigationScreenProp = require('./TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationScreenProp || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_NavigationState = require('./TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationState || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_NavigationAction = require('./TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationAction || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_NavigationRoute = require('./TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationRoute || require('react').PropTypes.any;

/**
 * Create an HOC that injects the navigation and manages the navigation state
 * in case it's not passed from above.
 * This allows to use e.g. the StackNavigator and TabNavigator as root-level
 * components.
 */
function createNavigationContainer(Component, containerOptions) {
  (0, _invariant2.default)(typeof containerOptions === 'undefined', 'containerOptions.URIPrefix has been removed. Pass the uriPrefix prop to the navigator instead');

  var NavigationContainer = function (_React$Component) {
    _inherits(NavigationContainer, _React$Component);

    function NavigationContainer(props) {
      _classCallCheck(this, NavigationContainer);

      var _this = _possibleConstructorReturn(this, (NavigationContainer.__proto__ || Object.getPrototypeOf(NavigationContainer)).call(this, props));

      _this.subs = null;

      _this._handleOpenURL = function (url) {
        var parsedUrl = _this._urlToPathAndParams(url);
        if (parsedUrl) {
          var path = parsedUrl.path,
              params = parsedUrl.params;

          var action = Component.router.getActionForPathAndParams(path, params);
          if (action) {
            _this.dispatch(action);
          }
        }
      };

      _this.dispatch = function (action) {
        var state = _this.state;

        if (!_this._isStateful()) {
          return false;
        }
        var nav = Component.router.getStateForAction(action, state.nav);
        if (nav && nav !== state.nav) {
          _this.setState({ nav: nav }, function () {
            return _this._onNavigationStateChange(state.nav, nav, action);
          });
          return true;
        }
        return false;
      };

      _this._validateProps(props);

      _this.state = {
        nav: _this._isStateful() ? Component.router.getStateForAction(_NavigationActions2.default.init()) : null
      };
      return _this;
    }

    _createClass(NavigationContainer, [{
      key: '_isStateful',
      value: function _isStateful() {
        return !this.props.navigation;
      }
    }, {
      key: '_validateProps',
      value: function _validateProps(props) {
        if (this._isStateful()) {
          return;
        }

        var navigation = props.navigation,
            screenProps = props.screenProps,
            containerProps = _objectWithoutProperties(props, ['navigation', 'screenProps']);

        var keys = Object.keys(containerProps);

        (0, _invariant2.default)(keys.length === 0, 'This navigator has both navigation and container props, so it is ' + ('unclear if it should own its own state. Remove props: "' + keys.join(', ') + '" ') + 'if the navigator should get its state from the navigation prop. If the ' + 'navigator should maintain its own state, do not pass a navigation prop.');
      }
    }, {
      key: '_urlToPathAndParams',
      value: function _urlToPathAndParams(url) {
        var params = {};
        var delimiter = this.props.uriPrefix || '://';
        var path = url.split(delimiter)[1];
        if (!path) {
          path = url;
        }
        return {
          path: path,
          params: params
        };
      }
    }, {
      key: '_onNavigationStateChange',
      value: function _onNavigationStateChange(prevNav, nav, action) {
        if (typeof this.props.onNavigationStateChange === 'undefined' && this._isStateful()) {
          /* eslint-disable no-console */
          if (console.group) {
            console.group('Navigation Dispatch: ');
            console.log('Action: ', action);
            console.log('New State: ', nav);
            console.log('Last State: ', prevNav);
            console.groupEnd();
          } else {
            console.log('Navigation Dispatch: ', {
              action: action,
              newState: nav,
              lastState: prevNav
            });
          }
          /* eslint-enable no-console */
          return;
        }

        if (typeof this.props.onNavigationStateChange === 'function') {
          this.props.onNavigationStateChange(prevNav, nav, action);
        }
      }
    }, {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        this._validateProps(nextProps);
      }
    }, {
      key: 'componentDidMount',
      value: function componentDidMount() {
        var _this2 = this;

        if (!this._isStateful()) {
          return;
        }

        this.subs = _PlatformHelpers.BackAndroid.addEventListener('backPress', function () {
          return _this2.dispatch(_NavigationActions2.default.back());
        });

        _PlatformHelpers.Linking.addEventListener('url', function (_ref) {
          var url = _ref.url;

          _this2._handleOpenURL(url);
        });

        _PlatformHelpers.Linking.getInitialURL().then(function (url) {
          return url && _this2._handleOpenURL(url);
        });
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        _PlatformHelpers.Linking.removeEventListener('url', this._handleOpenURL);
        this.subs && this.subs.remove();
      }
    }, {
      key: 'render',
      value: function render() {
        var navigation = this.props.navigation;
        if (this._isStateful()) {
          if (!this._navigation || this._navigation.state !== this.state.nav) {
            this._navigation = (0, _addNavigationHelpers2.default)({
              dispatch: this.dispatch,
              state: this.state.nav
            });
          }
          navigation = this._navigation;
        }
        return _react2.default.createElement(Component, _extends({}, this.props, { navigation: navigation }));
      }
    }]);

    return NavigationContainer;
  }(_react2.default.Component);

  NavigationContainer.router = Component.router;


  return NavigationContainer;
}