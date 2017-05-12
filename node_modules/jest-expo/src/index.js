'use strict';

module.exports = {
  mockComponent: moduleName => {
    const RealComponent = require.requireActual(moduleName);
    const React = require('react');
    const Component = class extends RealComponent {
      render() {
        return React.createElement(
          RealComponent.displayName || RealComponent.name,
          this.props,
          this.props.children
        );
      }
    };
    return Component;
  },
};
