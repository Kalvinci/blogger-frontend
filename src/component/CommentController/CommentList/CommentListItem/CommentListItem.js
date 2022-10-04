import React, { Component } from 'react';
import default_img from "../../../../defaultProfileImage.jpg";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios";
import styles from "./CommentListItem.module.css";
import Cookies from 'js-cookie';

class BlogListItem extends Component {
	constructor(props) {
		super(props);
		this.state = { showCommentForm: false, content: this.props.content };
		this.checkLogin();
	}

	checkLogin = () => {
		this.userData = Cookies.get('userdata');
		this.isLoggedIn = !!this.userData;
		if (this.isLoggedIn) {
			this.userData = JSON.parse(this.userData);
		}
	}

	onContentChange = event => {
		this.setState({ content: event.target.value });
	}

	onEditComment = event => {
		this.setState({ showCommentForm: true });
	}

	onDeleteComment = async event => {
		const commentId = this.props.id;
		await axios.delete(`/blogs/${this.props.blogId}/comments/${commentId}`);
		this.props.getCommentList();
		this.setState({ showCommentForm: false });
	}

	saveComment = async event => {
		event.preventDefault();
		const commentId = this.props.id;
		const content = event.target[0].value;
		await axios.patch(`/blogs/${this.props.blogId}/comments`, { commentId, content });
		this.props.getCommentList();
		this.setState({ showCommentForm: false });
	}

	onCancel = () => {
		this.setState({ showCommentForm: false });
	}


	render() {
		const profileImage = this.props.profilePicUrl ? this.props.profilePicUrl : default_img;
		let controls = null;
		if (this.isLoggedIn && this.userData.id === this.props.userId) {
			controls = <div style={{ position: "absolute", top: 20, right: 0 }}>
				<Button variant="link" style={{ padding: "0 5px", fontSize: "12px" }} onClick={this.onEditComment}>Edit</Button>
				<Button variant="link" style={{ padding: "0 5px", fontSize: "12px" }} onClick={this.onDeleteComment}>Delete</Button>
			</div>;
		}
		return (
			<div className={styles.container}>
				<div className={styles.profile}>
					<img style={{ borderRadius: "50%", width: "50px" }} src={profileImage} alt="Profile" />
				</div>
				<div className={styles.body}>
					<h6>{this.props.username}</h6>
					<div style={{ fontSize: "12px", margin: "-5px 0 10px 0" }}>{this.props.dateTime}</div>
					{this.state.showCommentForm ?
						<Form onSubmit={this.saveComment}>
							<Form.Group className="mb-3" controlId="Content">
								<Form.Control as="textarea" rows={2} placeholder="What do you think..." value={this.state.content} onChange={this.onContentChange} />
							</Form.Group>
							<Button variant="primary" type="submit">Save</Button>
							<Button variant="link" onClick={this.onCancel}>Cancel</Button>
						</Form>
						:
						<div>{this.props.content}</div>
					}
				</div>
				{!this.state.showCommentForm && controls}
			</div>
		);
	}
}

export default BlogListItem;