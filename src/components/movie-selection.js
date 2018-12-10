import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { fetchMovies } from '../actions/movies-action';
import { fetchMatches, updateUser } from '../actions/users';

const StyledForm = styled.form`
  display: grid;
  grid-template-rows: auto;
  grid-row-gap: 0.5rem;
  background-color: #212032;
  height: 100%;
  color: #fff;

  h3 {
    justify-self: center;
  }

  input {
    opacity: 0;
  }

  label {
    display: block;
    justify-self: center;
    cursor: pointer;
    height: 3rem;
  }

  label.picked{
    display: block;
    background-color: #a33944;
    width: 100%;
    text-align: center;
  }

  .movie-select-btn {
    background-color: #a33944;
    color: #000;
    width: 8rem;
    height: 3rem;
    border: none;
    justify-self: center;
    cursor: pointer;
  }
`;


class MovieSelection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: []
    };
  }

  componentDidMount() {
    this.props.dispatch(fetchMovies(this.props.genres));
  }

  onSubmit(e) {
    e.preventDefault();

    return this.props.dispatch(updateUser({ movies: this.state.movies }))
      .then(() => this.props.dispatch(fetchMatches()));

  }

  onChange(e) {
    const movie = e.target.value;
    if (e.target.checked) {
      this.setState({
        movies: [...this.state.movies, movie]
      });
    } else {
      this.setState({
        movies: this.state.movies.filter(movieId => movieId !== movie)
      });
    }
  }

  render() {
    const inputs = this.props.movies.map(movie => {
      return (
        <label key={movie.id} onClick={(e) => e.target.classList.toggle('picked')}>
          <input
            type="checkbox"
            value={movie.id}
            onChange={e => this.onChange(e)}/>
          {movie.title}
        </label>);
    });

    const disabled = this.props.loading || !this.state.movies.length;

    return (
      <StyledForm onSubmit={e => this.onSubmit(e)}>
        <h3>And now select your favorite movies!</h3>
        {inputs}
        <button className="movie-select-btn" disabled={disabled}>
          Continue
        </button>
      </StyledForm>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.user.loading,
  genres: state.user.genres,
  movies: state.movie.list
});

export default connect(mapStateToProps)(MovieSelection);