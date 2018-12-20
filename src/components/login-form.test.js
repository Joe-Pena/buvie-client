import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';
import { reduxForm } from 'redux-form';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import { LoginForm } from './login-form';
import { BrowserRouter } from 'react-router-dom';
import { format } from 'util';

const store = createStore(() => ({}));

const Decorated = reduxForm({ form: 'testForm' })(LoginForm);

describe.only('<LoginForm/>', () => {
  const dispatch = jest.fn();
  it('Should render without crashing', () => {
    shallow(<BrowserRouter>
      <LoginForm handleSubmit={jest.fn()} />
    </BrowserRouter>);
  });

  it('Should submit when form is submitted', () => {
    const callback = jest.fn();
    const wrapper = mount(<Provider store={store} dispatch={dispatch}>
      <Decorated handleSubmit={callback} />
    </Provider>);
    wrapper.find('input#username').instance().value = 'username';
    wrapper.find('input#password').instance().value = 'password123';
    const form = wrapper.find('form');
    form.simulate('submit');
    expect(callback).toHaveBeenCalled();
  });
});