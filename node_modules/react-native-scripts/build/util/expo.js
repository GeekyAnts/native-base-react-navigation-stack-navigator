'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.detach = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var detach = exports.detach = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
    var user, appJsonPath, appJson, _ref2, iosBundleIdentifier, _ref3, androidPackage, pkgJson, entryPoint, versions, sdkTag;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return loginOrRegister();

          case 2:
            user = _context.sent;
            appJsonPath = _path2.default.join(process.cwd(), 'app.json');
            _context.t0 = JSON;
            _context.next = 7;
            return _fsPromise2.default.readFile(appJsonPath);

          case 7:
            _context.t1 = _context.sent;
            appJson = _context.t0.parse.call(_context.t0, _context.t1);

            if (!((!appJson.expo.ios || !appJson.expo.ios.bundleIdentifier) && process.platform === 'darwin')) {
              _context.next = 17;
              break;
            }

            console.log('\nYou\'ll need to specify an iOS bundle identifier. It must be unique on the App Store if you want to\npublish it there. See this StackOverflow question for more information:\n  ' + _chalk2.default.cyan('https://stackoverflow.com/questions/11347470/what-does-bundle-identifier-mean-in-the-ios-project') + '\n');
            _context.next = 13;
            return _inquirer2.default.prompt([{
              name: 'iosBundleIdentifier',
              message: 'What would you like your iOS bundle identifier to be?'
            }]);

          case 13:
            _ref2 = _context.sent;
            iosBundleIdentifier = _ref2.iosBundleIdentifier;


            appJson.expo.ios = appJson.expo.ios || {};
            appJson.expo.ios.bundleIdentifier = iosBundleIdentifier;

          case 17:
            if (!(!appJson.expo.android || !appJson.expo.android.package)) {
              _context.next = 25;
              break;
            }

            console.log('\nYou\'ll need to specify an Android package name. It must be unique on the Play Store if you want to\npublish it there. See this StackOverflow question for more information:\n  ' + _chalk2.default.cyan('https://stackoverflow.com/questions/6273892/android-package-name-convention') + '\n');

            _context.next = 21;
            return _inquirer2.default.prompt([{
              name: 'androidPackage',
              message: 'What would you like your Android package name to be?'
            }]);

          case 21:
            _ref3 = _context.sent;
            androidPackage = _ref3.androidPackage;


            appJson.expo.android = appJson.expo.android || {};
            appJson.expo.android.package = androidPackage;

          case 25:
            _context.next = 27;
            return _fsPromise2.default.writeFile(appJsonPath, (0, _stringify2.default)(appJson, null, 2));

          case 27:
            _context.next = 29;
            return _xdl.Detach.detachAsync(process.cwd());

          case 29:
            // yesno lib doesn't properly shut down. without this the command won't exit
            process.stdin.pause();

            _context.t2 = JSON;
            _context.next = 33;
            return _fsPromise2.default.readFile(_path2.default.resolve('package.json'));

          case 33:
            _context.t3 = _context.sent.toString();
            pkgJson = _context.t2.parse.call(_context.t2, _context.t3);
            entryPoint = 'import Expo from \'expo\';\nimport App from \'./App\';\n\nExpo.registerRootComponent(App);\n';
            _context.next = 38;
            return _fsPromise2.default.writeFile('index.js', entryPoint);

          case 38:
            pkgJson.main = 'index.js';

            delete pkgJson.devDependencies['react-native-scripts'];
            delete pkgJson.scripts.start;
            delete pkgJson.scripts.build;
            delete pkgJson.scripts.eject;
            delete pkgJson.scripts.android;
            delete pkgJson.scripts.ios;

            _context.next = 47;
            return _xdl.Versions.versionsAsync();

          case 47:
            versions = _context.sent;
            sdkTag = versions.sdkVersions[appJson.expo.sdkVersion].expoReactNativeTag;


            pkgJson.dependencies['react-native'] = 'https://github.com/expo/react-native/archive/' + sdkTag + '.tar.gz';

            _context.next = 52;
            return _fsPromise2.default.writeFile('package.json', (0, _stringify2.default)(pkgJson, null, 2));

          case 52:

            console.log(_chalk2.default.green('Successfully set up ExpoKit!') + '\n\nYou\'ll need to use Expo\'s XDE to run this project:\n  ' + _chalk2.default.cyan('https://docs.expo.io/versions/latest/introduction/installation.html') + '\n\nFor further instructions, please read ExpoKit\'s build documentation:\n  ' + _chalk2.default.cyan('https://docs.expo.io/versions/latest/guides/expokit.html') + '\n');

          case 53:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function detach() {
    return _ref.apply(this, arguments);
  };
}();

var loginOrRegister = function () {
  var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
    var currentUser, loggedInQuestions, _ref5, stayLoggedIn, questions, _ref6, action;

    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            console.log(_chalk2.default.yellow('\nAn Expo account is required to proceed.\n'));
            _context2.next = 3;
            return _xdl.User.getCurrentUserAsync();

          case 3:
            currentUser = _context2.sent;

            if (!currentUser) {
              _context2.next = 17;
              break;
            }

            loggedInQuestions = [{
              type: 'list',
              name: 'stayLoggedIn',
              message: 'It appears you\'re already logged in to Expo as ' + _chalk2.default.green(currentUser.nickname) + ', would you like to continue with this account?',
              choices: [{
                name: 'Yes, continue as ' + currentUser.nickname + '.',
                value: true
              }, {
                name: "No, I'd like to start a new session.",
                value: false
              }]
            }];
            _context2.next = 8;
            return _inquirer2.default.prompt(loggedInQuestions);

          case 8:
            _ref5 = _context2.sent;
            stayLoggedIn = _ref5.stayLoggedIn;

            if (!stayLoggedIn) {
              _context2.next = 14;
              break;
            }

            return _context2.abrupt('return', currentUser);

          case 14:
            _context2.next = 16;
            return _xdl.User.logoutAsync();

          case 16:
            console.log(_chalk2.default.green('\nSuccessfully logged out!\n'));

          case 17:
            questions = [{
              type: 'list',
              name: 'action',
              message: 'How would you like to authenticate?',
              choices: [{
                name: 'Make a new Expo account',
                value: 'register'
              }, {
                name: 'Log in with an existing Expo account',
                value: 'existingUser'
              }, {
                name: 'Cancel',
                value: 'cancel'
              }]
            }];
            _context2.next = 20;
            return _inquirer2.default.prompt(questions);

          case 20:
            _ref6 = _context2.sent;
            action = _ref6.action;

            if (!(action === 'github')) {
              _context2.next = 28;
              break;
            }

            _context2.next = 25;
            return githubAuthAsync();

          case 25:
            return _context2.abrupt('return', _context2.sent);

          case 28:
            if (!(action === 'register')) {
              _context2.next = 34;
              break;
            }

            _context2.next = 31;
            return registerAsync();

          case 31:
            return _context2.abrupt('return', _context2.sent);

          case 34:
            if (!(action === 'existingUser')) {
              _context2.next = 40;
              break;
            }

            _context2.next = 37;
            return usernamePasswordAuthAsync();

          case 37:
            return _context2.abrupt('return', _context2.sent);

          case 40:
            return _context2.abrupt('return', null);

          case 41:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function loginOrRegister() {
    return _ref4.apply(this, arguments);
  };
}();

var githubAuthAsync = function () {
  var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
    var user;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _xdl.User.loginAsync('github');

          case 2:
            user = _context3.sent;

            if (!user) {
              _context3.next = 8;
              break;
            }

            console.log(_chalk2.default.green('\nSuccessfully logged in as ' + user.nickname + ' with GitHub!'));
            return _context3.abrupt('return', user);

          case 8:
            throw new Error('Unexpected Error: No user returned from the API');

          case 9:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function githubAuthAsync() {
    return _ref7.apply(this, arguments);
  };
}();

var usernamePasswordAuthAsync = function () {
  var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {
    var questions, answers, data, user;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            questions = [{
              type: 'input',
              name: 'username',
              message: 'Username/Email Address:',
              validate: validator
            }, {
              type: 'password',
              name: 'password',
              message: 'Password:',
              validate: validator
            }];
            _context4.next = 3;
            return _inquirer2.default.prompt(questions);

          case 3:
            answers = _context4.sent;
            data = {
              username: answers.username,
              password: answers.password
            };
            _context4.next = 7;
            return _xdl.User.loginAsync('user-pass', data);

          case 7:
            user = _context4.sent;

            if (!user) {
              _context4.next = 13;
              break;
            }

            console.log(_chalk2.default.green('\nSuccessfully logged in as ' + user.nickname + '!'));
            return _context4.abrupt('return', user);

          case 13:
            throw new Error('Unexpected Error: No user returned from the Expo API');

          case 14:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function usernamePasswordAuthAsync() {
    return _ref8.apply(this, arguments);
  };
}();

var registerAsync = function () {
  var _ref9 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5() {
    var questions, answers, registeredUser;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            console.log('\nThanks for signing up for Expo!\nJust a few questions:\n');

            questions = [{
              type: 'input',
              name: 'givenName',
              message: 'First (Given) Name:',
              validate: validator
            }, {
              type: 'input',
              name: 'familyName',
              message: 'Last (Family) Name:',
              validate: validator
            }, {
              type: 'input',
              name: 'username',
              message: 'Username:',
              validate: validator
            }, {
              type: 'input',
              name: 'email',
              message: 'Email Address:',
              validate: validator
            }, {
              type: 'password',
              name: 'password',
              message: 'Password:',
              validate: validator
            }, {
              type: 'password',
              name: 'passwordRepeat',
              message: 'Password Repeat:',
              validate: function validate(val, answers) {
                if (val.trim() === '') {
                  return false;
                }
                if (val.trim() !== answers.password.trim()) {
                  return 'Passwords don\'t match!';
                }
                return true;
              }
            }];
            _context5.next = 4;
            return _inquirer2.default.prompt(questions);

          case 4:
            answers = _context5.sent;
            _context5.next = 7;
            return _xdl.User.registerAsync((0, _extends3.default)({}, answers));

          case 7:
            registeredUser = _context5.sent;


            console.log(_chalk2.default.green('\nRegistration successful!'));

            return _context5.abrupt('return', registeredUser);

          case 10:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  return function registerAsync() {
    return _ref9.apply(this, arguments);
  };
}();

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _fsPromise = require('fs-promise');

var _fsPromise2 = _interopRequireDefault(_fsPromise);

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _xdl = require('xdl');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AUTH_CLIENT_ID = 'MGQh3rK3WZFWhJ91BShagHggMOhrE6nR';

_xdl.User.initialize(AUTH_CLIENT_ID);

function validator(val) {
  if (val.trim() === '') {
    return false;
  }
  return true;
}
//# sourceMappingURL=expo.js.map