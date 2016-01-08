'use strict';

describe('ReactUcenterWebpackApp', () => {
  let React = require('react');
  let ReactUcenterWebpackApp, component;

  beforeEach(() => {
    let container = document.createElement('div');
    container.id = 'content';
    document.body.appendChild(container);

    ReactUcenterWebpackApp = require('components/ReactUcenterWebpackApp.js');
    component = React.createElement(ReactUcenterWebpackApp);
  });

  it('should create a new instance of ReactUcenterWebpackApp', () => {
    expect(component).toBeDefined();
  });
});
