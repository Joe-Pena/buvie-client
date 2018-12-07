import {
  SET_GENRES,
  SET_MOVIES,
  FETCH_MATCHES_REQUEST,
  FETCH_MATCHES_SUCCESS,
  FETCH_MATCHES_FAILURE,
  FETCH_CURRENT_USER_REQUEST,
  FETCH_CURRENT_USER_SUCCESS,
  FETCH_CURRENT_USER_FAILURE
} from '../actions/users';

const initialState = {
  loading: false,
  error: null,
  movies: [],
  genres: [],
  matches: []
};

export default function reducer(state = initialState, action) {
  if (action.type === SET_GENRES) {
    return Object.assign({}, state, {
      genres: action.genres
    });
  } else if (action.type === SET_MOVIES) {
    return Object.assign({}, state, {
      movies: action.movies
    });
  } else if (action.type === FETCH_MATCHES_REQUEST) {
    return Object.assign({}, state, {
      loading: true,
      error: null
    });
  } else if (action.type === FETCH_MATCHES_SUCCESS) {
    return Object.assign({}, state, {
      loading: false,
      matches: action.matches
    });
  } else if (action.type === FETCH_MATCHES_FAILURE) {
    return Object.assign({}, state, {
      loading: false,
      error: action.error
    });
  } else if (action.type === FETCH_CURRENT_USER_REQUEST) {
    return Object.assign({}, state, {
      loading: true,
      error: null
    });
  } else if (action.type === FETCH_CURRENT_USER_SUCCESS) {
    return Object.assign({}, state, {
      loading: false
    });
  } else if (action.type === FETCH_CURRENT_USER_FAILURE) {
    return Object.assign({}, state, {
      loading: false,
      error: action.error
    });
  }
  return state;
}
