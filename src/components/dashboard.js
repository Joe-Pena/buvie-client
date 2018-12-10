import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import { fetchCurrentuser, fetchMatched, fetchMatches, popCornMatch, fetchPopcorn } from '../actions/users';
import GenreSelection from '../components/genre-selection';
import MovieSelection from '../components/movie-selection';
import Chat from './chat';
import styled from 'styled-components';
import './clearfix.css';

const StyledDashboard = styled.div`
  background-color: #212032;
  color: #fff;
  height: 100rem; /*TODO: FIX THIS LINE. 100% OR 100VH DOES NOT COVER ENTIRE SCREEN */
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
    grid-row-gap: 1.5rem;
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
    display: grid;
    grid-template-rows: 0.2fr 1fr 0.2fr;
    grid-template-columns: 0.5fr 1fr 0.25fr 0.25fr;
    grid-template-areas:
      "username . genres genres"
      "movies movies genres genres"
      ". . popcorn-btn ignore-btn";
  }

  .second-match {
    grid-area: second-match;
    background-color: #8b8b99;
    display: grid;
    grid-template-rows: 0.2fr 1fr 0.2fr;
    grid-template-columns: 0.5fr 1fr 0.25fr 0.25fr;
    grid-template-areas:
    "username . genres genres"
      "movies movies genres genres"
      ". . popcorn-btn ignore-btn";
  }

  .third-match {
    grid-area: third-match;
    background-color: #8b8b99;
    display: grid;
    grid-template-rows: 0.2fr 1fr 0.2fr;
    grid-template-columns: 0.5fr 1fr 0.25fr 0.25fr;
    grid-template-areas:
    "username . genres genres"
      "movies movies genres genres"
      ". . popcorn-btn ignore-btn";
  }

  .thirdspace {
    grid-area: adspace;
    background-color: #8b8b99;
    height: 85%;
    align-self: center;
  }

  .match-username {
    grid-area: username;
    position: relative;
    left: 1.5rem;
  }

  .match-genre-list {
    grid-area: genres;
    list-style: none;
    word-wrap: none;
  }

  .match-movie-list {
    grid-area: movies;
    list-style: none;
    position: relative;
    left: 5rem;
  }

  .match-movie-list li{
    display: inline-block;
  }

  .match-movie-poster {
    width: 10rem;
    margin: 0 1rem;
    justify-self: center;
  }

  .match-popcorn-btn {
    grid-area: popcorn-btn;
    background-color: #a33944;
    color: #000;
    width: 8rem;
    height: 3rem;
    border: none;
  }

  .match-chair-btn {
    grid-area: ignore-btn;
    background-color: #b8b999;
    color: #000;
    width: 8rem;
    height: 3rem;
    border: none;
  }
`;

export class Dashboard extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchCurrentuser())
      .then(() => this.props.dispatch(fetchMatches()))
      .then(() => this.props.dispatch(fetchPopcorn()))
      .then(() => this.props.dispatch(fetchMatched()));
  }

  render() {
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
          return (<li key={genre} className="match-genre">{genre}</li>);
        });
      }
      let matchMovies;
      if (user.movies) {
        matchMovies = user.movies.map(movie => {
          return (
            <li key={movie._id}>
              <img src={movie.poster} className="match-movie-poster" alt={movie.title} />
            </li>
          );
        });
      }
      return (
        <React.Fragment key={user.id}>
          <h3 className="match-username">{user.username}</h3>
          <ul className="match-genre-list">
            <h3>{user.username} likes:</h3>
            {matchGenres}
          </ul>
          <ul className="match-movie-list">
            {matchMovies}
          </ul>
          <button className="match-popcorn-btn" onClick={() => this.props.dispatch(popCornMatch({ userId: user.id }))}>
            Popcorn
          </button>
          <button className="match-chair-btn">Chair</button>
        </React.Fragment>
      );
    });

    let chats;
    console.log(this.props);
    if (this.props.matched.matched) {
      chats = this.props.matched.matched.map(match => {
        return (<Chat key={match._id} matched={match}/>);
      });
    }
    return (
      <StyledDashboard className="dashboard">
        <div className="dashboard-profile">
          <h2>{this.props.username}</h2>
        </div>
        <div className="dashboard-matches">
          {/* =========================================FIRST MATCH================ */}
          <div className="first-match">
            {
              matches[0] ?
                matches[0] :
                'No more matches'
            }
          </div>
          {/* =========================================SECOND MATCH================ */}
          <div className="second-match">
            {
              matches[1] ?
                matches[1] :
                'No more matches'
            }
          </div>
          {/* =========================================THIRD MATCH================ */}
          <div className="third-match">
            {
              matches[2] ?
                matches[2] :
                'No more matches'
            }
          </div>
        </div>

        <div className="thirdspace">
          {chats}
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
    matches: state.user.matches,
    popcorn: state.user.popcorn,
    matched: state.user.matched
  };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
