import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { fetchMovies } from '../actions/movies-action';
import { fetchMatches, updateUser } from '../actions/users';
import Container from './styles/container-styles';

const StyledH3 = styled.h3`
  justify-self: center;
  text-align: center;
  color: #fff;
  text-align: center;
  font-size: 3rem;
`;

const StyledForm = styled.form`
  color: #fff;
  display: grid;
  margin-bottom: 3rem;
  text-align: center;

  .options {  
    display: grid;
    grid-template-columns: 1fr;
    align-items: center;
  }

  .feedback {
    font-size: 2rem;
    font-weight: 600;
  }

  label {
    align-items: center;
    text-align: center;
    display: flex;
    flex-direction: column;
  }

  img {
    margin: 16px;
    width: 120px;
    transition: box-shadow .3s;
  }

  input:checked + img {
    background-color: #a33944;
    /* box-shadow: 0 0 10px 5px #900; */
    box-shadow:
        0 0 6px 3px #fff, 
        0 0 10px 6px #f0f,
        0 0 14px 9px #0ff;
  }

  input {
    opacity: 0;
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

  .movie-select-btn:disabled {
    opacity: 0.3
  }

  @media (min-width: 480px) {
    .options {  
      grid-template-columns: 1fr 1fr;
    }
  }

  @media (min-width: 768px) {
    .options {  
      grid-template-columns: 1fr 1fr 1fr;
    }
  }

  @media (min-width: 992px) {
    .options {  
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }
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
          <img src={movie.poster} alt={movie.title} />
          {movie.title}
        </label>);
    });

    const disabled = this.props.loading || this.state.movies.length < 3;

    return (
      <Container>
        <StyledH3>And now select your favorite movies! Choose at least 3</StyledH3>
        <StyledForm onSubmit={e => this.onSubmit(e)}>
          <div className='feedback'>{this.state.movies.length} movies selected</div>
          <div className="options">
            {inputs}
          </div>
          <button className="movie-select-btn" disabled={disabled}>
            Continue
          </button>
        </StyledForm>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.user.loading,
  genres: state.user.genres,
  movies: state.movie.list
});

export default connect(mapStateToProps)(MovieSelection);