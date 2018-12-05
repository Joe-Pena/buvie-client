/* eslint-disable no-console */
import { API_BASE_URL } from '../config';

export const SET_MOVIE_LIST = 'SET_MOVIE_LIST';
export const setMovieList = movies => ({
  type: SET_MOVIE_LIST,
  movies
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