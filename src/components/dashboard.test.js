import React from 'react';
import { shallow, mount } from 'enzyme';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Dashboard } from './dashboard';

jest.mock('../actions/users', () => Object.assign({},
  require.requireActual('../actions/users'),
  {
    fetchCurrentUser: jest.fn().mockImplementation(() => {
      return {
        type: 'FETCH_USER'
      }
    }),
    fetchMatched: jest.fn().mockImplementation((username, password) => {
      return {
        type: 'FETCH_MATCHED',
        username,
        password
      }
    }),
    fetchMatches: jest.fn().mockImplementation((username, password) => {
      return {
        type: 'FETCH_MATCHES',
        username,
        password
      }
    }),
    popCornMatch: jest.fn().mockImplementation((username, password) => {
      return {
        type: 'POPCORN_MATCH',
        username,
        password
      }
    }),
    fetchPopcorn: jest.fn().mockImplementation((username, password) => {
      return {
        type: 'FETCH_POPCORN',
        username,
        password
      }
    }),
    chairUser: jest.fn().mockImplementation((username, password) => {
      return {
        type: 'CHAIR_USER',
        username,
        password
      }
    }),
    neverMindUser: jest.fn().mockImplementation((username, password) => {
      return {
        type: 'NEVERMIND_USER',
        username,
        password
      }
    }),
    fetchNotification: jest.fn().mockImplementation((username, password) => {
      return {
        type: 'FETCH_USER',
        username,
        password
      }
    })
  }));

const store = createStore(() => ({
  username: 'username',
  email: 'email@test.com',
  profilePicture: 'picture.png',
  movies: [],
  genres: ['Horror', 'Comedy', 'Drama'],
  matches: [],
  popcorn: [],
  pending: [],
  matched: [],
  filter: [],
  loading: false
}));

describe('<Dashboard/>', () => {
  const dispatch = jest.fn();
  it('Should render without crashing', () => {
    shallow(
      <BrowserRouter>
        <Dashboard
          username='username'
          email='email@test.com'
          profilePicture='picture.png'
          movies={[]}
          genres={['Horror', 'Comedy', 'Drama']}
          matches={[]}
          popcorn={[]}
          pending={[]}
          matched={[]}
          filter={[]}
        />
      </BrowserRouter>
    );
  });
}); 