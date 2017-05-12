'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Env;

function _load_Env() {
  return _Env = _interopRequireWildcard(require('./Env'));
}

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

let scheme = process.env.XDL_SCHEME || 'https';

let host = process.env.XDL_HOST || 'exp.host';
let port = parseInt(process.env.XDL_PORT, 10) || null;

if ((_Env || _load_Env()).isStaging()) {
  host = 'staging.exp.host';
} else if ((_Env || _load_Env()).isLocal()) {
  scheme = 'http';
  host = 'localhost';
  port = 3000;
}

const config = {
  api: {
    scheme,
    host,
    port
  },
  ngrok: {
    authToken: '5W1bR67GNbWcXqmxZzBG1_56GezNeaX6sSRvn8npeQ8',
    authTokenPublicId: '5W1bR67GNbWcXqmxZzBG1',
    domain: 'exp.direct'
  },
  developerTool: null,
  validation: {
    reactNativeVersionWarnings: true
  },
  helpUrl: 'https://docs.expo.io/',
  offline: false,
  useReduxNotifications: false
};

exports.default = config;
//# sourceMappingURL=__sourcemaps__/Config.js.map
