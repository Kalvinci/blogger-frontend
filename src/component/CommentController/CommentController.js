import React, { Component } from 'react';
import Stack from 'react-bootstrap/Stack';
import CommentList from "./CommentList/CommentList";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios";
import Cookies from 'js-cookie';

class CommentController extends Component {
	constructor(props) {
		super(props);
		this.state = { comments: [], username: "", content: "" }
		this.checkLogin();
	}

	checkLogin = () => {
		this.userData = Cookies.get('userdata');
		this.isLoggedIn = !!this.userData;
		if (this.isLoggedIn) {
			this.userData = JSON.parse(this.userData);
		}
	}

	componentDidMount() {
		this.getCommentList();
	}

	getCommentList = async () => {
		const { data } = await axios.get(`/comments/${this.props.blogId}`);
		this.setState({ comments: [...data] })
	};

	onContentChange = event => {
		this.setState({ content: event.target.value });
	}

	onPostComment = async event => {
		event.preventDefault();
		const data = { email: this.userData.email, content: this.state.content, blogId: this.props.blogId }
		await axios.post("/comment", data);
		this.setState({ username: "", content: "" });
		this.getCommentList();
	}

	login = () => {
		this.props.navigate("/login");
	}

	render() {
		let commentPostButton = null;
		if (this.isLoggedIn) {
			commentPostButton = <Button variant="primary" type="submit">
				Post
			</Button>;
		} else {
			commentPostButton = <Button variant="primary" onClick={this.login}>
				Login
			</Button>;
		}
		return (
			<Stack gap={3}>
				<h4>Conversations</h4>
				<Form onSubmit={this.onPostComment}>
					<Form.Group className="mb-3" controlId="Content">
						<Form.Label>Comment</Form.Label>
						<Form.Control as="textarea" rows={3} placeholder="What do you think..." value={this.state.content} onChange={this.onContentChange} />
					</Form.Group>
					{commentPostButton}
				</Form>
				<CommentList comments={this.state.comments} />
			</Stack>
		);
	}
}

export default CommentController;