import React, { Component } from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import { BASE_URL, API_BASE_URL } from '../config';
import {
  fetchMessageRequest,
  fetchMessageSuccess, fetchMessageFailure, putMessages
} from '../actions/users';


export class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: io(BASE_URL),
      messages: [],
      input: '',
      match: '',
      chatroom: ''
    };

    this.state.socket.on('chat', data => {
      this.setState({
        messages: [...this.state.messages, data]
      });
      this.props.dispatch(putMessages(this.state.chatroom, this.state.messages));
    });
  }

  componentDidMount() {
    const matched = this.props.matched;
    let user;
    let room;
    if (matched) {
      user = matched._id;
      room = matched.chatroom;
    }


    const match = user ? user.username : 'everyone';
    const chatroom = room ? room._id : 'everyone';
    this.setState({
      match, chatroom
    });
    this.state.socket.emit('subscribe', chatroom);
    if (chatroom !== 'everyone') {
      this.fetchMessages(chatroom);
    }
  }
  componentWillUnmount() {
    this.state.socket.disconnect();
  }

  fetchMessages(chatroomId) {
    this.props.dispatch(fetchMessageRequest());
    const authToken = this.props.authToken;
    return fetch(`${API_BASE_URL}/messages/${chatroomId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    })
      .then(res => res.json())
      .then(res => {
        this.props.dispatch(fetchMessageSuccess(res));
        this.setState({
          messages: res.messages
        });
      })
      .catch(err => this.props.dispatch(fetchMessageFailure(err)));
  };

  onClick() {
    this.state.socket.emit('chat', {
      message: this.state.input,
      handle: this.props.username,
      room: this.state.chatroom
    });
  }

  onChange(e) {
    this.setState({
      input: e.target.value
    });
  }

  render() {
    const messages = this.state.messages.map((data, i) => {
      return <p key={i}>{data.handle} - {data.message}</p>;
    });
    return (
      <div>
        <h2>conversation with {this.state.match}</h2>
        <div id="chat-window">
          <div id="output">
            {messages}
          </div>
        </div>
        <input id="message" type="text" placeholder="Message" onChange={e => this.onChange(e)} />
        <button id="send" onClick={e => this.onClick(e)}>Send</button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    username: state.auth.currentUser.username,
    authToken: state.auth.authToken
  };
};

export default connect(mapStateToProps)(Chat);