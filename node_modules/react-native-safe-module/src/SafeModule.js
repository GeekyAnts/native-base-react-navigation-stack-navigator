import dedent from 'dedent';
import EventEmitter from './EventEmitter';

const create = function SafeModuleCreate(options) {
  if (!options) {
    throw new Error(dedent`
      SafeModule.module(...) was invoked without any options parameter.
    `);
  }
  const {
    moduleName,
    mock,
    isEventEmitter,
    } = options;

  if (!moduleName) {
    throw new Error(dedent`
      SafeModule.module(...) requires a moduleName property to be specified.
    `);
  }

  if (!mock) {
    throw new Error(dedent`
      Missing a "mock" parameter.
    `);
  }

  const result = {};

  if (isEventEmitter) {
    // TODO(lmr): should this be put inside of a try/catch?
    result.emitter = new EventEmitter();
  }

  Object.assign(result, mock);

  return result;
};

module.exports = create;
