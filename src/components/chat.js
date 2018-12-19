import React, { Component } from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import styled from 'styled-components';
// import { nonEmpty } from '../validators';
import { BASE_URL, API_BASE_URL } from '../config';
import {
	fetchMessageRequest,
	fetchMessageSuccess,
	fetchMessageFailure,
	putMessages
} from '../actions/users';
import { FaTimes } from 'react-icons/fa';

const ChatHeader = styled.header`
	display: flex;
	position: fixed;
	justify-content: space-around;
	z-index: 100;
	width: 100%;
	align-items: center;
	background-color: white;
	margin-top: -1px !important;
	h2 {
		flex: 3.5;
		font-size: 1.5rem;
		font-weight: 400;
		color: #c4cad0;
		text-transform: uppercase;
	}

	.chat-header-exit {
		flex: 1;
		justify-content: center;
		text-align: center;
		&:hover {
			color: #492529;
		}
	}
`;

const ChatMessageSend = styled.form`
	display: block;
	border-top: 0.5px solid #ebebeb;
	.chat-message {
		font-family: Work Sans;
		flex: 4;
		border: none;
		border-top: 0.5px solid #ebebeb;
		padding: 1%;
		height: 30px;
	}
	.chat-submit {
		flex: 1;
		font-family: Work Sans;
		text-transform: uppercase;
		color: #c4cad0;
		font-weight: 400;
		cursor: pointer;
		padding: 0;
		margin: 0;
		border: 0;
		background-color: transparent;
		&:hover {
			color: #000;
		}
	}

	.chat-message-send-flex {
		display: flex;
		justify-content: space-between;
	}
`;

const ChatOutPut = styled.div`
	overflow: auto;
	padding: 2%;
	width: 100%;
	max-width: 100%;
	word-wrap: break-word;
	-ms-overflow-style: none;
	overflow: -moz-scrollbars-none;

	.last {
		border-bottom-right-radius: 30px !important;
	}

	&::-webkit-scrollbar {
		display: none;
	}

	.chat-message-user {
		display: inline-block;
		clear: both;
		padding: 15px;
		border-radius: 30px;
		margin-top: 1px;
		margin-bottom: 1px;
		font-family: inherit;
		font-weight: 300;
		float: right;
		background: #bf7d7e;
		color: #fff;
		border-bottom-right-radius: 5px;
		border-top-right-radius: 5px;
		border-bottom-right-radius: 5px;
	}

	.chat-message-match {
		background: #eee;
		float: left;
		border-bottom-right-radius: 5px;
		display: inline-block;
		clear: both;
		padding: 15px;
		border-radius: 30px;
		margin-bottom: 2px;
		font-family: inherit;
		font-weight: 300;
		margin-top: 1px;
		margin-bottom: 1px;
	}

	.chat-message-box-1 {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	/* .box3 {
		width: 250px;
		margin: 10px;
		border-radius: 15px;
		background: #00bfb6;
		color: #fff;
		padding: 20px;
		text-align: center;
		font-weight: 900;
		font-family: arial;
		position: relative;
	}

	.box4 {
		width: 250px;
		margin: 10px;
		border-radius: 15px;
		background: #7e0001;
		color: #fff;
		padding: 20px;
		text-align: center;
		font-weight: 900;
		font-family: arial;
		position: relative;
	} */

	/* speech bubble 13 */
`;

const ChatFriendsList = styled.div`
	text-align: center;

	.chat-matched-user {
		font-weight: 300;
	}

	.chat-matched-user:hover {
		font-weight: 300;
	}

	.chat-box {
		display: grid;
	}

	.modal {
		top: 50%;
		left: 50%;
		right: auto;
		bottom: auto;
		margin-right: -50%;
		transform: translate(-50%, -50%);
		height: 80%;
		width: 400px;
		display: grid;
	}

	.overlay {
		background-color: 'transparent';
	}

	.hvr-fade {
		cursor: pointer;
		border-bottom: 1px solid gray;
		font-weight: 300;
		font-size: 2rem;
		display: block;
		vertical-align: middle;
		-webkit-transform: perspective(1px) translateZ(0);
		transform: perspective(1px) translateZ(0);
		box-shadow: 0 0 1px rgba(0, 0, 0, 0);
		overflow: hidden;
		-webkit-transition-duration: 0.3s;
		transition-duration: 0.3s;
		-webkit-transition-property: color, background-color;
		transition-property: color, background-color;
	}
	.hvr-fade:hover,
	.hvr-fade:focus,
	.hvr-fade:active {
		background-color: #b2ae81;
		color: white;
	}
`;

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
		height: '60%',
    maxWidth: '640px',
    width: '100%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between'
	},
	overlay: {
		backgroundColor: 'transparent'
	}
};

export class Chat extends Component {
	constructor(props) {
		super(props);
		this.state = {
			socket: io(BASE_URL),
			messages: [],
			input: '',
			match: '',
			chatroom: '',
			modalIsOpen: false
		};

		this.messagesEnd = React.createRef();

		this.state.socket.on('chat', data => {
			this.setState({
				messages: [...this.state.messages, data]
			});
			this.props.dispatch(
				putMessages(this.state.chatroom, this.state.messages)
			);
		});
	}

	componentWillMount() {
		Modal.setAppElement('body');
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
			match,
			chatroom
		});
		this.state.socket.emit('subscribe', chatroom);
		if (chatroom !== 'everyone') {
			this.fetchMessages(chatroom);
		}
	}

	componentWillUnmount() {
		this.state.socket.disconnect();
	}

	componentDidUpdate() {
		if (this.state.modalIsOpen) {
		}
		let el = document.getElementById('chat-message-end');

		if (el !== null) {
			el.scrollIntoView({ behavior: 'instant' });
		}
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
	}

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

	openChatModal = () => {
		this.setState({ modalIsOpen: true });
	};

	closeChatModal = () => {
		this.setState({ modalIsOpen: false });
	};

	chatScrollToBottom = () => {
		this.messagesEnd.scrollIntoView({ behavior: 'smooth' });
	};

	chatScrollToBottomClick = () => {
		if (this.state.modalIsOpen) {
		}
		let el = document.getElementById('chat-message-end');

		if (el !== null) {
			el.scrollIntoView({ behavior: 'smooth' });
		}
	};

	render() {
		const messages = this.state.messages.map((data, i) => {
			if (
				i === this.state.messages.length - 1 &&
				data.handle === this.props.username
			) {
				return (
          <div className="chat-message-user last" key={`${data.handle}-${i}`}>
            <p>{data.message}</p>
          </div>
				);
			}
			if (data.handle === this.props.username) {
				return (
          <div className="chat-message-user" key={`${data.handle}-${i}`}>
            <p>{data.message}</p>
          </div>
				);
			}

			return (
				<div className="chat-message-match" key={`${data.handle}-${i}`}>
					<p>{data.message}</p>
				</div>
			);
		});

		// let gravatar = `https://www.gravatar.com/avatar/${md5(user.email)}?d=retro`;
		return (
			<ChatFriendsList>
				<h2 className="hvr-fade" onClick={this.openChatModal}>
					{this.state.match}
				</h2>
				<div id="chat-window" />
				<div>
					<Modal
						isOpen={this.state.modalIsOpen}
						onAfterOpen={this.afterOpenModal}
						onRequestClose={this.closeModal}
						shouldCloseOnOverlayClick={true}
						style={customStyles}
					>
						<ChatHeader>
							<h2>CONVERSATION WITH {this.state.match}</h2>
							<div className="chat-header-exit">
								<FaTimes onClick={this.closeChatModal} />
							</div>
						</ChatHeader>
						<div className="chat-header-space-below" />
						<ChatOutPut id="output">
							{messages}

							<div
								id="chat-message-end"
								style={{ float: 'left', clear: 'both' }}
								ref={this.messagesEnd}
							/>
						</ChatOutPut>
						<ChatMessageSend
							onSubmit={e => {
								e.preventDefault();
								this.onClick(e);
								e.target.input.value = '';
							}}
						>
							<div className="chat-message-send-flex">
								<input
									className="chat-message"
									id="message"
									type="text"
									name="input"
									placeholder="Type a message..."
									onChange={e => this.onChange(e)}
									onClick={this.chatScrollToBottomClick}
								/>
								<input
									className="chat-submit"
									type="submit"
									id="send"
									value="send"
								/>
							</div>
						</ChatMessageSend>
					</Modal>
				</div>
			</ChatFriendsList>
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
