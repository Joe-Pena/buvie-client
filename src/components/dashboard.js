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
import GenreSelection from '../components/genre-selection';
import MovieSelection from '../components/movie-selection';
import MovieModal from '../components/movie-modal';
import Chat from './chat';
import styled from 'styled-components';
import './clearfix.css';

const StyledDashboard = styled.div`
  background-color: #212032;
  min-height: 100%;
  color: #fff;
  display: grid;
  grid-template-columns: 260px 1fr 0.25fr;
  grid-column-gap: 2rem;
  grid-template-areas: 'profile matches adspace';
  padding: 0 2rem;

  .dashboard-profile {
    grid-area: profile;
    height: 90%;
    background-color: #8b8b99;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 0 2%;

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
      height: 229px;
      overflow: scroll;
      display: flex;
      flex-direction: column;
      padding: 0;
      margin: 0;
    }

    .popcorn-list-user, .popcorn-pending-entity {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
      height: auto;
      min-height: 30px;
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
    height: 90%;
    grid-area: matches;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .first-match {
      margin-bottom: 16px;
    }

    .second-match {
      margin-bottom: 16px;
    }

    .first-match, .second-match, .third-match {
      width: 100%;
      background-color: #8b8b99;
      flex-wrap: wrap;
      display: flex;
      flex-direction: row;
      padding-bottom: 16px;

      .match-avatar {
        position: static;
        height: 40px;
        width: 40px;
        padding-top: 8px;
        padding-left: 8px;
      }

      .match-username {
        position: static;
        padding-top: 8px;
        padding-left: 8px;
        width: calc(35% - 56px);
      }

      .match-location {
        position: static;
        padding-top: 8px;
        padding-left: 8px;
        text-align: right;
        width: 65%;
      }

      .match-movie-poster {
        max-height: 120px;
        max-width: 80px;
        margin: 1rem 1rem;
        justify-self: center;
      }
      .match-genre-list {
        display: none;
      }

      .match-movie-list {
        list-style: none;
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
  }

  .thirdspace {
    height: 90%;
    grid-area: adspace;
    background-color: #8b8b99;
    text-align: center;
    .thirdspace-title {
      font-weight: 400;
      text-transform: uppercase;
      cursor: pointer;
    }
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr 0.5fr;
    grid-template-rows: auto;
    grid-template-areas: 
      "profile profile"
      "matches adspace";
    padding: 0;

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
        height: 229px;
        overflow: scroll;
        display: flex;
        flex-direction: column;
        padding: 0;
        margin: 0;
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
      min-height: 732px;
      margin-left: 16px;
    }

    .thirdspace {
      grid-area: adspace;
      background-color: #8b8b99;
      min-height: 732px;
      align-self: flex-start;
      text-align: center;
      margin-right: 1.5rem;
      height: 90%;
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
        height: 226px;
        overflow: scroll;
        padding: 0;
        margin: 0;
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
            <h4 className="match-location">{user.location.city}</h4>
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
