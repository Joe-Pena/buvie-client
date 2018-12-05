import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import styled from 'styled-components';

import RegistrationForm from './registration-form';
import logo from '../images/buvienamelogo.png';

const StyledRegistrationPage = styled.div`
  display: grid;
  grid-template-rows: 0.5fr 1fr 0.3fr;
  grid-template-areas: 
    "logo"
    "form"
    "login-btn";
  color: #8b8b99;
  background-color: #212032;
  text-align: center;
  font-size: 1.6rem;
  min-height: 100vh;

  img {
    grid-area: logo;
    color: #fff;
    align-self: center;
    justify-self: center;
    width: 20rem;
  }

  form {
    grid-area: form;
    font-size: 2rem;
    align-self: center;
  }

  button {
    grid-area: login-btn;
    font-size: 1rem;
    align-self: flex-start;
  }

  input {
    border: none;
    color: #8b8b99;
    background-color: #212032;
    border-bottom: 0.1rem solid #8b8b99;
  }
`;

export function RegistrationPage(props) {
  if (props.loggedIn) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <StyledRegistrationPage>
      <img src={logo} className="buvie-landing-logo" />
      <RegistrationForm />
      <Link to="/">Login</Link>
    </StyledRegistrationPage>
  );
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(RegistrationPage);
