import React from 'react';
import { connect } from 'react-redux';
import { clearAuth } from '../actions/auth';
import { clearAuthToken } from '../local-storage';
import styled from 'styled-components';
import logoName from '../images/buvielogoname.svg';

const StyledHeaderBar = styled.div`
    display: grid;
    grid-template-columns: 1fr 0.2fr 0.1fr;
    grid-template-areas: "logo profile logout";
    text-align: center;
    background-color: #212032;

    .nav-logo {
      grid-area: logo;
      width: 8rem;
    }

    .nav-logout-btn {
      grid-area: logout;
      background-color: #a33944;
      color: #000;
      justify-self: center;
      width: 10rem;
      height: 3rem;
      margin-right: 2rem;
      border: none;
    }

    .welcome-message {
      color: #fff;
      font-size: 1.6rem;
      position: relative;
      right: 1rem;
    }
`;
export class HeaderBar extends React.Component {
  logOut() {
    this.props.dispatch(clearAuth());
    clearAuthToken();
  }

  render() {
    let logOutButton;
    if (this.props.loggedIn) {
      logOutButton = (
        <button className="nav-logout-btn" onClick={() => this.logOut()}>Log out</button>
      );
    }
    return (
      <StyledHeaderBar className="header-bar">
        <img src={logoName} alt="buvie logo" className="nav-logo"/>
        {this.props.loggedIn ?
          <h2 className="welcome-message">Welcome, {this.props.user.username}!</h2>
          :
          <div></div>
        }
        {logOutButton}
      </StyledHeaderBar>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null,
  user: state.auth.currentUser,
});

export default connect(mapStateToProps)(HeaderBar);
