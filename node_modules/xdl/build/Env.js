'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.home = home;
exports.isStaging = isStaging;
exports.isLocal = isLocal;

var _os = _interopRequireDefault(require('os'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function home() {
  return _os.default.homedir();
}

function isStaging() {
  return !!process.env.EXPO_STAGING;
}

function isLocal() {
  return !!process.env.EXPO_LOCAL;
}
//# sourceMappingURL=__sourcemaps__/Env.js.map
