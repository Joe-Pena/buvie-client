import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import styled from 'styled-components';

import LoginForm from './login-form';
import './landingpage.css';

export function LandingPage(props) {
  // If we are logged in redirect straight to the user's dashboard
  if (props.loggedIn) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="landing-page-main-grid">
      <div className="info-area">
        <h1 className="info-message">Buvie, find friends to watch your <br />favorite movies with!</h1>
      </div>
      <div className="side-login">
        <h2 className="buvie-landing-logo">Buvie</h2>
        <LoginForm />
        <span className="signup-button">Not a member?<Link to="/register">Register</Link></span>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);
