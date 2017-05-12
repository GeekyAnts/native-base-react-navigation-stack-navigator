'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setClientIdAsync = exports.clientIdAsync = undefined;

let clientIdAsync = exports.clientIdAsync = (() => {
  var _ref = _asyncToGenerator(function* () {
    var clientId = yield (_UserSettings || _load_UserSettings()).default.getAsync('accessToken', null);
    if (clientId === null) {
      clientId = _newIdentifier();
      yield setClientIdAsync(clientId);
    }
    return clientId;
  });

  return function clientIdAsync() {
    return _ref.apply(this, arguments);
  };
})();

let setClientIdAsync = exports.setClientIdAsync = (() => {
  var _ref2 = _asyncToGenerator(function* (token) {
    yield (_UserSettings || _load_UserSettings()).default.setAsync('accessToken', token);
    return token;
  });

  return function setClientIdAsync(_x) {
    return _ref2.apply(this, arguments);
  };
})();

var _slugid;

function _load_slugid() {
  return _slugid = _interopRequireDefault(require('slugid'));
}

var _UserSettings;

function _load_UserSettings() {
  return _UserSettings = _interopRequireDefault(require('./UserSettings'));
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _newIdentifier(type = 'c') {
  return type + '-' + (_slugid || _load_slugid()).default.v4();
}
//# sourceMappingURL=__sourcemaps__/Session.js.map
