import dedent from 'dedent';

function SafeComponentCreate(options) {
  if (!options) {
    throw new Error(dedent`
      SafeModule.create(...) was invoked without any options parameter.
    `);
  }
  const {
    viewName,
    mockComponent,
  } = options;

  if (!viewName) {
    throw new Error(`
      SafeModule.component(...) requires a viewName property to be specified.
    `);
  }

  if (!mockComponent) {
    throw new Error(`
      SafeModule.component(...) requires a mockComponent property to be specified.
    `);
  }
  return mockComponent;
}

module.exports = SafeComponentCreate;
