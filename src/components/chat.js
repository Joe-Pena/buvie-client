import React, { Component } from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import { BASE_URL } from '../config';


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
    });
  }

  componentDidMount() {
    console.log(this.props.matched);
    const matched = this.props.matched;
    let id;
    if (matched) {
      id = matched._id;
    }
    const match = id ? id._id : 'everyone';
    const chatroom = id ? id.chatroom : 'everyone';
    this.setState({
      match, chatroom
    });
    this.state.socket.emit('subscribe', chatroom);
  }
  componentWillUnmount() {
    this.state.socket.disconnect();
  }

  onClick(e) {
    this.state.socket.emit('chat', {
      message: this.state.input,
      handle: this.props.username,
      room: this.state.chatroom
    });
  }

  onChange(e) {
    this.setState({
      input:e.target.value
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
  };
};

export default connect(mapStateToProps)(Chat);