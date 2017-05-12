#!/usr/bin/env node
'use strict';

var _crossSpawn = require('cross-spawn');

var _crossSpawn2 = _interopRequireDefault(_crossSpawn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var script = process.argv[2];

var args = process.argv.slice(3);

var validCommands = ['eject', 'android', 'ios', 'start', 'test'];

if (validCommands.indexOf(script) !== -1) {
  // the command is valid
  var result = _crossSpawn2.default.sync('node', ['--no-deprecation', require.resolve('../scripts/' + script)].concat(args), { stdio: 'inherit' });
  process.exit(result.status);
} else {
  console.log('Invalid command \'' + script + '\'. Please check if you need to update react-native-scripts.');
}
//# sourceMappingURL=react-native-scripts.js.map