import React, { Component } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import BlogView from '../BlogView/BlogView';
import CommentController from "../CommentController/CommentController";
import axios from "axios";

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

	render() {
		return (
			<div style={{ display: "flex", justifyContent: "center", marginBottom: "50px" }}>
				<div style={{ width: "1080px" }}>
					<BlogView {...this.state.blogData} />
					<div style={{ width: "900px" }}>
						<CommentController blogId={this.props.blogId} navigate={this.props.navigate} />
					</div>
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