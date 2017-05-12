import { I18nManager } from 'react-native';

/**
 * Utility that builds the style for the navigation header.
 *
 * +-------------+-------------+-------------+
 * |             |             |             |
 * |    Left     |   Title     |   Right     |
 * |  Component  |  Component  | Component   |
 * |             |             |             |
 * +-------------+-------------+-------------+
 */

var babelPluginFlowReactPropTypes_proptype_NavigationSceneRendererProps = require('../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationSceneRendererProps || require('react').PropTypes.any;

function forLeft(props) {
  const { position, scene } = props;
  const { index } = scene;
  return {
    opacity: position.interpolate({
      inputRange: [index - 1, index - 0.5, index, index + 0.5, index + 1],
      outputRange: [0, 0, 1, 0, 0]
    })
  };
}

function forCenter(props) {
  const { position, scene } = props;
  const { index } = scene;
  return {
    opacity: position.interpolate({
      inputRange: [index - 1, index, index + 1],
      outputRange: [0, 1, 0]
    }),
    transform: [{
      translateX: position.interpolate({
        inputRange: [index - 1, index + 1],
        outputRange: I18nManager.isRTL ? [-200, 200] : [200, -200]
      })
    }]
  };
}

function forRight(props) {
  const { position, scene } = props;
  const { index } = scene;
  return {
    opacity: position.interpolate({
      inputRange: [index - 1, index, index + 1],
      outputRange: [0, 1, 0]
    })
  };
}

export default {
  forLeft,
  forCenter,
  forRight
};