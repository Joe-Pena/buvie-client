import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';


import { updateUser } from '../actions/users';

const StyledForm = styled.form`
  display: grid;
  grid-template-rows: auto;
  grid-row-gap: 0.5rem;
  background-color: #212032;
  height: 95vh;
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

  .genre-continue-btn {
    grid-row-start: 11;
    background-color: #a33944;
    color: #000;
    width: 8rem;
    height: 3rem;
    border: none;
    justify-self: center;
    cursor: pointer;
  }
`;


class GenreSelection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genres: []
    };
  }

  onSubmit(e) {
    e.preventDefault();

    return this.props.dispatch(updateUser({ genres: this.state.genres }));
  }

  onChange(e) {
    const genre = e.target.value;
    if (e.target.checked) {
      this.setState({
        genres: [...this.state.genres, genre]
      });
    } else {
      this.setState({
        genres: this.state.genres.filter(name => name !== genre)
      });
    }
  }

  render() {
    const genreList = [
      { name: 'Action & Adventure', id: 'action' },
      { name: 'Children & Family', id: 'family' },
      { name: 'Comedy', id: 'comedy' },
      { name: 'Documentary', id: 'documentary' },
      { name: 'Drama', id: 'drama' },
      { name: 'International', id: 'international' },
      { name: 'Horror', id: 'horror' },
      { name: 'SciFi & Fantasy', id: 'fantasy' },
      { name: 'Thriller', id: 'thriller' },
    ];

    const inputs = genreList.map(genre => {
      return (
        <label htmlFor={genre.id} key={genre.id} onClick={(e) => e.target.classList.toggle('picked')}>
          <input
            type="checkbox"
            className={`genres-list-${genre.id}`}
            value={genre.name}
            id={genre.id}
            name={genre.id}
            onChange={e => this.onChange(e)}/>
          {genre.name}
        </label>);
    });

    const disabled = this.props.loading || !this.state.genres.length;

    return (
      <StyledForm onSubmit={e => this.onSubmit(e)}>
        <h3>Please choose your favorite genres so we can find better matches for you!</h3>
        {inputs}
        <button className="genre-continue-btn" disabled={disabled}>
          Continue
        </button>
      </StyledForm>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.user.loading
  };
};


export default connect(mapStateToProps)(GenreSelection);