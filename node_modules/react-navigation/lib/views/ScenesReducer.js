'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = ScenesReducer;

var _invariant = require('fbjs/lib/invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _shallowEqual = require('fbjs/lib/shallowEqual');

var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var babelPluginFlowReactPropTypes_proptype_NavigationState = require('../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationState || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_NavigationScene = require('../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationScene || require('react').PropTypes.any;

var babelPluginFlowReactPropTypes_proptype_NavigationRoute = require('../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationRoute || require('react').PropTypes.any;

var SCENE_KEY_PREFIX = 'scene_';

/**
 * Helper function to compare route keys (e.g. "9", "11").
 */
function compareKey(one, two) {
  var delta = one.length - two.length;
  if (delta > 0) {
    return 1;
  }
  if (delta < 0) {
    return -1;
  }
  return one > two ? 1 : -1;
}

/**
 * Helper function to sort scenes based on their index and view key.
 */
function compareScenes(one, two) {
  if (one.index > two.index) {
    return 1;
  }
  if (one.index < two.index) {
    return -1;
  }

  return compareKey(one.key, two.key);
}

/**
 * Whether two routes are the same.
 */
function areScenesShallowEqual(one, two) {
  return one.key === two.key && one.index === two.index && one.isStale === two.isStale && one.isActive === two.isActive && areRoutesShallowEqual(one.route, two.route);
}

/**
 * Whether two routes are the same.
 */
function areRoutesShallowEqual(one, two) {
  if (!one || !two) {
    return one === two;
  }

  if (one.key !== two.key) {
    return false;
  }

  return (0, _shallowEqual2.default)(one, two);
}

function ScenesReducer(scenes, nextState, prevState) {
  if (prevState === nextState) {
    return scenes;
  }

  var prevScenes = new Map();
  var freshScenes = new Map();
  var staleScenes = new Map();

  // Populate stale scenes from previous scenes marked as stale.
  scenes.forEach(function (scene) {
    var key = scene.key;

    if (scene.isStale) {
      staleScenes.set(key, scene);
    }
    prevScenes.set(key, scene);
  });

  var nextKeys = new Set();
  nextState.routes.forEach(function (route, index) {
    var key = SCENE_KEY_PREFIX + route.key;
    var scene = {
      index: index,
      isActive: false,
      isStale: false,
      key: key,
      route: route
    };
    (0, _invariant2.default)(!nextKeys.has(key), 'navigation.state.routes[' + index + '].key "' + key + '" conflicts with ' + 'another route!');
    nextKeys.add(key);

    if (staleScenes.has(key)) {
      // A previously `stale` scene is now part of the nextState, so we
      // revive it by removing it from the stale scene map.
      staleScenes.delete(key);
    }
    freshScenes.set(key, scene);
  });

  if (prevState) {
    // Look at the previous routes and classify any removed scenes as `stale`.
    prevState.routes.forEach(function (route, index) {
      var key = SCENE_KEY_PREFIX + route.key;
      if (freshScenes.has(key)) {
        return;
      }
      staleScenes.set(key, {
        index: index,
        isActive: false,
        isStale: true,
        key: key,
        route: route
      });
    });
  }

  var nextScenes = [];

  var mergeScene = function mergeScene(nextScene) {
    var key = nextScene.key;

    var prevScene = prevScenes.has(key) ? prevScenes.get(key) : null;
    if (prevScene && areScenesShallowEqual(prevScene, nextScene)) {
      // Reuse `prevScene` as `scene` so view can avoid unnecessary re-render.
      // This assumes that the scene's navigation state is immutable.
      nextScenes.push(prevScene);
    } else {
      nextScenes.push(nextScene);
    }
  };

  staleScenes.forEach(mergeScene);
  freshScenes.forEach(mergeScene);

  nextScenes.sort(compareScenes);

  var activeScenesCount = 0;
  nextScenes.forEach(function (scene, ii) {
    var isActive = !scene.isStale && scene.index === nextState.index;
    if (isActive !== scene.isActive) {
      nextScenes[ii] = _extends({}, scene, {
        isActive: isActive
      });
    }
    if (isActive) {
      activeScenesCount++;
    }
  });

  (0, _invariant2.default)(activeScenesCount === 1, 'there should always be only one scene active, not %s.', activeScenesCount);

  if (nextScenes.length !== scenes.length) {
    return nextScenes;
  }

  if (nextScenes.some(function (scene, index) {
    return !areScenesShallowEqual(scenes[index], scene);
  })) {
    return nextScenes;
  }

  // scenes haven't changed.
  return scenes;
}