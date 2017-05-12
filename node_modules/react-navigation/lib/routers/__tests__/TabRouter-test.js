'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _TabRouter = require('../TabRouter');

var _TabRouter2 = _interopRequireDefault(_TabRouter);

var _NavigationActions = require('../../NavigationActions');

var _NavigationActions2 = _interopRequireDefault(_NavigationActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var INIT_ACTION = { type: _NavigationActions2.default.INIT };

var BareLeafRouteConfig = {
  screen: function screen() {
    return _react2.default.createElement('div', null);
  }
};

describe('TabRouter', function () {
  test('Handles basic tab logic', function () {
    var ScreenA = function ScreenA() {
      return _react2.default.createElement('div', null);
    };
    var ScreenB = function ScreenB() {
      return _react2.default.createElement('div', null);
    };
    var router = (0, _TabRouter2.default)({
      Foo: { screen: ScreenA },
      Bar: { screen: ScreenB }
    });
    var state = router.getStateForAction({ type: _NavigationActions2.default.INIT });
    var expectedState = {
      index: 0,
      routes: [{ key: 'Foo', routeName: 'Foo' }, { key: 'Bar', routeName: 'Bar' }]
    };
    expect(state).toEqual(expectedState);
    var state2 = router.getStateForAction({ type: _NavigationActions2.default.NAVIGATE, routeName: 'Bar' }, state);
    var expectedState2 = {
      index: 1,
      routes: [{ key: 'Foo', routeName: 'Foo' }, { key: 'Bar', routeName: 'Bar' }]
    };
    expect(state2).toEqual(expectedState2);
    expect(router.getComponentForState(expectedState)).toEqual(ScreenA);
    expect(router.getComponentForState(expectedState2)).toEqual(ScreenB);
    var state3 = router.getStateForAction({ type: _NavigationActions2.default.NAVIGATE, routeName: 'Bar' }, state2);
    expect(state3).toEqual(null);
  });

  test('Handles getScreen', function () {
    var ScreenA = function ScreenA() {
      return _react2.default.createElement('div', null);
    };
    var ScreenB = function ScreenB() {
      return _react2.default.createElement('div', null);
    };
    var router = (0, _TabRouter2.default)({
      Foo: { getScreen: function getScreen() {
          return ScreenA;
        } },
      Bar: { getScreen: function getScreen() {
          return ScreenB;
        } }
    });
    var state = router.getStateForAction({ type: _NavigationActions2.default.INIT });
    var expectedState = {
      index: 0,
      routes: [{ key: 'Foo', routeName: 'Foo' }, { key: 'Bar', routeName: 'Bar' }]
    };
    expect(state).toEqual(expectedState);
    var state2 = router.getStateForAction({ type: _NavigationActions2.default.NAVIGATE, routeName: 'Bar' }, state);
    var expectedState2 = {
      index: 1,
      routes: [{ key: 'Foo', routeName: 'Foo' }, { key: 'Bar', routeName: 'Bar' }]
    };
    expect(state2).toEqual(expectedState2);
    expect(router.getComponentForState(expectedState)).toEqual(ScreenA);
    expect(router.getComponentForState(expectedState2)).toEqual(ScreenB);
    var state3 = router.getStateForAction({ type: _NavigationActions2.default.NAVIGATE, routeName: 'Bar' }, state2);
    expect(state3).toEqual(null);
  });

  test('Can set the initial tab', function () {
    var router = (0, _TabRouter2.default)({ Foo: BareLeafRouteConfig, Bar: BareLeafRouteConfig }, { initialRouteName: 'Bar' });
    var state = router.getStateForAction({ type: _NavigationActions2.default.INIT });
    expect(state).toEqual({
      index: 1,
      routes: [{ key: 'Foo', routeName: 'Foo' }, { key: 'Bar', routeName: 'Bar' }]
    });
  });

  test('Handles the SetParams action', function () {
    var router = (0, _TabRouter2.default)({
      Foo: {
        screen: function screen() {
          return _react2.default.createElement('div', null);
        }
      },
      Bar: {
        screen: function screen() {
          return _react2.default.createElement('div', null);
        }
      }
    });
    var state2 = router.getStateForAction({
      type: _NavigationActions2.default.SET_PARAMS,
      params: { name: 'Qux' },
      key: 'Foo'
    });
    expect(state2 && state2.routes[0].params).toEqual({ name: 'Qux' });
  });

  test('getStateForAction returns null when navigating to same tab', function () {
    var router = (0, _TabRouter2.default)({ Foo: BareLeafRouteConfig, Bar: BareLeafRouteConfig }, { initialRouteName: 'Bar' });
    var state = router.getStateForAction({ type: _NavigationActions2.default.INIT });
    var state2 = router.getStateForAction({ type: _NavigationActions2.default.NAVIGATE, routeName: 'Bar' }, state);
    expect(state2).toEqual(null);
  });

  test('getStateForAction returns initial navigate', function () {
    var router = (0, _TabRouter2.default)({
      Foo: BareLeafRouteConfig,
      Bar: BareLeafRouteConfig
    });
    var state = router.getStateForAction({
      type: _NavigationActions2.default.NAVIGATE,
      routeName: 'Foo'
    });
    expect(state && state.index).toEqual(0);
  });

  test('Handles nested tabs and nested actions', function () {
    var ChildTabNavigator = function ChildTabNavigator() {
      return _react2.default.createElement('div', null);
    };
    ChildTabNavigator.router = (0, _TabRouter2.default)({
      Foo: BareLeafRouteConfig,
      Bar: BareLeafRouteConfig
    });
    var router = (0, _TabRouter2.default)({
      Foo: BareLeafRouteConfig,
      Baz: { screen: ChildTabNavigator },
      Boo: BareLeafRouteConfig
    });
    var params = { foo: '42' };
    var action = router.getActionForPathAndParams('Baz/Bar', params);
    var navAction = {
      type: _NavigationActions2.default.NAVIGATE,
      routeName: 'Baz',
      action: {
        type: _NavigationActions2.default.NAVIGATE,
        routeName: 'Bar',
        params: { foo: '42' }
      }
    };
    expect(action).toEqual(navAction);
    var state = router.getStateForAction(navAction);
    expect(state).toEqual({
      index: 1,
      routes: [{
        key: 'Foo',
        routeName: 'Foo'
      }, {
        index: 1,
        key: 'Baz',
        routeName: 'Baz',
        routes: [{
          key: 'Foo',
          routeName: 'Foo'
        }, {
          key: 'Bar',
          routeName: 'Bar',
          params: params
        }]
      }, {
        key: 'Boo',
        routeName: 'Boo'
      }]
    });
  });

  test('Handles passing params to nested tabs', function () {
    var ChildTabNavigator = function ChildTabNavigator() {
      return _react2.default.createElement('div', null);
    };
    ChildTabNavigator.router = (0, _TabRouter2.default)({
      Boo: BareLeafRouteConfig,
      Bar: BareLeafRouteConfig
    });
    var router = (0, _TabRouter2.default)({
      Foo: BareLeafRouteConfig,
      Baz: { screen: ChildTabNavigator }
    });
    var navAction = {
      type: _NavigationActions2.default.NAVIGATE,
      routeName: 'Baz',
      params: { foo: '42', bar: '43' }
    };
    var state = router.getStateForAction(navAction);
    expect(state).toEqual({
      index: 1,
      routes: [{ key: 'Foo', routeName: 'Foo' }, {
        index: 0,
        key: 'Baz',
        routeName: 'Baz',
        routes: [{ key: 'Boo', routeName: 'Boo', params: { foo: '42', bar: '43' } }, { key: 'Bar', routeName: 'Bar', params: { foo: '42', bar: '43' } }]
      }]
    });

    // Ensure that navigating back and forth doesn't overwrite
    state = router.getStateForAction({ type: _NavigationActions2.default.NAVIGATE, routeName: 'Bar' }, state);
    state = router.getStateForAction({ type: _NavigationActions2.default.NAVIGATE, routeName: 'Boo' }, state);
    expect(state && state.routes[1]).toEqual({
      index: 0,
      key: 'Baz',
      routeName: 'Baz',
      routes: [{ key: 'Boo', routeName: 'Boo', params: { foo: '42', bar: '43' } }, { key: 'Bar', routeName: 'Bar', params: { foo: '42', bar: '43' } }]
    });
  });

  test('Handles initial deep linking into nested tabs', function () {
    var ChildTabNavigator = function ChildTabNavigator() {
      return _react2.default.createElement('div', null);
    };
    ChildTabNavigator.router = (0, _TabRouter2.default)({
      Foo: BareLeafRouteConfig,
      Bar: BareLeafRouteConfig
    });
    var router = (0, _TabRouter2.default)({
      Foo: BareLeafRouteConfig,
      Baz: { screen: ChildTabNavigator },
      Boo: BareLeafRouteConfig
    });
    var state = router.getStateForAction({
      type: _NavigationActions2.default.NAVIGATE,
      routeName: 'Bar'
    });
    expect(state).toEqual({
      index: 1,
      routes: [{ key: 'Foo', routeName: 'Foo' }, {
        index: 1,
        key: 'Baz',
        routeName: 'Baz',
        routes: [{ key: 'Foo', routeName: 'Foo' }, { key: 'Bar', routeName: 'Bar' }]
      }, { key: 'Boo', routeName: 'Boo' }]
    });
    var state2 = router.getStateForAction({ type: _NavigationActions2.default.NAVIGATE, routeName: 'Foo' }, state);
    expect(state2).toEqual({
      index: 1,
      routes: [{ key: 'Foo', routeName: 'Foo' }, {
        index: 0,
        key: 'Baz',
        routeName: 'Baz',
        routes: [{ key: 'Foo', routeName: 'Foo' }, { key: 'Bar', routeName: 'Bar' }]
      }, { key: 'Boo', routeName: 'Boo' }]
    });
    var state3 = router.getStateForAction({ type: _NavigationActions2.default.NAVIGATE, routeName: 'Foo' }, state2);
    expect(state3).toEqual(null);
  });

  test('Handles linking across of deeply nested tabs', function () {
    var ChildNavigator0 = function ChildNavigator0() {
      return _react2.default.createElement('div', null);
    };
    ChildNavigator0.router = (0, _TabRouter2.default)({
      Boo: BareLeafRouteConfig,
      Baz: BareLeafRouteConfig
    });
    var ChildNavigator1 = function ChildNavigator1() {
      return _react2.default.createElement('div', null);
    };
    ChildNavigator1.router = (0, _TabRouter2.default)({
      Zoo: BareLeafRouteConfig,
      Zap: BareLeafRouteConfig
    });
    var MidNavigator = function MidNavigator() {
      return _react2.default.createElement('div', null);
    };
    MidNavigator.router = (0, _TabRouter2.default)({
      Foo: { screen: ChildNavigator0 },
      Bar: { screen: ChildNavigator1 }
    });
    var router = (0, _TabRouter2.default)({
      Foo: { screen: MidNavigator },
      Gah: BareLeafRouteConfig
    });
    var state = router.getStateForAction(INIT_ACTION);
    expect(state).toEqual({
      index: 0,
      routes: [{
        index: 0,
        key: 'Foo',
        routeName: 'Foo',
        routes: [{
          index: 0,
          key: 'Foo',
          routeName: 'Foo',
          routes: [{ key: 'Boo', routeName: 'Boo' }, { key: 'Baz', routeName: 'Baz' }]
        }, {
          index: 0,
          key: 'Bar',
          routeName: 'Bar',
          routes: [{ key: 'Zoo', routeName: 'Zoo' }, { key: 'Zap', routeName: 'Zap' }]
        }]
      }, { key: 'Gah', routeName: 'Gah' }]
    });
    var state2 = router.getStateForAction({ type: _NavigationActions2.default.NAVIGATE, routeName: 'Zap' }, state);
    expect(state2).toEqual({
      index: 0,
      routes: [{
        index: 1,
        key: 'Foo',
        routeName: 'Foo',
        routes: [{
          index: 0,
          key: 'Foo',
          routeName: 'Foo',
          routes: [{ key: 'Boo', routeName: 'Boo' }, { key: 'Baz', routeName: 'Baz' }]
        }, {
          index: 1,
          key: 'Bar',
          routeName: 'Bar',
          routes: [{ key: 'Zoo', routeName: 'Zoo' }, { key: 'Zap', routeName: 'Zap' }]
        }]
      }, { key: 'Gah', routeName: 'Gah' }]
    });
    var state3 = router.getStateForAction({ type: _NavigationActions2.default.NAVIGATE, routeName: 'Zap' }, state2);
    expect(state3).toEqual(null);
    var state4 = router.getStateForAction({
      type: _NavigationActions2.default.NAVIGATE,
      routeName: 'Foo',
      action: {
        type: _NavigationActions2.default.NAVIGATE,
        routeName: 'Bar',
        action: { type: _NavigationActions2.default.NAVIGATE, routeName: 'Zap' }
      }
    });
    expect(state4).toEqual({
      index: 0,
      routes: [{
        index: 1,
        key: 'Foo',
        routeName: 'Foo',
        routes: [{
          index: 0,
          key: 'Foo',
          routeName: 'Foo',
          routes: [{ key: 'Boo', routeName: 'Boo' }, { key: 'Baz', routeName: 'Baz' }]
        }, {
          index: 1,
          key: 'Bar',
          routeName: 'Bar',
          routes: [{ key: 'Zoo', routeName: 'Zoo' }, { key: 'Zap', routeName: 'Zap' }]
        }]
      }, { key: 'Gah', routeName: 'Gah' }]
    });
  });

  test('Handles path configuration', function () {
    var ScreenA = function ScreenA() {
      return _react2.default.createElement('div', null);
    };
    var ScreenB = function ScreenB() {
      return _react2.default.createElement('div', null);
    };
    var router = (0, _TabRouter2.default)({
      Foo: {
        path: 'f',
        screen: ScreenA
      },
      Bar: {
        path: 'b',
        screen: ScreenB
      }
    });
    var params = { foo: '42' };
    var action = router.getActionForPathAndParams('b/anything', params);
    var expectedAction = {
      params: params,
      routeName: 'Bar',
      type: _NavigationActions2.default.NAVIGATE
    };
    expect(action).toEqual(expectedAction);

    var state = router.getStateForAction({ type: _NavigationActions2.default.INIT });
    var expectedState = {
      index: 0,
      routes: [{ key: 'Foo', routeName: 'Foo' }, { key: 'Bar', routeName: 'Bar' }]
    };
    expect(state).toEqual(expectedState);
    var state2 = router.getStateForAction(expectedAction, state);
    var expectedState2 = {
      index: 1,
      routes: [{ key: 'Foo', routeName: 'Foo' }, { key: 'Bar', routeName: 'Bar', params: params }]
    };
    expect(state2).toEqual(expectedState2);
    expect(router.getComponentForState(expectedState)).toEqual(ScreenA);
    expect(router.getComponentForState(expectedState2)).toEqual(ScreenB);
    expect(router.getPathAndParamsForState(expectedState).path).toEqual('f');
    expect(router.getPathAndParamsForState(expectedState2).path).toEqual('b');
  });

  test('Handles default configuration', function () {
    var ScreenA = function ScreenA() {
      return _react2.default.createElement('div', null);
    };
    var ScreenB = function ScreenB() {
      return _react2.default.createElement('div', null);
    };
    var router = (0, _TabRouter2.default)({
      Foo: {
        path: '',
        screen: ScreenA
      },
      Bar: {
        path: 'b',
        screen: ScreenB
      }
    });
    var action = router.getActionForPathAndParams('', { foo: '42' });
    expect(action).toEqual({
      params: {
        foo: '42'
      },
      routeName: 'Foo',
      type: _NavigationActions2.default.NAVIGATE
    });
  });

  test('Gets deep path', function () {
    var ScreenA = function ScreenA() {
      return _react2.default.createElement('div', null);
    };
    var ScreenB = function ScreenB() {
      return _react2.default.createElement('div', null);
    };
    ScreenA.router = (0, _TabRouter2.default)({
      Boo: { screen: ScreenB },
      Baz: { screen: ScreenB }
    });
    var router = (0, _TabRouter2.default)({
      Foo: {
        path: 'f',
        screen: ScreenA
      },
      Bar: {
        screen: ScreenB
      }
    });

    var state = {
      index: 0,
      routes: [{
        index: 1,
        key: 'Foo',
        routeName: 'Foo',
        routes: [{ key: 'Boo', routeName: 'Boo' }, { key: 'Baz', routeName: 'Baz' }]
      }, { key: 'Bar', routeName: 'Bar' }]
    };

    var _router$getPathAndPar = router.getPathAndParamsForState(state),
        path = _router$getPathAndPar.path;

    expect(path).toEqual('f/Baz');
  });

  test('Maps old actions (uses "getStateForAction returns null when navigating to same tab" test)', function () {
    var router = (0, _TabRouter2.default)({ Foo: BareLeafRouteConfig, Bar: BareLeafRouteConfig }, { initialRouteName: 'Bar' });
    /* $FlowFixMe: these are for deprecated action names */
    var state = router.getStateForAction({ type: 'Init' });
    /* $FlowFixMe: these are for deprecated action names */
    var state2 = router.getStateForAction({ type: 'Navigate', routeName: 'Bar' }, state);
    expect(state2).toEqual(null);
  });

  test('Can navigate to other tab (no router) with params', function () {
    var ScreenA = function ScreenA() {
      return _react2.default.createElement('div', null);
    };
    var ScreenB = function ScreenB() {
      return _react2.default.createElement('div', null);
    };

    var router = (0, _TabRouter2.default)({
      a: { screen: ScreenA },
      b: { screen: ScreenB }
    });

    var state0 = router.getStateForAction(INIT_ACTION);

    expect(state0).toEqual({
      index: 0,
      routes: [{ key: 'a', routeName: 'a' }, { key: 'b', routeName: 'b' }]
    });

    var params = { key: 'value' };

    var state1 = router.getStateForAction({ type: _NavigationActions2.default.NAVIGATE, routeName: 'b', params: params }, state0);

    expect(state1).toEqual({
      index: 1,
      routes: [{ key: 'a', routeName: 'a' }, { key: 'b', routeName: 'b', params: params }]
    });
  });
});