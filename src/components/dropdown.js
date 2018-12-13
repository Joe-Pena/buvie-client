import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

const StyledDropDown = styled.div`
  color: #fff;

  ul {
    list-style-type:  none;
    background-color: #fff;
    color: #000;
    font-size: 1rem;
    z-index: 1;
    position: absolute;
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

  toggleList() {
    this.setState(prevState => ({
      listOpen: !prevState.listOpen
    }));
  }

  render() {
    const { listArr } = this.props;
    const { listOpen, headerTitle } = this.state;
    let listElements = listArr.map(item => {
      return (<li className='dropdown-item' key={`${item._id}${item.type}`}>{item.message}</li>);
    });
    let list;
    if (listOpen) {
      list = (
        <ul>
          {listElements}
        </ul>
      );
    }
    return (
      <StyledDropDown className='dropdown-wrapper'>
        <div className='dropdown-header' onClick={() => this.toggleList()}>{headerTitle}</div>
        {list}
      </StyledDropDown>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null,
  user: state.auth.currentUser
});

export default connect(mapStateToProps)(DropDown);