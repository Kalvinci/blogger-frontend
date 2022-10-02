import React, { Component } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import BlogView from '../BlogView/BlogView';
import Button from 'react-bootstrap/Button';
import CommentController from "../CommentController/CommentController";
import axios from "../../AxiosInstance";

class BlogPage extends Component {
	constructor(props) {
		super(props);
		this.state = { blogData: null }
	}

	componentDidMount() {
		this.getBlogData();
	}

	getBlogData = async () => {
		const { data } = await axios.get(`/blogs/${this.props.blogId}`);
		this.setState({ blogData: { ...data } })
	};

	editBlog = () => {
		this.props.navigate(`/edit/${this.props.blogId}`);
	}

	render() {
		return (
			<div style={{ display: "flex", justifyContent: "center", marginBottom: "50px" }}>
				<div style={{ width: "1080px", position: "relative" }}>
					<Button variant="link" style={{ position: "absolute", top: "5px", right: "-115px" }} onClick={this.editBlog}>Edit Blog</Button>
					<BlogView {...this.state.blogData} />
					<CommentController blogId={this.props.blogId} />
				</div>
			</div>
		);
	}
}

function BlogPageWrapper() {
	const { blogId } = useParams();
	const navigate = useNavigate();
	return <BlogPage blogId={blogId} navigate={navigate} />;
}

export default BlogPageWrapper;