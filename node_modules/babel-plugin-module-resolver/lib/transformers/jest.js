'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = transformJestCalls;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function transformJestCalls(t, nodePath, mapper, state, cwd) {
  var calleePath = nodePath.get('callee');

  var jestMethods = ['genMockFromModule', 'mock', 'unmock', 'doMock', 'dontMock'];

  if (!(t.isMemberExpression(calleePath.node) && t.isIdentifier(calleePath.node.object, { name: 'jest' }) && jestMethods.some(function (methodName) {
    return t.isIdentifier(calleePath.node.property, { name: methodName });
  }))) {
    return;
  }

  var args = nodePath.get('arguments');
  if (!args.length) {
    return;
  }

  var moduleArg = args[0];
  if (moduleArg.node.type === 'StringLiteral') {
    var modulePath = mapper(moduleArg.node.value, state.file.opts.filename, state.opts, cwd);
    if (modulePath) {
      var newArgs = [].concat(_toConsumableArray(args)).map(function (a) {
        return a.node;
      });
      newArgs[0] = t.stringLiteral(modulePath);
      nodePath.replaceWith(t.callExpression(calleePath.node, newArgs));
    }
  }
}