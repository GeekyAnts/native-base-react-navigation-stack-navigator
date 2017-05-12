'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactNative = require('react-native');

/**
 * Utility that builds the style for the card in the cards stack.
 *
 *     +------------+
 *   +-+            |
 * +-+ |            |
 * | | |            |
 * | | |  Focused   |
 * | | |   Card     |
 * | | |            |
 * +-+ |            |
 *   +-+            |
 *     +------------+
 */

/**
 * Render the initial style when the initial layout isn't measured yet.
 */
var babelPluginFlowReactPropTypes_proptype_NavigationSceneRendererProps = require('../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationSceneRendererProps || require('react').PropTypes.any;

function forInitial(props) {
  var navigation = props.navigation,
      scene = props.scene;


  var focused = navigation.state.index === scene.index;
  var opacity = focused ? 1 : 0;
  // If not focused, move the scene far away.
  var translate = focused ? 0 : 1000000;
  return {
    opacity: opacity,
    transform: [{ translateX: translate }, { translateY: translate }]
  };
}

/**
 * Standard iOS-style slide in from the right.
 */
function forHorizontal(props) {
  var layout = props.layout,
      position = props.position,
      scene = props.scene;


  if (!layout.isMeasured) {
    return forInitial(props);
  }

  var index = scene.index;
  var inputRange = [index - 1, index, index + 1];

  var width = layout.initWidth;
  var outputRange = _reactNative.I18nManager.isRTL ? [-width, 0, 10] : [width, 0, -10];

  // Add [index - 1, index - 0.99] to the interpolated opacity for screen transition.
  // This makes the screen's shadow to disappear smoothly.
  var opacity = position.interpolate({
    inputRange: [index - 1, index - 0.99, index, index + 0.99, index + 1],
    outputRange: [0, 1, 1, 0.3, 0]
  });

  var translateY = 0;
  var translateX = position.interpolate({
    inputRange: inputRange,
    outputRange: outputRange
  });

  return {
    opacity: opacity,
    transform: [{ translateX: translateX }, { translateY: translateY }]
  };
}

/**
 * Standard iOS-style slide in from the bottom (used for modals).
 */
function forVertical(props) {
  var layout = props.layout,
      position = props.position,
      scene = props.scene;


  if (!layout.isMeasured) {
    return forInitial(props);
  }

  var index = scene.index;
  var height = layout.initHeight;

  var opacity = position.interpolate({
    inputRange: [index - 1, index - 0.99, index, index + 0.99, index + 1],
    outputRange: [0, 1, 1, 0.3, 0]
  });

  var translateX = 0;
  var translateY = position.interpolate({
    inputRange: [index - 1, index, index + 1],
    outputRange: [height, 0, 0]
  });

  return {
    opacity: opacity,
    transform: [{ translateX: translateX }, { translateY: translateY }]
  };
}

/**
 * Standard Android-style fade in from the bottom.
 */
function forFadeFromBottomAndroid(props) {
  var layout = props.layout,
      position = props.position,
      scene = props.scene;


  if (!layout.isMeasured) {
    return forInitial(props);
  }

  var index = scene.index;
  var inputRange = [index - 1, index, index + 0.99, index + 1];

  var opacity = position.interpolate({
    inputRange: inputRange,
    outputRange: [0, 1, 1, 0]
  });

  var translateX = 0;
  var translateY = position.interpolate({
    inputRange: inputRange,
    outputRange: [50, 0, 0, 0]
  });

  return {
    opacity: opacity,
    transform: [{ translateX: translateX }, { translateY: translateY }]
  };
}

function canUseNativeDriver() {
  // The native driver can be enabled for this interpolator animating
  // opacity, translateX, and translateY is supported by the native animation
  // driver on iOS and Android.
  return true;
}

exports.default = {
  forHorizontal: forHorizontal,
  forVertical: forVertical,
  forFadeFromBottomAndroid: forFadeFromBottomAndroid,
  canUseNativeDriver: canUseNativeDriver
};