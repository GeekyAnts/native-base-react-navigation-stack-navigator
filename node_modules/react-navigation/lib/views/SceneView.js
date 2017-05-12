'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var babelPluginFlowReactPropTypes_proptype_NavigationNavigatorProps = require('../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationNavigatorProps || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_NavigationAction = require('../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationAction || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_NavigationRoute = require('../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationRoute || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_NavigationScreenProp = require('../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationScreenProp || require('react').PropTypes.any;

var SceneView = function (_PureComponent) {
  _inherits(SceneView, _PureComponent);

  function SceneView() {
    _classCallCheck(this, SceneView);

    return _possibleConstructorReturn(this, (SceneView.__proto__ || Object.getPrototypeOf(SceneView)).apply(this, arguments));
  }

  _createClass(SceneView, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        navigation: this.props.navigation
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          screenProps = _props.screenProps,
          navigation = _props.navigation,
          Component = _props.component;


      return _react2.default.createElement(Component, { screenProps: screenProps, navigation: navigation });
    }
  }]);

  return SceneView;
}(_react.PureComponent);

SceneView.childContextTypes = {
  navigation: _propTypes2.default.object.isRequired
};
SceneView.propTypes = {
  screenProps: require('prop-types').shape({}),
  navigation: babelPluginFlowReactPropTypes_proptype_NavigationScreenProp,
  component: require('prop-types').any.isRequired
};
SceneView.propTypes = {
  screenProps: require('prop-types').shape({}),
  navigation: babelPluginFlowReactPropTypes_proptype_NavigationScreenProp,
  component: require('prop-types').any.isRequired
};
exports.default = SceneView;