/* eslint-disable no-console */
import { API_BASE_URL, OMDB_API_KEY, OMDB_URL } from '../config';

export const SET_MOVIE_LIST = 'SET_MOVIE_LIST';
export const setMovieList = movies => ({
  type: SET_MOVIE_LIST,
  movies
});

export const RESET_MOVIES = 'RESET_MOVIES';
export const resetMovies = () => ({
  type: RESET_MOVIES
});

export const fetchMovies = () => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/movies`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  })
    .then(res => res.json())
    .then(res => {
      dispatch(setMovieList(res));
    })
    .catch(err => console.error(err));
};

export const FETCH_OMDB_INFO_REQUEST = 'FETCH_OMDB_INFO_REQUEST';
export const fetchOmdbInfoRequest = () => ({
  type: FETCH_OMDB_INFO_REQUEST
});

export const FETCH_OMDB_INFO_SUCCESS = 'FETCH_OMDB_INFO_SUCCESS';
export const fetchOmdbInfoSuccess = (movieInfo) => ({
  type: FETCH_OMDB_INFO_SUCCESS,
  movieInfo
});

export const FETCH_OMDB_INFO_ERROR = 'FETCH_OMDB_INFO_ERROR';
export const fetchOmdbInfoError = (error) => ({
  type: FETCH_OMDB_INFO_ERROR,
  error
});

export const fetchOmdbInfo = (imdbID) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  dispatch(fetchOmdbInfoRequest());
  return fetch(`${OMDB_URL}/?apikey=${OMDB_API_KEY}&i=${imdbID}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  })
    .then(res => res.json())
    .then(res => {
      dispatch(fetchOmdbInfoSuccess(res));
    })
    .catch(err => dispatch(fetchOmdbInfoError(err)));
};