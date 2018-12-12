import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';


import { updateUser } from '../actions/users';

const StyledForm = styled.form`
  display: grid;
  grid-template-rows: auto;
  grid-row-gap: 0.5rem;
  background-color: #212032;
  height: 93vh;
  color: #fff;
  text-align: center;

  h3 {
    font-size: 3rem;
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

  input:checked + label {
    display: block;
    background-color: #a33944;
    width: 100%;
  }

  .feedback {
    font-size: 2rem;
    font-weight: 600;
  }

  .genre-continue-btn {
    grid-row-start: 12;
    background-color: #a33944;
    color: #000;
    width: 8rem;
    height: 3rem;
    border: none;
    justify-self: center;
    cursor: pointer;
  }

  .genre-continue-btn:disabled {
    opacity: 0.3
  }
`;


class GenreSelection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genres: [],
      feedback: false
    };
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.state.genres.length <= 3) {
      this.setState({
        feedback: false
      });
      return this.props.dispatch(updateUser({ genres: this.state.genres }));
    }
    this.setState({
      feedback: true
    });
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
        <div key={genre.id}>
          <input
            type="checkbox"
            className={`genres-list-${genre.id}`}
            value={genre.name}
            id={genre.id}
            name={genre.id}
            onChange={e => this.onChange(e)}
          />
          <label htmlFor={genre.id} onClick={(e) => e.target.classList.toggle('picked')}>
            <span>{genre.name}</span>
          </label>
        </div>);
    });

    const disabled = this.props.loading || this.state.genres.length !== 3;
    let feedback;
    if (this.state.feedback || this.state.genres.length > 3) {
      feedback = <div className='feedback'>
        You can only select 3 genres!
      </div>;
    } else {
      feedback = <div className='feedback'>{this.state.genres.length} of 3 selected</div>;
    }


    return (
      <StyledForm onSubmit={e => this.onSubmit(e)}>
        <h3>Please choose your favorite 3 genres so we can find better matches for you!</h3>
        {feedback}
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