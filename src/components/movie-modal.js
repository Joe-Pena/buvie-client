import React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { fetchOmdbInfo } from '../actions/movies-action';

const StyledMovieModal = styled.div`
  .match-movie-poster {
		width: 12rem;
		margin: 0 1rem;
		justify-self: center;
	}
`;

const StyledMovieInfo = styled.div`
  .movie-title {
    text-align: center;
    font-size: 3rem;
  }

  .movie-year {
    font-size: 1.75rem;
    font-weight: 300;
  }
  .modal-movie-poster {
    width: 17rem;
    margin: 1rem;
  }

  .basic-info {
    display: flex;
    justify-content: space-evenly;  
    font-weight: 300;
  }

  .main-movie-info {
    display: grid;
    grid-template-columns: 1fr 2fr;
    font-size: 1.25rem;
    margin-top: 1rem;
  }

  .plot {
    margin: 1rem 0;
  }

  .ratings {
    display: flex;
    justify-content: space-evenly;
    font-size: 1.25rem;
  }
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
    justifyContent: 'space-between',
    backgroundColor: '#212032',
    color: '#fff'
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
      })
  }

  render() {
    const { movie, movieInfo } = this.props;
    let ratings;
    if (movieInfo.Ratings) {
      ratings = movieInfo.Ratings.map(rating => {
        return (
          <p key={`${movieInfo.imdbID}${rating.Source}`}>{`${rating.Value} on ${rating.Source}`}</p>
        );
      });
    }
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
          <StyledMovieInfo>
            <h3 className='movie-title'>{movieInfo.Title}<span className='movie-year'>{` (${movieInfo.Year})`}</span></h3>
            <div className='basic-info'>
              <p>{movieInfo.Rated}</p>
              <p>{movieInfo.Genre}</p>
              <p>{movieInfo.Runtime}</p>
            </div>
            <div className='main-movie-info'>
              <img
                src={movieInfo.Poster}
                className="modal-movie-poster"
                alt={movieInfo.Title}
                onClick={() => this.getMovieInfo(movie.imdbID)}
              /> 
              <div className='plot'>
                <p>{movieInfo.Plot}</p>
              </div>
            </div>
            <div className='ratings'>
              {ratings}
            </div>
          </StyledMovieInfo>

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