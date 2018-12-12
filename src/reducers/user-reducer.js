import {
  SET_GENRES,
  SET_MOVIES,
  FETCH_MATCHES_REQUEST,
  FETCH_MATCHES_SUCCESS,
  FETCH_MATCHES_FAILURE,
  FETCH_CURRENT_USER_REQUEST,
  FETCH_CURRENT_USER_SUCCESS,
  FETCH_CURRENT_USER_FAILURE,
  FETCH_POPCORN_REQUEST,
  FETCH_POPCORN_SUCCESS,
  FETCH_POPCORN_FAILURE,
  FETCH_MATCHED_REQUEST,
  FETCH_MATCHED_SUCCESS,
  FETCH_MATCHED_FAILURE,
  FILTER_USER,
  RESET_USER,
  FETCH_MESSAGE_REQUEST,
  FETCH_MESSAGE_SUCCESS,
  FETCH_MESSAGE_FAILURE,
  PUT_MESSAGE_REQUEST,
  PUT_MESSAGE_SUCCESS,
  PUT_MESSAGE_FAILURE,
  GEOLOCATE_USER_REQUEST,
  GEOLOCATE_USER_SUCCESS,
  GEOLOCATE_USER_FAILURE,
  TOGGLE_PROFILE
} from '../actions/users';

const initialState = {
  loading: false,
  error: null,
  movies: [],
  genres: [],
  matches: [],
  popcorn: [],
  matched: [],
  filter: [],
  userCity: '',
  userCoords: {},
  profilePage: false
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
  } else if (action.type === FETCH_POPCORN_REQUEST) {
    return Object.assign({}, state, {
      loading: true,
      error: null
    });
  } else if (action.type === FETCH_POPCORN_SUCCESS) {
    return Object.assign({}, state, {
      loading: false,
      popcorn: action.popcorn
    });
  } else if (action.type === FETCH_POPCORN_FAILURE) {
    return Object.assign({}, state, {
      loading: false,
      error: action.error
    });
  } else if (action.type === FETCH_MATCHED_REQUEST) {
    return Object.assign({}, state, {
      loading: true,
      error: null
    });
  } else if (action.type === FETCH_MATCHED_SUCCESS) {
    return Object.assign({}, state, {
      loading: false,
      matched: action.matched
    });
  } else if (action.type === FETCH_MATCHED_FAILURE) {
    return Object.assign({}, state, {
      loading: false,
      error: action.error
    });
  } else if (action.type === FILTER_USER) {
    return Object.assign({}, state, {
      filter: [...state.filter, action.user]
    });
  } else if (action.type === RESET_USER) {
    return initialState;
  } else if (action.type === FETCH_MESSAGE_REQUEST) {
    return Object.assign({}, state, {
      loading: true,
      error: null
    });
  } else if (action.type === FETCH_MESSAGE_SUCCESS) {
    return Object.assign({}, state, {
      loading: false
    });
  } else if (action.type === FETCH_MESSAGE_FAILURE) {
    return Object.assign({}, state, {
      loading: false,
      error: action.error
    });
  } else if (action.type === PUT_MESSAGE_REQUEST) {
    return Object.assign({}, state, {
      loading: true,
      error: null
    });
  } else if (action.type === PUT_MESSAGE_SUCCESS) {
    return Object.assign({}, state, {
      loading: false
    });
  } else if (action.type === PUT_MESSAGE_FAILURE) {
    return Object.assign({}, state, {
      loading: false,
      error: action.error
    });
  } else if (action.type === GEOLOCATE_USER_REQUEST) {
    return Object.assign({}, state, {
      loading: true,
      error: false
    });
  } else if (action.type === GEOLOCATE_USER_SUCCESS) {
    console.log(
      `You're current collection is ${action.location}, coordinates:`,
      action.coords
    );
    return Object.assign({}, state, {
      loading: false,
      userCity: action.location,
      userCoords: action.coords
    });
  } else if (action.type === GEOLOCATE_USER_FAILURE) {
    return Object.assign({}, state, {
      loading: false,
      error: action.error
    });
  } else if (action.type === TOGGLE_PROFILE) {
    return Object.assign({}, state, {
      profilePage: action.value
    });
  }
  return state;
}
