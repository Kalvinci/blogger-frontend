import React, { Component } from 'react';
import Stack from 'react-bootstrap/Stack';
import CommentList from "./CommentList/CommentList";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "../../AxiosInstance";

class CommentController extends Component {
	constructor(props) {
		super(props);
		this.state = { comments: [], username: "", content: "" }
	}

	componentDidMount() {
		this.getCommentList();
	}

	getCommentList = async () => {
		const { data } = await axios.get(`/comments/${this.props.blogId}`);
		this.setState({ comments: [...data] })
	};

	onUserNameChange = event => {
		this.setState({ username: event.target.value });
	}

	onContentChange = event => {
		this.setState({ content: event.target.value });
	}

	onPostComment = async event => {
		event.preventDefault();
		const data = { username: this.state.username, content: this.state.content, blogId: this.props.blogId }
		await axios.post("/comment", data);
		this.setState({ username: "", content: "" });
		this.getCommentList();
	}

	render() {
		return (
			<Stack gap={3}>
				<h4>Conversations</h4>
				<Form onSubmit={this.onPostComment}>
					<Form.Group className="mb-3" controlId="keywords">
						<Form.Label>Name</Form.Label>
						<Form.Control type="text" placeholder="Your Name" value={this.state.username} onChange={this.onUserNameChange} />
					</Form.Group>
					<Form.Group className="mb-3" controlId="Content">
						<Form.Label>Comment</Form.Label>
						<Form.Control as="textarea" rows={3} placeholder="What do you think..." value={this.state.content} onChange={this.onContentChange} />
					</Form.Group>
					<Button variant="primary" type="submit">
						Post
					</Button>
				</Form>
				<CommentList comments={this.state.comments} />
			</Stack>
		);
	}
}

export default CommentController;