import {
  SET_MOVIE_LIST,
  RESET_MOVIES,
  FETCH_OMDB_INFO_REQUEST,
  FETCH_OMDB_INFO_SUCCESS,
  FETCH_OMDB_INFO_ERROR
} from '../actions/movies-action';

const initialState = {
  list: [],
  loading: false,
  error: null,
  currentMovie: {}
};

export default function reducer(state = initialState, action) {
  if (action.type === SET_MOVIE_LIST) {
    return Object.assign({}, state, {
      list: action.movies
    });
  } else if (action.type === RESET_MOVIES) {
    return initialState;
  } else if (action.type === FETCH_OMDB_INFO_REQUEST) {
    return Object.assign({}, state, {
      loading: true,
      error: null
    });
  } else if (action.type === FETCH_OMDB_INFO_SUCCESS) {
    return Object.assign({}, state, {
      loading: false,
      error: null,
      currentMovie: action.movieInfo
    });
  } else if (action.type === FETCH_OMDB_INFO_ERROR) {
    return Object.assign({}, state, {
      loading: false,
      error: action.error
    });
  }
  return state;
}
