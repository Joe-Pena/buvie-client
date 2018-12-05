import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { fetchMovies } from '../actions/movies-action';
import { updateUser } from '../actions/users';

const StyledForm = styled.form`
  label {
    display: block;
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

    console.log(this.state.movies);
    console.log('ran');
    return this.props.dispatch(updateUser({ movies: this.state.movies }));
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
        <label key={movie.id}>
          <input
            type="checkbox"
            value={movie.id}
            onChange={e => this.onChange(e)}/>
          {movie.title}
        </label>);
    });

    return (
      <StyledForm onSubmit={e => this.onSubmit(e)}>
        {inputs}
        <button disabled={false}>
          Continue
        </button>
      </StyledForm>
    );
  }
}

const mapStateToProps = state => ({
  genres: state.user.genres,
  movies: state.movie.list
});

export default connect(mapStateToProps)(MovieSelection);