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
    console.log('working');

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
    console.log(this.state.genres);
    const genreList = [
      { name: 'Action & Adventure', id: 'action' },
      { name: 'Children & Family', id: 'family' },
      { name: 'Comedies', id: 'comedies' },
      { name: 'Documentaries', id: 'documentaries' },
      { name: 'Dramas', id: 'dramas' },
      { name: 'Foreign Movies', id: 'foreign' },
      { name: 'Horror', id: 'horror' },
      { name: 'Sci-Fi & Fantasy', id: 'fantasy' },
      { name: 'Thrillers', id: 'thrillers' },
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


export default connect()(GenreSelection);