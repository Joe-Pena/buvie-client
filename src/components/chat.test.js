import React from 'react';
import { shallow } from 'enzyme';
import Chat from './chat.js';
import { BrowserRouter as Router } from 'react-router-dom';
import { default as renderer } from 'react-test-renderer';
import store from '../store.js';
import { Provider } from 'react-redux';

describe('Chat component', () => {
  it('Renders properly', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <Chat />
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
    expect(
      wrapper
        .dive()
        .instance()
        .openChatModal()
    ).equals(true);
  });
});
