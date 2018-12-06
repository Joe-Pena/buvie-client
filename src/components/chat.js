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
      input: ''
    };

    let self = this;
    this.state.socket.on('chat', data => {
      this.setState({
        messages: [...this.state.messages, data]
      });
    });
  }

  componentWillUnmount() {
    this.state.socket.disconnect();
  }

  onClick(e) {
    this.state.socket.emit('chat', {
      message: this.state.input,
      handle: this.props.username
    });
  }

  onChange(e) {
    this.setState({
      input:e.target.value
    });
  }

  render() {
    console.log(this.state);
    const messages = this.state.messages.map((data, i) => {
      return <p key={i}>{data.handle} - {data.message}</p>;
    });
    return (
      <div>
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