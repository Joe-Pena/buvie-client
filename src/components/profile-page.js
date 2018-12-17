import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	postCloudinaryProfilePicture,
	postUserProfilePicture
} from '../actions/users';
import { Redirect } from 'react-router-dom';
import { CLOUDINARY_BASE_URL, CLOUDINARY_UPLOAD_PRESET } from '../config.js';
import styled from 'styled-components';
import ImageUploader from 'react-images-upload';
import Jimp from 'jimp';
import md5 from 'js-md5';

const ProfileMain = styled.main`
	width: 80%;
	height: 100%;
	margin: auto;
	display: flex;
	h1 {
		color: #ffb8c7;
	}
	.profile-display-container {
    flex: 1;
		width: 800px;
		height: 800px;
		background-color: white;
	}
	.profile-option-select {
    flex: 1
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}
`;

class ProfilePage extends Component {
	state = {
		profilePicture: '',
		imgSrc: ''
	};

	onDrop = picture => {
		let pictureSet = picture[picture.length - 1];

		this.setState(
			{
				profilePicture: pictureSet
			},
			() => {
				let file = this.state.profilePicture;
				let reader = new FileReader();
				let url = reader.readAsDataURL(file);

				reader.onloadend = e => {
					this.setState({
						imgSrc: reader.result
					});
				};
			}
		);
	};

	onSubmit = () => {
		let file = this.state.profilePicture;
		let formData = new FormData();

		formData.append('file', file);
		formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

		this.props.dispatch(
			postCloudinaryProfilePicture(formData, this.props.user.id)
		);
	};

	render() {
		return (
			<ProfileMain>
				<div className="profile-option-select">
					<h1>Stats</h1>
					<h1>Privacy</h1>
				</div>
				<div className="profile-display-container">
					<ImageUploader
						label="Max file size: 150kb, accepted: 'jpg', 'png'"
						withIcon={true}
						buttonText="Choose images"
						onChange={this.onDrop}
						imgExtension={['.jpg', '.png']}
						maxFileSize={150000}
						fileSizeError="File size is too big!"
						fileTypeError="That file is not supported!"
					/>
					{this.state.imgSrc && <img src={this.state.imgSrc} />}
					<form
						onSubmit={e => {
							e.preventDefault();
							this.onSubmit();
						}}
					>
						<input type="submit" />
					</form>
				</div>
			</ProfileMain>
		);
	}
}

const mapStateToProps = state => {
	return {
		loggedIn: state.auth.currentUser !== null,
		user: state.auth.currentUser
	};
};

export default connect(mapStateToProps)(ProfilePage);
