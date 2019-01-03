import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import moment from 'moment';
import onClickOutside from 'react-onclickoutside';
import { putNotificationTime, fetchNotification } from '../actions/users';

const StyledDropDown = styled.div`
	color: #fff;

	ul {
		list-style-type: none;
		background-color: #fff;
		color: #000;
		font-size: 1rem;
		z-index: 1;
		position: absolute;
	}

	li {
		border-bottom: 1px solid #e5e5e5;
		text-align: left;
		padding: 1px 3px;
	}

	li a {
		text-decoration: none;
		color: #000;
	}

	.dropdown-header {
		display: ${props => (props.isCollapsed ? 'none' : 'block')};
		cursor: pointer;
	}

	@media (min-width: 768px) {
		.dropdown-header {
			display: block;
		}
	}
`;

export class DropDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listOpen: false,
      headerTitle: this.props.title
    };
  }

  handleClickOutside(e) {
    this.setState({
      listOpen: false
    });
  }

  toggleList() {
    if (!this.state.listOpen) {
      this.props
        .dispatch(fetchNotification())
        .then(() => this.props.dispatch(putNotificationTime()));
    }
    this.setState({
      listOpen: !this.state.listOpen
    });
  }

  render() {
    const { listArr = [], time } = this.props;
    let headerTitle = '';
    const { listOpen } = this.state;
    let listElements;
    if (listArr.length) {
      listElements = listArr.map(item => {
        let linkName;
        if (item.type === 'popcorn' || item.type === 're-popcorn') {
          linkName = 'popcorn';
        } else if (item.type === 'matched') {
          linkName = 'matched';
        }
        return (
          <li className="dropdown-item" key={`${item._id}${item.type}`}>
            <a href={`#${linkName}`}>{item.message}</a>
            <br />
            {moment(item.date).fromNow()}
          </li>
        );
      });
    } else {
      listElements = [<li key='no-notes'>You don't have any notifications right now</li>];
    }
    let newNotificationCount = 0;
    for (let i = 0; i < listArr.length; i++) {
      if (listArr[i].date > time) {
        newNotificationCount++;
      }
    }
    let displayCount;
    if (newNotificationCount === 0) {
      displayCount = '';
      headerTitle = 'Notifications';
    } else if (newNotificationCount <= 10) {
      displayCount = newNotificationCount;
      headerTitle = 'Notifications';
    } else {
      displayCount = '10+';
    }
    let list;
    if (listOpen) {
      list = <ul>{listElements.reverse().slice(0, 10)}</ul>;
    }

    return (
      <StyledDropDown
        className="dropdown-wrapper"
        isCollapsed={this.props.isCollapsed}
      >
        <header
          className="dropdown-header"
          onClick={() => this.toggleList()}
        >{`${headerTitle} ${displayCount}`}</header>
        {list}
      </StyledDropDown>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null,
  user: state.auth.currentUser
});

export default connect(mapStateToProps)(onClickOutside(DropDown));
