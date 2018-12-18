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
import { FaLeaf } from 'react-icons/fa';
import FadeLoader from 'react-spinners/FadeLoader';

const override = {
	position: 'absolute'
};
const StyledLoader = styled(FadeLoader)`
	display: flex;
	margin-right: -50px;
`;

const ProfileMain = styled.main`
	width: 80%;
	height: 100%;
	margin: auto;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 1%;
	h2 {
		color: #ffb8c7;
		cursor: pointer;
	}

	.loader-div {
		display: flex;
		justify-content: center;
	}

	.profile-display-container {
		justify-content: center;
    flex: 1;
		max-width: 500px;
		height: 500px;
		width: 100%;
		background-color: #ffb8c7;
		-webkit-box-shadow: 2px 15px 43px -5px rgba(0,0,0,0.75);
		-moz-box-shadow: 2px 15px 43px -5px rgba(0,0,0,0.75);
		box-shadow: 2px 15px 43px -5px rgba(0,0,0,0.75);
	}
	.fileContainer {
		background-color: #ffb8c7;
	}
	.spacer {
	height: 100px;
	flex: 1;
	}
	.profile-option-select {
    flex: 1
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}

	.profile-pic-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		img{
			border: 1px solid gray;
		}
		h3{
			font-family: Lato;
			font-weight: 300;
		}
	}
	.profile-pic-form {
		display: flex;
		justify-self: flex-end;
		justify-content: center;
		text-align: center;

	}


	.profile-pic-submit {
		padding: 6px 23px;
    background: #3f4257;
    border-radius: 30px;
    color: white;
    font-weight: 300;
    font-size: 14px;
    margin: 10px 0;
    transition: all 0.2s ease-in;
    cursor: pointer;
    outline: none;
    border: none;
	&:hover {
		background: #545972;
	}
	}

.profile-pic-submit {
	padding: 6px 23px;
	background: #3f4257;
	border-radius: 30px;
		color: white;
		font-weight: 300;
	font-size: 14px;
margin: 10px 0;
transition: all 0.2s ease-in;
cursor: pointer;
outline: none;
border: none;
&:hover {
	background: #545972;
}
}
.profile-pic-submit-disabled {
	padding: 6px 23px;
	background: #3f4257;
	border-radius: 30px;
	color: white;
	font-weight: 300;
	font-size: 14px;
	margin: 10px 0;
	transition: all 0.2s ease-in;
	cursor: pointer;
	outline: none;
	border: none;
	opacity: 0.5;
}
`;

class ProfilePage extends Component {
	state = {
		profilePicture: '',
		imgSrc: '',
		defaultImg: 'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png'
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
		if (!this.props.loggedIn) {
			return <Redirect to="/" />;
		}

		return (
			<ProfileMain>
				<div className="profile-option-select">
					<h2>Change Picture</h2>
				</div>
				<div className="spacer" />

				<div className="profile-display-container">
					<ImageUploader
						singleImage={true}
						label="Max file size: 150kb, accepted: 'jpg', 'png'"
						withIcon={true}
						buttonText="Choose profile picture!"
						onChange={this.onDrop}
						imgExtension={['.jpg', '.png']}
						maxFileSize={150000}
						fileSizeError="File size is too big!"
						fileTypeError="That file is not supported!"
					/>
					<div className="profile-pic-container">
						{!this.state.imgSrc && (
							<img
								style={{
									height: '160px',
									width: '147px',
									borderRadius: '100rem',
									justifySelf: 'center'
								}}
								src="http://s3.amazonaws.com/37assets/svn/765-default-avatar.png"
							/>
						)}

						{this.state.imgSrc && (
							<img
								style={{
									height: '160px',
									width: '147px',
									borderRadius: '100rem'
								}}
								src={this.state.imgSrc}
							/>
						)}
						<h3>Preview Image!</h3>
					</div>
					<form
						className="profile-pic-form"
						onSubmit={e => {
							e.preventDefault();
							this.onSubmit();
						}}
					>
						{!this.state.imgSrc && (
							<input
								className="profile-pic-submit-disabled"
								type="submit"
								disabled="disabled"
							/>
						)}
						{this.state.imgSrc && (
							<input className="profile-pic-submit" type="submit" />
						)}
					</form>
				</div>
			</ProfileMain>
		);
	}
}

const mapStateToProps = state => {
	return {
		loggedIn: state.auth.currentUser !== null,
		user: state.auth.currentUser,
		loading: state.user.loading
	};
};

export default connect(mapStateToProps)(ProfilePage);
