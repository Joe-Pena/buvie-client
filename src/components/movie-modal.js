import React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { fetchOmdbInfo } from '../actions/movies-action';

const StyledMovieModal = styled.div`
`;

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    height: '60%',
    width: '640px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  overlay: {
    backgroundColor: 'transparent'
  }
};

export class MovieModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false
    };
  }

  openModal = () => {
    this.setState({
      modalIsOpen: true
    });
  }

  closeModal = () => {
    this.setState({
      modalIsOpen: false
    });
  }

  getMovieInfo(imdbID) {
    this.props
      .dispatch(fetchOmdbInfo(imdbID))
      .then(() => {
        this.openModal();
        console.log(this.props.movieInfo);
      })
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
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          shouldCloseOnOverlayClick={true}
          style={customStyles}
        >
          <div>{this.props.movieInfo.Title}</div>

        </Modal>
      </StyledMovieModal>
    );
  }
}

const mapStateToProps = state => {
  return {
    movieInfo: state.movie.currentMovie
  };
};

export default connect(mapStateToProps)(MovieModal);