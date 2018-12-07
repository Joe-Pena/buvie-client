import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import { fetchCurrentuser, fetchMatches } from '../actions/users';
import GenreSelection from '../components/genre-selection';
import MovieSelection from '../components/movie-selection';
import Chat from './chat';
import styled from 'styled-components';

const StyledDashboard = styled.div`
  background-color: #212032;
  color: #fff;
  height: 100vh;
  display: grid;
  grid-template-columns: 0.25fr 1fr 0.25fr;
  grid-column-gap: 3rem;
  grid-template-areas: "profile matches adspace";
  padding: 0 3rem;

  .dashboard-profile {
    grid-area: profile;
    background-color: #8b8b99;
    height: 85%;
    align-self: center;
  }

  .dashboard-matches {
    grid-area: matches;
    display: grid;
    grid-template-rows: 1fr 1fr 1fr;
    grid-row-gap: 2rem;
    grid-template-areas: 
      "first-match"
      "second-match"
      "third-match";
    height: 85%;
    align-self: center;
  }

  .first-match {
    grid-area: first-match;
    background-color: #8b8b99;
  }

  .second-match {
    grid-area: second-match;
    background-color: #8b8b99;
  }

  .third-match {
    grid-area: third-match;
    background-color: #8b8b99;
  }

  .thirdspace {
    grid-area: adspace;
    background-color: #8b8b99;
    height: 85%;
    align-self: center;
  }

`;

export class Dashboard extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchCurrentuser())
      .then(() => this.props.dispatch(fetchMatches()));
  }

  render() {
    console.log(this.props);
    if (!this.props.genres.length) {
      return <GenreSelection />;
    }

    if (!this.props.movies.length) {
      return <MovieSelection />;
    }

    const matches = this.props.matches.map(user => {
      let matchGenres;
      if (user.genres) {
        matchGenres = user.genres.map(genre => {
          return (<h4 key={genre}>{genre}</h4>);
        });
      }
      let matchMovies;
      if (user.movies) {
        matchMovies = user.movies.map(movie => {
          return (
            <React.Fragment key={movie._id}>
              <h4 >{movie.title}</h4>
              <img src={movie.poster} alt={movie.title} />
            </React.Fragment>
          );
        });
      }
      return (
        <React.Fragment key={user.id}>
          <h3>{user.username}</h3>
          {matchGenres}
          {matchMovies}
        </React.Fragment>
      );
    });

    return (
      <StyledDashboard className="dashboard">
        <div className="dashboard-profile">
          <h2>{this.props.username}</h2>
        </div>
        <div className="dashboard-matches">
          <div className="first-match">
            {
              matches[0] ?
                matches[0] :
                'No more matches'
            }
          </div>
          <div className="second-match">
            {
              matches[1] ?
                matches[1] :
                'No more matches'
            }
          </div>
          <div className="third-match">
            {
              matches[2] ?
                matches[2] :
                'No more matches'
            }
          </div>
        </div>

        <div className="thirdspace">
          <Chat />
        </div>
      </StyledDashboard>
    );
  }
}

const mapStateToProps = state => {
  return {
    username: state.auth.currentUser.username,
    movies: state.user.movies,
    genres: state.user.genres,
    matches: state.user.matches
  };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
