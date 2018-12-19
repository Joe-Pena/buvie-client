import React from 'react';
import { connect } from 'react-redux';
import md5 from 'js-md5';
import requiresLogin from './requires-login';
import {
  fetchCurrentuser,
  fetchMatched,
  fetchMatches,
  popCornMatch,
  fetchPopcorn,
  filterUser,
  chairUser,
  neverMindUser,
  fetchNotification,
  fetchMatchesNearMe
} from '../actions/users';
import { Redirect } from 'react-router-dom';
import GenreSelection from '../components/genre-selection';
import MovieSelection from '../components/movie-selection';
import MovieModal from '../components/movie-modal';
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
grid-template-areas: 'profile matches adspace';
padding: 0 3rem;

@media (max-width: 768px) {
  grid-template-columns: 1fr 0.5fr;
  grid-template-rows: 0.25fr 1fr;
  /* grid-row-gap: 1rem; */
  /* grid-column-gap: 1rem; */
  grid-template-areas: 
    "profile profile"
    "matches adspace";
  padding: 0;
};

.dashboard-profile {
  padding: 2%;
  grid-area: profile;
  grid-row-gap: 3rem;
  background-color: #8b8b99;
  display: grid;
  grid-template-rows: 0.15fr 0.1fr 0.1fr 1fr 0.1fr 1fr;
  grid-template-areas:
    'avatar'
    'username'
    'popcorns'
    'popcorns-list'
    'pending'
    'pending-list';
  height: 85%;
  align-self: center;
}

.popcorn-div {
  grid-area: popcorns-list;
  display: grid;
  grid-auto-rows: 6rem;
  padding-right: 6rem;
  flex-direction: column;
  max-height: 300px;
  overflow: auto;
  justify-content: center;
  margin: auto;
}

.popcorn-pending-div {
  grid-area: pending-list;
  display: grid;
  grid-auto-rows: 6rem;
  padding-right: 6rem;
  flex-direction: column;
  height: 100vh;
  max-height: 300px;
  overflow: auto;
  justify-content: center;
  margin: auto;
}

.popcorn-pending-div::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #f5f5f5;
}
.popcorn-pending-div::-webkit-scrollbar {
  width: 2px;
  background-color: #f5f5f5;
}

.popcorn-pending-div::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #555;
}

.popcorn-pending-entity {
  height: 40px;
}

.popcorn-pending-title {
  grid-area: pending;
}

.dashboard-profile-avatar {
  grid-area: avatar;
  border-radius: 100rem;
  justify-self: center;
  align-self: center;
  width: 166px;
  height: 166px;
  border: 3px solid #0a2e4c;
}

.dashboard-profile-username {
  grid-area: username;
  justify-self: center;
}

.dashboard-matches {
  grid-area: matches;
  display: grid;

  grid-template-rows: 0.8fr 0.8fr 0.8fr;
  grid-row-gap: 1.5rem;
  grid-template-areas:
    'first-match'
    'second-match'
    'third-match';
  height: 85%;
  align-self: center;
}

.first-match {
  grid-area: first-match;
  background-color: #8b8b99;
  display: grid;
  grid-template-rows: 0.2fr 0.6fr 0.2fr;
  grid-template-columns: 0.1fr 1fr 0.25fr 0.25fr;
  grid-template-areas:
    'avatar username location location'
    'movies movies genres genres'
    '. . popcorn-btn ignore-btn';
}

.second-match {
  grid-area: second-match;
  background-color: #8b8b99;
  display: grid;
  grid-template-rows: 0.2fr 0.6fr 0.2fr;
  grid-template-columns: 0.1fr 1fr 0.25fr 0.25fr;
  grid-template-areas:
    'avatar username location location'
    'movies movies genres genres'
    '. . popcorn-btn ignore-btn';
}

.third-match {
  grid-area: third-match;
  background-color: #8b8b99;
  display: grid;
  grid-template-rows: 0.2fr 0.6fr 0.2fr;
  grid-template-columns: 0.1fr 1fr 0.25fr 0.25fr;
  grid-template-areas:
    'avatar username location location'
    'movies movies genres genres'
    '. . popcorn-btn ignore-btn';
}

.thirdspace {
  grid-area: adspace;
  background-color: #8b8b99;
  height: 85%;
  align-self: center;
  text-align: center;
  .thirdspace-title {
    font-weight: 400;
    text-transform: uppercase;
    cursor: pointer;
  }
}

.match-avatar {
  grid-area: avatar;
  position: relative;
  top: 0.5rem;
  left: 1rem;
  width: 4rem;
  border-radius: 100rem;
}

.match-username {
  grid-area: username;
  position: relative;
  align-self: center;
  left: 1.5rem;
}

.match-location {
  grid-area: location;
  justify-self: center;
  align-self: center;
  /* font-weight: 300; */
}

.match-genre-list {
  grid-area: genres;
  align-self: center;
  list-style: none;
  word-wrap: none;
  font-weight: 300;
}

.match-movie-list {
  grid-area: movies;
  list-style: none;
  position: relative;
  left: 5rem;
}

.match-movie-list li {
  display: inline-block;
}

.match-movie-poster {
  width: 12rem;
  max-height: 177px;
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
  cursor: pointer;
}

.match-chair-btn {
  grid-area: ignore-btn;
  background-color: #b8b999;
  color: #000;
  width: 8rem;
  height: 3rem;
  border: none;
  cursor: pointer;
  font-family: inherit;
}

@media (max-width: 768px) {
  .dashboard-profile {
    grid-area: profile;
    grid-template-rows: 1fr 0.25fr 0.5fr;
    grid-template-columns: 1fr 0.5fr 0.5fr;
    grid-template-areas: 
      "avatar popcorns-list pending-list"
      "username popcorns-list pending-list"
      ". popcorns pending";
    margin: 0 1.5rem;
    border-radius: 2px;
    /* width: 100vw; */
  }

  .dashboard-profile-avatar {

  }

  .thirdspace {
  grid-area: adspace;
  background-color: #8b8b99;
  height: 85%;
  align-self: flex-start;
  text-align: center;
  margin-right: 1.5rem;
  }

  .dashboard-matches {
  grid-area: matches;
  display: grid;

  grid-template-rows: 0.8fr 0.8fr 0.8fr;
  grid-row-gap: 0.8rem;
  grid-template-areas:
    'first-match'
    'second-match'
    'third-match';
  height: 85%;
  align-self: flex-start;
  margin-left: 1.5rem;
  }

  .first-match {
  grid-area: first-match;
  background-color: #8b8b99;
  display: grid;
  grid-template-rows: 0.2fr 0.6fr 0.4fr 0.25fr;
  grid-template-columns: 0.25fr 1fr 0.75fr;
  grid-template-areas:
    'avatar username location'
    'movies movies movies'
    'genres genres popcorn-btn'
    'genres genres ignore-btn';
  padding: 0.5rem;
  border-radius: 2px;
  }

  .second-match {
    grid-area: second-match;
    background-color: #8b8b99;
    display: grid;
    grid-template-rows: 0.2fr 0.6fr 0.4fr 0.25fr;
    grid-template-columns: 0.25fr 1fr 0.75fr;
    grid-template-areas:
    'avatar username location'
    'movies movies movies'
    'genres genres popcorn-btn'
    'genres genres ignore-btn';
    padding: 0.5rem;
    border-radius: 2px;
  }

  .third-match {
    grid-area: third-match;
    background-color: #8b8b99;
    display: grid;
    grid-template-rows: 0.2fr 0.6fr 0.4fr 0.25fr;
    grid-template-columns: 0.25fr 1fr 0.75fr;
    grid-template-areas:
    'avatar username location'
    'movies movies movies'
    'genres genres popcorn-btn'
    'genres genres ignore-btn';
    padding: 0.5rem;
    border-radius: 2px;
  }

  .match-movie-poster {
    width: 8rem;
  }

  .match-genre-list {
    justify-self: center;
    font-size: 1.0rem;
  }

  .match-location {
    font-size: 1.2rem;
  }

  .thirdspace {
    height: 100%;
    border-radius: 2px;
  }
};

  @media (max-width: 550px) {
    display: flex;
    flex-direction: column;
    background-color: #212032;
    color: #fff;
    height: auto;
    
    .dashboard-profile {
      width: calc(100% - 32px);
      background-color: #8b8b99;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      height: auto;
      padding: 0 2%;
      margin: 0 16px 16px;

      h2, h3 {
        text-align: center;
      }

      h3 {
        margin-bottom: 8px;
      }

      .dashboard-profile-avatar {
        border-radius: 100rem;
        justify-self: center;
        align-self: center;
        width: 166px;
        height: 166px;
        border: 3px solid #0a2e4c;
        margin: 16px;
      }

      .popcorn-div, .popcorn-pending-div {
        display: flex;
        flex-direction: column;
        padding: 0;
        margin: 0;
        max-height: none;
        height: auto;
      }

      .popcorn-list-user, .popcorn-pending-entity {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 8px;
        height: auto;
        border-bottom: 1px solid black;
      }

      .match-popcorn-btn {
        grid-area: popcorn-btn;
        background-color: #a33944;
        color: #000;
        width: 6rem;
        height: 3rem;
        border: none;
        cursor: pointer;
      }

      .match-chair-btn {
        grid-area: ignore-btn;
        background-color: #b8b999;
        color: #000;
        width: 6rem;
        height: 3rem;
        border: none;
        cursor: pointer;
        font-family: inherit;
      }
    }

    .dashboard-matches {
      width: calc(100% - 32px);
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      height: auto;
      margin: 0 16px 16px;

      .first-match, .second-match, .third-match {
        width: 100%;
        background-color: #8b8b99;
        margin-bottom: 16px;
        flex-wrap: wrap;
        display: flex;
        flex-direction: row;

        .match-avatar {
          position: static;
          height: 40px;
          width: 40px;
        }

        .match-username {
          position: static;
          padding-left: 8px;
          width: calc(100% - 40px);
        }

        .match-genre-list {
          display: none;
        }

        .match-movie-list {
          position: static;
          width: 100%;
          display: flex;
          justify-content: space-around;
        }

        .match-popcorn-btn {
          grid-area: popcorn-btn;
          background-color: #a33944;
          color: #000;
          width: calc(50% - 32px);
          margin-right: 16px;
          margin-left: 16px;
          height: 3rem;
          border: none;
          cursor: pointer;
        }

        .match-chair-btn {
          grid-area: ignore-btn;
          background-color: #b8b999;
          color: #000;
          width: calc(50% - 32px);
          margin-right: 16px;
          margin-left: 16px;
          height: 3rem;
          border: none;
          cursor: pointer;
          font-family: inherit;
        }
      }

      .movie-list-3 {
        display: none;
      }
    }

    .thirdspace {
      width: calc(100% - 32px);
      background-color: #8b8b99;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      height: auto;
      padding: 0 2%;
      margin: 0 16px 16px;
    }
  }
`;

export class Dashboard extends React.Component {
  componentDidMount() {
    this.props
      .dispatch(fetchCurrentuser())
      .then(() => this.props.dispatch(fetchMatches()))
      .then(() => this.props.dispatch(fetchPopcorn()))
      .then(() => this.props.dispatch(fetchMatched()))
      .then(() => this.props.dispatch(fetchNotification()));
  }

  popcorn(userId) {
    this.props
      .dispatch(popCornMatch({ userId }))
      .then(() => this.props.dispatch(filterUser(userId)))
      .then(() => this.props.dispatch(fetchCurrentuser()))
      .then(() => this.props.dispatch(fetchMatches()))
      .then(() => this.props.dispatch(fetchPopcorn()))
      .then(() => this.props.dispatch(fetchMatched()));
  }

  ignore(userId) {
    this.props
      .dispatch(chairUser(userId))
      .then(() => this.props.dispatch(filterUser(userId)))
      .then(() => this.props.dispatch(fetchCurrentuser()))
      .then(() => this.props.dispatch(fetchMatches()))
      .then(() => this.props.dispatch(fetchPopcorn()))
      .then(() => this.props.dispatch(fetchMatched()));
  }

  nevermind(userId) {
    this.props
      .dispatch(neverMindUser(userId))
      .then(() => this.props.dispatch(filterUser(userId)))
      .then(() => this.props.dispatch(fetchCurrentuser()))
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

    let userProfilePicture;

    if (this.props.profilePicture) {
      userProfilePicture = this.props.profilePicture;
    } else {
      userProfilePicture = `https://www.gravatar.com/avatar/${md5(
        this.props.email
      )}?d=retro&s=160`;
    }

    const matches = this.props.matches
      .filter(user => !this.props.filter.includes(user.id))
      .map(user => {
        let gravatar;
        if (user.profilePicture) {
          gravatar = user.profilePicture;
        } else {
          gravatar = `https://www.gravatar.com/avatar/${md5(
            user.email
          )}?d=retro`;
        }
        let matchGenres;
        if (user.genres) {
          matchGenres = user.genres.map(genre => {
            return (
              <li key={genre} className="match-genre">
                {genre}
              </li>
            );
          });
        }
        let matchMovies;
        if (user.movies) {
          matchMovies = user.movies.map((movie, i) => {
            return (
              <li className={`movie-list-${i+1}`} key={movie._id}>
                <MovieModal movie={movie} />
              </li>
            );
          });
        }

        matchMovies = matchMovies.slice(0, 3);
        return (
          <React.Fragment key={user.id}>
            <img className="match-avatar" src={gravatar} alt={user.username} />
            <h3 className="match-username">{user.username}</h3>
            <h3 className="match-location">{user.location.city}</h3>
            <ul className="match-genre-list">
              <h3>{user.username} likes:</h3>
              {matchGenres}
            </ul>
            <ul className="match-movie-list">{matchMovies}</ul>
            <button
              className="match-popcorn-btn"
              onClick={() => this.popcorn(user.id)}
            >
              POPCORN
            </button>
            <button
              className="match-chair-btn"
              onClick={() => this.ignore(user.id)}
            >
              IGNORE
            </button>
          </React.Fragment>
        );
      });

    let chats;
    if (this.props.matched.matched) {
      chats = this.props.matched.matched.map(match => {
        return <Chat key={match.chatroom._id} matched={match} />;
      });
    }

    let popcorns;
    if (this.props.popcorn) {
      popcorns = this.props.popcorn.map(user => {
        return (
          <div className="popcorn-list-user" key={user._id}>
            <p>{user.username}</p>
            <div className="popcorn-list-user-buttons">
              <button
                className="match-popcorn-btn"
                onClick={() => this.popcorn(user._id)}
              >
              Popcorn
              </button>
              <button
                className="match-chair-btn"
                onClick={() => this.ignore(user._id)}
              >
              Ignore
              </button>
            </div>
          </div>
        );
      });
    }
    let pending;
    if (this.props.pending) {
      pending = this.props.pending.map(user => {
        return (
          <div className="popcorn-pending-entity" key={user._id}>
            <p>{user.username}</p>
            <div className="popcorn-pending-entity-buttons">
              <button
                className="match-popcorn-btn"
                onClick={() => this.popcorn(user._id)}
              >
              RE-POP
              </button>
              <button
                className="match-chair-btn"
                onClick={() => this.nevermind(user._id)}
              >
              NVM
              </button>
            </div>
          </div>
        );
      });
    }

    return (
      <StyledDashboard className="dashboard">
        <div className="dashboard-profile">
          <img
            className="dashboard-profile-avatar"
            src={userProfilePicture}
            alt="profile picture"
          />
          <h2 className="dashboard-profile-username">{this.props.username}</h2>
          <h3 name="popcorn">Popcorns</h3>
          <div className="popcorn-div">{popcorns}</div>
          <h3 className="popcorn-pending-title" name="pending-popcorn">
            Pending
          </h3>
          <div className="popcorn-pending-div">{pending}</div>
        </div>
        <div className="dashboard-matches">
          {/* =========================================FIRST MATCH================ */}
          <div className="first-match">
            {matches[0] ? matches[0] : 'No more matches'}
          </div>
          {/* =========================================SECOND MATCH================ */}
          <div className="second-match">
            {matches[1] ? matches[1] : 'No more matches'}
          </div>
          {/* =========================================THIRD MATCH================ */}
          <div className="third-match">
            {matches[2] ? matches[2] : 'No more matches'}
          </div>
        </div>

        <div className="thirdspace">
          <div name="matched" />
          <h2 className="thirdspace-title">MATCHES</h2>
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
    email: state.auth.currentUser.email,
    profilePicture: state.auth.currentUser.profilePicture,
    movies: state.user.movies,
    genres: state.user.genres,
    matches: state.user.matches,
    popcorn: state.user.popcorn,
    pending: state.user.pending,
    matched: state.user.matched,
    filter: state.user.filter
  };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
