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
  USER_PIC_REQUEST,
  USER_PIC_SUCCESS,
  USER_PIC_FAILURE,
  TOGGLE_PROFILE,
  NEVER_MIND_USER_REQUEST,
  NEVER_MIND_USER_SUCCESS,
  NEVER_MIND_USER_FAILURE,
  FETCH_NOTIFICATION_REQUEST,
  FETCH_NOTIFICATION_SUCCESS,
  FETCH_NOTIFICATION_FAILURE,
  PUT_NOTIFICATION_TIME_REQUEST,
  PUT_NOTIFICATION_TIME_SUCCESS,
  PUT_NOTIFICATION_TIME_FAILURE
} from '../actions/users';

const initialState = {
  loading: false,
  error: null,
  movies: [],
  genres: [],
  matches: [],
  popcorn: [],
  pending: [],
  matched: [],
  notifications: [],
  notificationCheck: null,
  filter: [],
  profilePage: false,
  profilePic: '',
  location: {}
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
      loading: false,
      location: action.user.location
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
      popcorn: action.popcorn.popcorned,
      pending: action.popcorn.pendingPopcorn
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
    return Object.assign({}, state, {
      loading: false,
      location: action.location
    });
  } else if (action.type === GEOLOCATE_USER_FAILURE) {
    return Object.assign({}, state, {
      loading: false,
      error: action.error
    });
  } else if (action.type === NEVER_MIND_USER_REQUEST) {
    return Object.assign({}, state, {
      loading: true,
      error: null
    });
  } else if (action.type === NEVER_MIND_USER_SUCCESS) {
    return Object.assign({}, state, {
      loading: false,
      error: null
    });
  } else if (action.type === NEVER_MIND_USER_FAILURE) {
    return Object.assign({}, state, {
      loading: false,
      error: action.error
    });
  } else if (action.type === FETCH_NOTIFICATION_REQUEST) {
    return Object.assign({}, state, {
      loading: true,
      error: null
    });
  } else if (action.type === FETCH_NOTIFICATION_SUCCESS) {
    return Object.assign({}, state, {
      loading: false,
      error: null,
      notifications: action.notifications,
      notificationCheck: action.notificationCheck
    });
  } else if (action.type === FETCH_NOTIFICATION_FAILURE) {
    return Object.assign({}, state, {
      loading: false,
      error: action.error
    });
  } else if (action.type === PUT_NOTIFICATION_TIME_REQUEST) {
    return Object.assign({}, state, {
      loading: true,
      error: null
    });
  } else if (action.type === PUT_NOTIFICATION_TIME_SUCCESS) {
    return Object.assign({}, state, {
      loading: false,
      error: null,
      notificationCheck: action.date
    });
  } else if (action.type === PUT_NOTIFICATION_TIME_FAILURE) {
    return Object.assign({}, state, {
      loading: false,
      error: action.error
    });
  } else if (action.type === USER_PIC_REQUEST) {
    return Object.assign({}, state, {
      loading: true
    });
  } else if (action.type === USER_PIC_SUCCESS) {
    return Object.assign({}, state, {
      loading: false
    });
  } else if (action.type === USER_PIC_FAILURE) {
    return Object.assign({}, state, {
      loading: false,
      error: action.error
    });
  }
  return state;
}
