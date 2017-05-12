'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _CardStack = require('./CardStack');

var _CardStack2 = _interopRequireDefault(_CardStack);

var _CardStackStyleInterpolator = require('./CardStackStyleInterpolator');

var _CardStackStyleInterpolator2 = _interopRequireDefault(_CardStackStyleInterpolator);

var _Transitioner = require('./Transitioner');

var _Transitioner2 = _interopRequireDefault(_Transitioner);

var _TransitionConfigs = require('./TransitionConfigs');

var _TransitionConfigs2 = _interopRequireDefault(_TransitionConfigs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var babelPluginFlowReactPropTypes_proptype_TransitionConfig = require('../TypeDefinition').babelPluginFlowReactPropTypes_proptype_TransitionConfig || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_Style = require('../TypeDefinition').babelPluginFlowReactPropTypes_proptype_Style || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_HeaderMode = require('../TypeDefinition').babelPluginFlowReactPropTypes_proptype_HeaderMode || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_NavigationRouter = require('../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationRouter || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_NavigationTransitionProps = require('../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationTransitionProps || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_NavigationState = require('../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationState || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_NavigationStackScreenOptions = require('../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationStackScreenOptions || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_NavigationScreenProp = require('../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationScreenProp || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_NavigationSceneRenderer = require('../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationSceneRenderer || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_NavigationAction = require('../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationAction || require('react').PropTypes.any;

var NativeAnimatedModule = _reactNative.NativeModules && _reactNative.NativeModules.NativeAnimatedModule;

var CardStackTransitioner = function (_Component) {
  _inherits(CardStackTransitioner, _Component);

  function CardStackTransitioner() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, CardStackTransitioner);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = CardStackTransitioner.__proto__ || Object.getPrototypeOf(CardStackTransitioner)).call.apply(_ref, [this].concat(args))), _this), _this._configureTransition = function (
    // props for the new screen
    transitionProps, prevTransitionProps) {
      var isModal = _this.props.mode === 'modal';
      // Copy the object so we can assign useNativeDriver below
      // (avoid Flow error, transitionSpec is of type NavigationTransitionSpec).
      var transitionSpec = _extends({}, _TransitionConfigs2.default.getTransitionConfig(_this.props.transitionConfig, transitionProps, prevTransitionProps, isModal).transitionSpec);
      if (!!NativeAnimatedModule &&
      // Native animation support also depends on the transforms used:
      _CardStackStyleInterpolator2.default.canUseNativeDriver(isModal)) {
        // Internal undocumented prop
        transitionSpec.useNativeDriver = true;
      }
      return transitionSpec;
    }, _this._render = function (props) {
      var _this$props = _this.props,
          screenProps = _this$props.screenProps,
          headerMode = _this$props.headerMode,
          mode = _this$props.mode,
          router = _this$props.router,
          cardStyle = _this$props.cardStyle,
          transitionConfig = _this$props.transitionConfig,
          style = _this$props.style;

      return _react2.default.createElement(_CardStack2.default, _extends({
        screenProps: screenProps,
        headerMode: headerMode,
        mode: mode,
        router: router,
        cardStyle: cardStyle,
        transitionConfig: transitionConfig,
        style: style
      }, props));
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(CardStackTransitioner, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_Transitioner2.default, {
        configureTransition: this._configureTransition,
        navigation: this.props.navigation,
        render: this._render,
        style: this.props.style,
        onTransitionStart: this.props.onTransitionStart,
        onTransitionEnd: this.props.onTransitionEnd
      });
    }
  }]);

  return CardStackTransitioner;
}(_react.Component);

CardStackTransitioner.defaultProps = {
  mode: 'card'
};
CardStackTransitioner.propTypes = {
  screenProps: require('prop-types').shape({}),
  headerMode: babelPluginFlowReactPropTypes_proptype_HeaderMode,
  mode: require('prop-types').oneOf(['card', 'modal']).isRequired,
  navigation: babelPluginFlowReactPropTypes_proptype_NavigationScreenProp,
  router: babelPluginFlowReactPropTypes_proptype_NavigationRouter,
  cardStyle: babelPluginFlowReactPropTypes_proptype_Style,
  onTransitionStart: require('prop-types').func,
  onTransitionEnd: require('prop-types').func,
  style: babelPluginFlowReactPropTypes_proptype_Style,
  transitionConfig: require('prop-types').func
};
exports.default = CardStackTransitioner;