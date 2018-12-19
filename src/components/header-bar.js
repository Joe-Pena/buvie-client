import React from 'react';
import { connect } from 'react-redux';
import { clearAuth } from '../actions/auth';
import { resetUser } from '../actions/users';
import { resetMovies } from '../actions/movies-action';
import { clearAuthToken } from '../local-storage';
import { Redirect, Link } from 'react-router-dom';
import styled from 'styled-components';
import logoName from '../images/buvielogoname.svg';
import DropDown from './dropdown';

const StyledHeaderBar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  .header-top {
    padding: 16px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .nav-logo {
    width: 8rem;
    position: relative;
    left: 0.5rem;
    top: 0.5rem;
  }

  .header-right {
    display: none;
  }

  .menu-button {
    display: block;
    font-size: 80%;
    padding: 0.1rem 0.3rem;
    height: 50%;
    cursor: pointer;
    text-decoration: none;
    line-height: 1;
    border: 1px solid transparent;
    border-radius: 0.25rem;
  }

  nav {
    display: ${props => props.isCollapsed ? 'none' : 'block'};
    position: absolute;
    margin-top: 8px;
    margin-left: auto;
    margin-right: 16px;
    display: flex;
    flex-direction: column;
    padding-left: 0;
    right: 0;
    top: 50px;
    list-style: none;
    letter-spacing: .0625rem;
  }

  a {
    display: block;
    text-decoration: none;
    color: #fff;
  }

  .menu-item {
    background-color: #333;
    display: ${props => props.isCollapsed ? 'none' : 'block'};
    padding: 0 16px;

    &:hover {
      background-color: #666;
    }
  }

  @media (min-width: 768px) {
    .menu-button {
      display: none;
    }

    .header-right {
      display: flex;
      align-items: center;
    }

    .nav-logout-btn {
      background-color: #a33944;
      color: #000;
      margin-left: 16px;
      width: 120px;
      height: 3rem;
      border: none;
      cursor: pointer;
    }

    .dropdown-wrapper {
      display: block;
      color: #fff;
      margin-left: 16px;
      font-size: 1.6rem;
      cursor: pointer;
    }

    .welcome-message {
      display: block;
      color: #fff;
      font-size: 1.6rem;
      font-weight: 600;
    }
  }
`;

export class HeaderBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCollapsed: true
    };
  }

  logOut() {
    this.props.dispatch(clearAuth());
    this.props.dispatch(resetMovies());
    this.props.dispatch(resetUser());
    clearAuthToken();
  }

  toggleMenu() {
    this.setState({
      isCollapsed: !this.state.isCollapsed
    });
  }

  render() {
    let linkLocation;
    let headerBarMessage;
    let username;
    let logOutButton;
    let notifications;

    if (this.props.loggedIn) {
      username = this.props.user.username;
      logOutButton = (
        <button className="nav-logout-btn" onClick={() => this.logOut()}>
          Log out
        </button>
      );
      notifications = (
        <DropDown
          className="notifications"
          isCollapsed={this.state.isCollapsed}
          title="Notifications"
          listArr={this.props.notifications}
          time={this.props.notificationCheck}
        />
      );
    }

    {
      this.props.location.pathname === '/dashboard'
        ? (linkLocation = '/profile')
        : (linkLocation = '/dashboard');
    }

    {
      this.props.location.pathname === '/dashboard'
        ? (headerBarMessage = `Welcome, ${username}!`)
        : (headerBarMessage = 'Back to Dashboard!');
    }

    return (
      <StyledHeaderBar
        className="header-bar"
        isCollapsed={this.state.isCollapsed}
      >
        <div className="header-top">
          <Link to="/dashboard">
            <img src={logoName} alt="buvie logo" className="nav-logo" />
          </Link>

          <div className="header-right">
            {this.props.loggedIn ? (
              <Link to={linkLocation}>
                <h2 className="welcome-message">{headerBarMessage}</h2>
              </Link>
            ) : (
              <div />
            )}
            {notifications}
            {logOutButton}
          </div>
          <button className="menu-button" onClick={() => this.toggleMenu()}>
            <i className="material-icons">menu</i>
          </button>
        </div>
        <nav>
          <ul>
            <li className="menu-item">
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li className="menu-item">
              <Link to="/profile">Profile</Link>
            </li>
            <li className="menu-item">
              <Link to="/" onClick={() => this.logOut()}>log out</Link>
            </li>
            <li className="menu-item">
              {notifications}
            </li>
          </ul>
        </nav>
      </StyledHeaderBar>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null,
  user: state.auth.currentUser,
  notifications: state.user.notifications,
  notificationCheck: state.user.notificationCheck
});

export default connect(mapStateToProps)(HeaderBar);
