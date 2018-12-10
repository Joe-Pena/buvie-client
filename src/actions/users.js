/* eslint-disable no-console */
import { SubmissionError } from 'redux-form';

import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from './utils';

export const SET_GENRES = 'SET_GENRES';
export const setGenres = genres => ({
  type: SET_GENRES,
  genres
});

export const SET_MOVIES = 'SET_MOVIES';
export const setMovies = movies => ({
  type: SET_MOVIES,
  movies
});

export const FILTER_USER = 'FILTER_USER';
export const filterUser = user => ({
  type: FILTER_USER,
  user
});

export const FETCH_MATCHES_REQUEST = 'FETCH_MATCHES_REQUEST';
export const fetchMatchesRequest = () => ({
  type: FETCH_MATCHES_REQUEST
});

export const FETCH_MATCHES_SUCCESS = 'FETCH_MATCHES_SUCCESS';
export const fetchMatchesSuccess = matches => ({
  type: FETCH_MATCHES_SUCCESS,
  matches
});

export const FETCH_MATCHES_FAILURE = 'FETCH_MATCHES_FAILURE';
export const fetchMatchesFailure = error => ({
  type: FETCH_MATCHES_FAILURE,
  error
});

export const fetchMatches = () => (dispatch, getState) => {
  dispatch(fetchMatchesRequest());
  const authToken = getState().auth.authToken;

  return fetch(`${API_BASE_URL}/main/`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  })
    .then(res => res.json())
    .then(res => {
      console.log(res);
      dispatch(fetchMatchesSuccess(res));
    })
    .catch(err => dispatch(fetchMatchesFailure(err)));
};

export const FETCH_CURRENT_USER_REQUEST = 'FETCH_CURRENT_USER_REQUEST';
export const fetchCurrentuserRequest = () => ({
  type: FETCH_CURRENT_USER_REQUEST
});

export const FETCH_CURRENT_USER_SUCCESS = 'FETCH_CURRENT_USER_SUCCESS';
export const fetchCurrentuserSuccess = user => ({
  type: FETCH_CURRENT_USER_SUCCESS,
  user
});

export const FETCH_CURRENT_USER_FAILURE = 'FETCH_CURRENT_USER_FAILURE';
export const fetchCurrentuserFailure = error => ({
  type: FETCH_CURRENT_USER_FAILURE,
  error
});

export const fetchCurrentuser = () => (dispatch, getState) => {
  dispatch(fetchCurrentuserRequest());
  let userId;
  const currentUser = getState().auth.currentUser;
  if (currentUser) {
    userId = currentUser.id;
  }

  return fetch(`${API_BASE_URL}/users/${userId}`, {
    method: 'GET'
  })
    .then(res => res.json())
    .then(res => {
      dispatch(fetchCurrentuserSuccess(res));
      dispatch(setGenres(res.genres));
      dispatch(setMovies(res.movies));
    })
    .catch(err => dispatch(fetchCurrentuserFailure(err)));
};

export const registerUser = user => () => {
  return fetch(`${API_BASE_URL}/users`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(user)
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .catch(err => {
      const { reason, message, location } = err;
      if (reason === 'ValidationError') {
        // Convert ValidationErrors into SubmissionErrors for Redux Form
        return Promise.reject(
          new SubmissionError({
            [location]: message
          })
        );
      }
    });
};

export const updateUser = data => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  const currentUser = getState().auth.currentUser;
  let userId;
  if (currentUser) {
    userId = currentUser.id;
  }

  return fetch(`${API_BASE_URL}/main/${userId}`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(res => {
      console.log(res);
      dispatch(setGenres(res.genres));
      dispatch(setMovies(res.movies));
    })
    .catch(err => {console.error(err);});
};

export const popCornMatch = data => (dispatch, getState) => {
  const authToken = getState().auth.authToken;

  return fetch(`${API_BASE_URL}/main/popcorn`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify(data)
  })
    .then(res => {
      console.log(res);
    })
    .catch(err => {console.error(err);});
};

export const FETCH_POPCORN_REQUEST = 'FETCH_POPCORN_REQUEST';
export const fetchPopcornRequest = () => ({
  type: FETCH_POPCORN_REQUEST
});

export const FETCH_POPCORN_SUCCESS = 'FETCH_POPCORN_SUCCESS';
export const fetchPopcornSuccess = popcorn => ({
  type: FETCH_POPCORN_SUCCESS,
  popcorn
});

export const FETCH_POPCORN_FAILURE = 'FETCH_POPCORN_FAILURE';
export const fetchPopcornFailure = error => ({
  type: FETCH_POPCORN_FAILURE,
  error
});

export const fetchPopcorn = () => (dispatch, getState) => {
  dispatch(fetchPopcornRequest());
  const authToken = getState().auth.authToken;
  const currentUser = getState().auth.currentUser;
  let userId;
  if (currentUser) {
    userId = currentUser.id;
  }

  return fetch(`${API_BASE_URL}/main/popcorn/${userId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  })
    .then(res => res.json())
    .then(res => {
      console.log(res);
      dispatch(fetchPopcornSuccess(res));
    })
    .catch(err => dispatch(fetchPopcornFailure(err)));
};


export const FETCH_MATCHED_REQUEST = 'FETCH_MATCHED_REQUEST';
export const fetchMatchedRequest = () => ({
  type: FETCH_MATCHED_REQUEST
});

export const FETCH_MATCHED_SUCCESS = 'FETCH_MATCHED_SUCCESS';
export const fetchMatchedSuccess = matched => ({
  type: FETCH_MATCHED_SUCCESS,
  matched
});

export const FETCH_MATCHED_FAILURE = 'FETCH_MATCHED_FAILURE';
export const fetchMatchedFailure = error => ({
  type: FETCH_MATCHED_FAILURE,
  error
});

export const fetchMatched = () => (dispatch, getState) => {
  dispatch(fetchMatchedRequest());
  const authToken = getState().auth.authToken;
  const currentUser = getState().auth.currentUser;
  let userId;
  if (currentUser) {
    userId = currentUser.id;
  }

  return fetch(`${API_BASE_URL}/main/matches/${userId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  })
    .then(res => res.json())
    .then(res => {
      console.log(res);
      dispatch(fetchMatchedSuccess(res));
    })
    .catch(err => dispatch(fetchMatchedFailure(err)));
};