import React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { fetchOmdbInfo } from '../actions/movies-action';

const StyledMovieModal = styled.div`
`;

export class MovieModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false
    };
  }

  openModal() {
    this.setState({
      modalIsOpen: true
    });
  }

  closeModal() {
    this.setState({
      modalIsOpen: false
    });
  }

  getMovieInfo(imdbID) {
    this.props.dispatch(fetchOmdbInfo(imdbID));
  }

  render() {
    const { movie } = this.props;
    return (
      <StyledMovieModal>
        <img
          src={movie.poster}
          className="match-movie-poster"
          alt={movie.title}
          onClick={() => this.getMovieInfo(movie.imdbID)}
        />
      </StyledMovieModal>
    );
  }
}

const mapStateToProps = state => {
  return {

  };
};

export default connect(mapStateToProps)(MovieModal);