# jest-expo

A [Jest](https://facebook.github.io/jest/) preset to painlessly test
your Expo apps.

### Installation

- `yarn add jest-expo --dev` or `npm i jest-expo --save-dev`
- Add the following config to `package.json`:

  ```js
  "scripts": {
    "test": "node_modules/jest/bin/jest.js"
  },
  "jest": {
    "preset": "jest-expo"
  }
  ```

- Create a `__tests__` directory anywhere you like and a `Example-test.js` file inside of it, and add this code:

  ```js
  it('works', () => {
    expect(1).toBe(1);
  });
  ```

- Run `npm test` and it should pass

### Learning Jest

[Read the excellent documentation](https://facebook.github.io/jest/)
