# match-require

[![NPM version](https://nodei.co/npm/match-require.png)](https://npmjs.org/package/match-require)
[![NPM downloads](http://img.shields.io/npm/dm/match-require.svg)](https://npmjs.org/package/match-require)
[![Build Status](https://travis-ci.org/yiminghe/match-require.svg?branch=master)](https://travis-ci.org/yiminghe/match-require)
[![Coverage Status](https://coveralls.io/repos/yiminghe/match-require/badge.svg?branch=master)](https://coveralls.io/r/yiminghe/match-require?branch=master)

find/replace dependencies using regexp

## examples

```js
const matchRequire = require('match-require');

  it('findAll works', () => {
    const content = ['// require("2")',
      'require("3");',
      '/* require("2") */',
      'require("4")'
    ].join('\n');

    const ret = matchRequire.findAll(content);

    expect(ret).to.eql(['3', '4']);
  });

  it('replaceAll works', () => {
    const content = ['// require("2")',
      'require("3");',
      '/* require("2") */',
      'require("4")'
    ].join('\n');

    const ret = matchRequire.replaceAll(content, (dep) => {
      return dep === '4' ? '5' : dep;
    });

    expect(ret).to.eql([
      'require("3");',
      '',
      'require("5")'
    ].join('\n'));
  });

  it('import works', () => {
    const content = ['// import "2"',
      'import x from "3";',
      'console.import("1")',
      '/* import "2" */',
      'import {z} from "4";',
      `import {
 x,
 y,
 z,
} from "5";`,
    ].join('\n');

    const ret = matchRequire.findAll(content);

    expect(ret).to.eql(['3', '4', '5']);
  });

```

## history

### 2.1.0

- add replaceAll
