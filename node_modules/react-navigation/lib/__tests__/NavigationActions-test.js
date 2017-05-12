'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _NavigationActions = require('../NavigationActions');

var _NavigationActions2 = _interopRequireDefault(_NavigationActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('actions', function () {
  var data = { foo: 'bar' };

  it('exports back action and type', function () {
    expect(_NavigationActions2.default.back()).toEqual({ type: _NavigationActions2.default.BACK });
    expect(_NavigationActions2.default.back(data)).toEqual(_extends({
      type: _NavigationActions2.default.BACK
    }, data));
  });

  it('exports init action and type', function () {
    expect(_NavigationActions2.default.init()).toEqual({ type: _NavigationActions2.default.INIT });
    expect(_NavigationActions2.default.init(data)).toEqual(_extends({
      type: _NavigationActions2.default.INIT
    }, data));
  });

  it('exports navigate action and type', function () {
    expect(_NavigationActions2.default.navigate()).toEqual({
      type: _NavigationActions2.default.NAVIGATE
    });
    expect(_NavigationActions2.default.navigate(data)).toEqual(_extends({
      type: _NavigationActions2.default.NAVIGATE
    }, data));
  });

  it('exports reset action and type', function () {
    expect(_NavigationActions2.default.reset()).toEqual({
      type: _NavigationActions2.default.RESET
    });
    expect(_NavigationActions2.default.reset(data)).toEqual(_extends({
      type: _NavigationActions2.default.RESET
    }, data));
  });

  it('exports setParams action and type', function () {
    expect(_NavigationActions2.default.setParams()).toEqual({
      type: _NavigationActions2.default.SET_PARAMS
    });
    expect(_NavigationActions2.default.setParams(data)).toEqual(_extends({
      type: _NavigationActions2.default.SET_PARAMS
    }, data));
  });

  it('exports uri action and type', function () {
    expect(_NavigationActions2.default.uri()).toEqual({ type: _NavigationActions2.default.URI });
    expect(_NavigationActions2.default.uri(data)).toEqual(_extends({
      type: _NavigationActions2.default.URI
    }, data));
  });
});