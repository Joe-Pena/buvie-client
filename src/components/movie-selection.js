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
`;

const StyledForm = styled.form`
  color: #fff;
  display: grid;
  margin-bottom: 3rem;

  .options {  
    display: grid;
    grid-template-columns: 1fr;
    align-items: center;
  }

  label {
    align-items: center;
    text-align: center;
    display: flex;
    flex-direction: column;
  }

  img {
    width: 120px;
  }

  img.picked {
    background-color: #a33944;
    /* box-shadow: 0 0 10px 5px #900; */
    box-shadow:
        0 0 60px 30px #fff, 
        0 0 100px 60px #f0f,
        0 0 140px 90px #0ff;
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

    const disabled = this.props.loading || !this.state.movies.length;

    return (
      <Container>
        <StyledH3>And now select your favorite movies!</StyledH3>
        <StyledForm onSubmit={e => this.onSubmit(e)}>
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