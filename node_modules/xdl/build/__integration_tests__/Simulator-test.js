'use strict';

var _delayAsync;

function _load_delayAsync() {
  return _delayAsync = _interopRequireDefault(require('delay-async'));
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

jasmine.DEFAULT_TIMEOUT_INTERVAL = 40000;

const xdl = require('../xdl');

describe('simulator', () => {
  xit('opens and loads url in expo', _asyncToGenerator(function* () {
    let Simulator = xdl.Simulator;
    if (!(yield Simulator._isSimulatorInstalledAsync())) {
      throw new Error("Simulator isn't installed on this computer; can't run this test.");
    }

    // Quit the simulator to start the test
    if (yield Simulator._isSimulatorRunningAsync()) {
      yield Simulator._quitSimulatorAsync();
    }

    yield (0, (_delayAsync || _load_delayAsync()).default)(1000); // 3 seconds

    // Open the simulator
    yield Simulator._openSimulatorAsync();

    yield (0, (_delayAsync || _load_delayAsync()).default)(9000); // 3 seconds

    if (!(yield Simulator._isSimulatorRunningAsync())) {
      throw new Error("Simulator should be running after being opened, but we're detecting that it isn't.");
    }

    if (yield Simulator._isExpoAppInstalledOnCurrentBootedSimulatorAsync()) {
      yield Simulator._uninstallExpoAppFromSimulatorAsync();
    }
    if (yield Simulator._isExpoAppInstalledOnCurrentBootedSimulatorAsync()) {
      throw new Error("Expo app shouldn't be installed on this simulator but it is");
    }
    yield Simulator._installExpoOnSimulatorAsync();
    if (!(yield Simulator._isExpoAppInstalledOnCurrentBootedSimulatorAsync())) {
      throw new Error("Expo app should be installed on this simulator but it isn't");
    }

    yield Simulator._openUrlInSimulatorAsync('exp://exp.host/@exponent/fluxpybird');

    yield (0, (_delayAsync || _load_delayAsync()).default)(6000);

    yield Simulator._uninstallExpoAppFromSimulatorAsync();
    if (yield Simulator._isExpoAppInstalledOnCurrentBootedSimulatorAsync()) {
      throw new Error("Expo app shouldn't be installed on this simulator but it is (2)");
    }

    yield Simulator._quitSimulatorAsync();
    if (yield Simulator._isSimulatorRunningAsync()) {
      throw new Error("Simulator shouldn't be running but it is");
    }
  }));
});
//# sourceMappingURL=../__sourcemaps__/__integration_tests__/Simulator-test.js.map
