import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import RegistrationForm from './registration-form';
import queryString from 'query-string';
import jwtDecode from 'jwt-decode';

import { saveAuthToken } from '../local-storage';
import LoginForm from './login-form';
import logo from '../images/buvielogoname.svg';
import { setAuthToken, authSuccess } from '../actions/auth';
import { API_BASE_URL } from '../config';

import googleNormal from '../images/btn_google_signin_light_normal_web.png';
import googleFocus from '../images/btn_google_signin_light_focus_web.png';
import googlePressed from '../images/btn_google_signin_light_pressed_web.png';

const StyledLandingPage = styled.div`
  display: grid;
  grid-template-columns: 1fr 0.5fr;
  grid-template-areas: 
    "info side-login";
  height: 100vh;

  .info-area {
    grid-area: info;
    display: grid;
    grid-template-rows: 1fr 1fr 1fr;
    grid-template-areas: 
      "first"
      "second"
      "third";
    color: #fff;
    text-align: center;
    background-image: linear-gradient(to bottom right,
    rgba(39, 39, 39, 0.8),
    rgba(29, 29, 29, 0.8)),
    url(https://kylegrant76.files.wordpress.com/2015/12/top-10-movies-people-in-movie-theater-with-3d-glasses.jpg);
    background-size: cover;
    background-repeat: no-repeat;
  }

  .info-message {
    grid-area: second;
    align-self: center;
  }

  .side-login {
    grid-area: side-login;
    display: grid;
    grid-template-rows: 0.5fr 1fr 0.3fr 0.3fr;
    grid-template-areas: 
      "logo"
      "loginform"
      "signup-btn"
      "google-btn";
    color: #8b8b99;
    background-color: #212032;
    text-align: center;
    font-size: 1.6rem;
  }

  .buvie-landing-logo {
    grid-area: logo;
    color: #fff;
    align-self: center;
    justify-self: center;
    width: 20rem;
  }

  .landing-login-form {
    grid-area: loginform;
    font-size: 3rem;
    align-self: center;
  }

  .signup-button {
    grid-area: signup-btn;
    font-size: 1.5rem;
    align-self: flex-start;
  }

  .landing-login-form input {
    border: none;
    background-color: #212032;
    border-bottom: 0.1rem solid #8b8b99;
    width: 20rem;
    color: #fff;
    margin: 2rem;
    font-size: 1.6rem;
  }

  .landing-login-btn {
    background-color: #a33944;
    color: #000;
    width: 20rem;
    height: 3rem;
    border: none;
  }

  .form-error {
    font-size: 2rem;
  }

  .google-signup {
    grid-area: google-btn;
    justify-self: center;
    transform: translateX(-50%);
    position: relative;
  }

  .google-normal, .google-pressed, .google-focus {
    grid-area: google-btn;
    justify-self: center;
    transform: translateX(-50%);
    position: absolute;
    display: none;
  }

  .google-signup:hover .google-focus {
    grid-area: google-btn;
    justify-self: center;
    transform: translateX(-50%);
    display: block;
    z-index: 99;
  }

  .google-signup:active .google-pressed {
    grid-area: google-btn;
    justify-self: center;
    transform: translateX(-50%);
    display: block;
    z-index: 100;
  }

  .google-normal {
    grid-area: google-btn;
    justify-self: center;
    transform: translateX(-50%);
    display: block
  }
`;

export class LandingPage extends React.Component {
  // If we are logged in redirect straight to the user's dashboard
  constructor(props) {
    super(props);
    this.state = {
      signUp: false,
    };
  }

  componentDidMount() {
    if (this.props.location.search) {
      const authToken = queryString.parse(this.props.location.search).authToken;

      if (authToken) {
        const decodedToken = jwtDecode(authToken);
        this.props.dispatch(setAuthToken(authToken));
        this.props.dispatch(authSuccess(decodedToken.user));
        saveAuthToken(authToken);
      }
    }
  }

  render() {
    if (this.props.loggedIn) {
      return <Redirect to="/dashboard" />;
    }

    return (
      <StyledLandingPage className="landing-page-main-grid">
        <div className="info-area">
          <h1 className="info-message">Buvie, find friends to watch your <br />favorite movies with!</h1>
        </div>
        <div className="side-login">
          <img src={logo} alt="Buvie logo" className="buvie-landing-logo" />
          { this.state.signUp ?
            <RegistrationForm />
            :
            <LoginForm />
          }
          <a className="google-signup" href={`${API_BASE_URL}/auth/google`}>
            <img className="google-normal" src={googleNormal} alt="login with google" />
            <img className="google-pressed" src={googlePressed} alt="login with google" />
            <img className="google-focus" src={googleFocus} alt="login with google" />
          </a>
          { this.state.signUp ?
            <span className="signup-button" >Already a member?<Link to="/" onClick={() => this.setState({ signUp: !this.state.signUp })}>Login</Link></span>
            :
            <span className="signup-button" >Not a member?<Link to="/" onClick={() => this.setState({ signUp: !this.state.signUp })}>Register</Link></span>
          }
        </div>
      </StyledLandingPage>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);
