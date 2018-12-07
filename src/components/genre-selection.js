import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';


import { updateUser } from '../actions/users';

const StyledForm = styled.form`
  label {
    display: block;
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
        <label htmlFor={genre.id} key={genre.id}>
          <input
            type="checkbox"
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
        {inputs}
        <button disabled={disabled}>
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