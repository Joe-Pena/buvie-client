import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleProfilePage } from '../actions/users';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';

const ProfileMain = styled.main`
	width: 80%;
	margin: 0 auto;
`;

class ProfilePage extends Component {
  render() {
    if (!this.props.profilePage) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <ProfileMain>
        <h1>Hello</h1>
        <h1>Hello</h1>
        <h1>Hello</h1>
        <h1>Hello</h1>
        <h1>Hello</h1>
        <h1>Hello</h1>
      </ProfileMain>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null,
  user: state.auth.currentUser,
  profilePage: state.user.profilePage
});

export default connect(mapStateToProps)(ProfilePage);
