import React from 'react';
import { shallow } from 'enzyme';
import App from './app.js';
import { BrowserRouter as Router } from 'react-router-dom';
import { default as renderer } from 'react-test-renderer';

describe('App component', () => {
  it('Renders properly', () => {
    const ShadowComponent = shallow(
      <Router>
        <App />
      </Router>
    );
    expect(ShadowComponent).toMatchSnapshot();
  });
});
