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
  fetchNotification
} from '../actions/users';
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
	grid-template-areas: 'profile matches adspace';
	padding: 0 3rem;


  .dashboard-profile {
    grid-area: profile;
    background-color: #8b8b99;
    display: grid;
    grid-template-rows: 0.15fr 0.1fr 1fr 1fr;
    grid-template-areas:
      "avatar"
      "username"
      "content";
    height: 85%;
    align-self: center;
  }

  .dashboard-profile-avatar {
    grid-area: avatar;
    border-radius: 100rem;
    justify-self: center;
    align-self: center;
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
		grid-template-rows: 0.2fr 0.6fr 0.2fr;
		grid-template-columns: 0.1fr 1fr 0.25fr 0.25fr;
		grid-template-areas:
			'avatar username genres genres'
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
			'avatar username genres genres'
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
			'avatar username genres genres'
			'movies movies genres genres'
			'. . popcorn-btn ignore-btn';
	}

	.thirdspace {
		grid-area: adspace;
		background-color: #8b8b99;
		height: 85%;
		align-self: center;

		text-align: center;
		h2: {
			font-weight: 400;
			text-transform: uppercase;
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

    const matches = this.props.matches
      .filter(user => !this.props.filter.includes(user.id))
      .map(user => {
        let gravatar = `https://www.gravatar.com/avatar/${md5(
          user.email
        )}?d=retro`;
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
          matchMovies = user.movies.map(movie => {
            return (
              <li key={movie._id}>
                <img
                  src={movie.poster}
                  className="match-movie-poster"
                  alt={movie.title}
                />
              </li>
            );
          });
        }

        matchMovies = matchMovies.slice(0, 3);
        return (
          <React.Fragment key={user.id}>
            <img className="match-avatar" src={gravatar} alt={user.username} />
            <h3 className="match-username">{user.username}</h3>
            <ul className="match-genre-list">
              <h3>{user.username} likes:</h3>
              {matchGenres}
            </ul>
            <ul className="match-movie-list">{matchMovies}</ul>
            <button
              className="match-popcorn-btn"
              onClick={() => this.popcorn(user.id)}
            >
              Popcorn
            </button>
            <button
              className="match-chair-btn"
              onClick={() => this.ignore(user.id)}
            >
              Ignore
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
          <React.Fragment key={user._id}>
            <p>{user.username}</p>
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
          </React.Fragment>
        );
      });
    }
    let pending;
    if (this.props.pending) {
      pending = this.props.pending.map(user => {
        return (
          <React.Fragment key={user._id}>
            <p>{user.username}</p>
            <button
              className="match-popcorn-btn"
              onClick={() => this.popcorn(user._id)}
            >
              Re-Popcorn
            </button>
            <button
              className="match-chair-btn"
              onClick={() => this.nevermind(user._id)}
            >
              Never mind
            </button>
          </React.Fragment>
        );
      });
    }

    return (
      <StyledDashboard className="dashboard">
        <div className="dashboard-profile">
          <img className="dashboard-profile-avatar" src={`https://www.gravatar.com/avatar/${md5(this.props.email)}?d=retro`} alt="profile-avatar" />
          <h2 className="dashboard-profile-username">{this.props.username}</h2>
          <div>
            <h3 name='popcorn'>popcorns</h3>
            {popcorns}
          </div>
          <div>
            pending popcorns {pending}
          </div>
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
          <div name='matched'></div>
          <h2>MATCHES</h2>
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
