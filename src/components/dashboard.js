import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import { fetchCurrentuser } from '../actions/users';
import GenreSelection from '../components/genre-selection';
import MovieSelection from '../components/movie-selection';

export class Dashboard extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchCurrentuser());
  }

  render() {
    console.log(this.props.genres);
    if (!this.props.genres.length) {
      return <GenreSelection />;
    }

    if (!this.props.movies.length) {
      return <MovieSelection />;
    }

    return (
      <div className="dashboard">
        <div className="dashboard-username">
          Username: {this.props.username}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    username: state.auth.currentUser.username,
    protectedData: state.protectedData.data,
    movies: state.user.movies,
    genres: state.user.genres
  };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
