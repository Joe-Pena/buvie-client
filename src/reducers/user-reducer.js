import {
  SET_GENRES,
  SET_MOVIES
} from '../actions/users';

const initialState = {
  movies: [],
  genres: []
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
  }
  return state;
}
