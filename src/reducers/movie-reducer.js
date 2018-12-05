import {
  SET_MOVIE_LIST
} from '../actions/movies-action';

const initialState = {
  list: []
};

export default function reducer(state = initialState, action) {
  if (action.type === SET_MOVIE_LIST) {
    return Object.assign({}, state, {
      list: action.movies
    });
  }
  return state;
}
