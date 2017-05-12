'use strict';

let JsonFile = require('../JsonFile');

describe('JsonFile', () => {
  it(`is a class`, () => {
    let file = new JsonFile('../package.json');
    expect(file instanceof JsonFile).toBe(true);
  });

  it(`has static functions`, () => {
    expect(JsonFile.readAsync).toBeDefined();
    expect(JsonFile.writeAsync).toBeDefined();
  });

  pit(`reads JSON from a file`, () => {
    let file = new JsonFile('./package.json');
    return file.readAsync().then(object => {
      expect(object.version).toBeDefined();
    });
  });

  pit(`reads JSON statically from a file`, () => {
    return JsonFile.readAsync('./package.json').then(object => {
      expect(object.version).toBeDefined();
    });
  });

  pit(`reads JSON5 from a file`, () => {
    let file = new JsonFile('./test-json5.json', {json5: true});
    return file.readAsync().then(object => {
      expect(object.itParsedProperly).toBe(42);
    });
  });
});
