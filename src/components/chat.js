import React, { Component } from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import styled from 'styled-components';
import { nonEmpty } from '../validators';
import { BASE_URL, API_BASE_URL } from '../config';
import {
	fetchMessageRequest,
	fetchMessageSuccess,
	fetchMessageFailure,
	putMessages
} from '../actions/users';

const ChatHeader = styled.header`
	display: flex;
	justify-content: space-between;
	h2 {
		flex: 4;
		font-size: 1.5rem;
		font-weight: 400;
		color: #c4cad0;
		text-transform: uppercase;
	}
	.chat-close {
		text-align: right;
		flex: 1;
	}
`;

const ChatMessageSend = styled.form`
	display: flex;
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
		padding: 0;
		margin: 0;
		border: 0;
		background-color: transparent;
	}
`;

const ChatOutPut = styled.div`
	overflow: auto;
	padding: 2%;
	width: 100%;
	max-width: 100%;

	word-wrap: break-word;
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	.chat-message-user {
		align-self: flex-end;
	}

	.chat-message-match {
	}

	.chat-message-box-1 {
		display: flex;
		flex-direction: column;
		text-align: right;
	}

	.box3 {
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
	}

	/* speech bubble 13 */

	.sb13:before {
		content: '';
		width: 0px;
		height: 0px;
		position: absolute;
		border-left: 15px solid #00bfb6;
		border-right: 15px solid transparent;
		border-top: 15px solid #00bfb6;
		border-bottom: 15px solid transparent;
		right: -16px;
		top: 0px;
	}

	/* speech bubble 14 */

	.sb14:before {
		content: '';
		width: 0px;
		height: 0px;
		position: absolute;
		border-left: 15px solid transparent;
		border-right: 15px solid #7e0001;
		border-top: 15px solid #7e0001;
		border-bottom: 15px solid transparent;
		left: -16px;
		top: 0px;
	}
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
		width: '640px',
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
		console.log(el, 'line 254');
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

	render() {
		console.log(this.state.messages, 'line 199');
		const messages = this.state.messages.map((data, i) => {
			console.log(data.handle, this.props.username, '201');
			if (data.handle === this.props.username) {
				return (
					<>
						<div className="chat-message-box-1">
							<div className="chat-message-user box3 sb13" key={i}>
								<p>{data.message}</p>
							</div>
						</div>
					</>
				);
			}
			return (
				<div className="chat-message-box-2">
					<div className="chat-message-match box4 sb14" key={i}>
						<p>{data.message}</p>
					</div>
					<h6>{data.handle}</h6>
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
							<div className="chat-close" onClick={this.closeChatModal}>
								X
							</div>
						</ChatHeader>
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
							<input
								className="chat-message"
								id="message"
								type="text"
								name="input"
								placeholder="Type a message..."
								onChange={e => this.onChange(e)}
							/>
							<input
								className="chat-submit"
								type="submit"
								id="send"
								value="send"
							/>
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
