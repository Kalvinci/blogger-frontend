import React, { Component } from 'react';
import { useParams } from "react-router-dom";
import BlogView from '../BlogView/BlogView';
import axios from "../../AxiosInstance";

function BlogPage() {
	const { blogId } = useParams();
	console.log(blogId);
	return <Blog blogId={blogId} />;
}

class Blog extends Component {
	constructor(props) {
		super(props);
		this.state = { blogData: null }
	}

	componentDidMount() {
		this.getBlogData();
	}

	getBlogData = async () => {
		console.log(this.props.blogId);
		const { data } = await axios.get(`/blogs/${this.props.blogId}`);
		console.log(data);
		this.setState({ blogData: { ...data } })
	};

	render() {
		return (
			<div style={{ display: "flex", justifyContent: "center" }}>
				<div style={{ width: "1080px" }}>
					<BlogView {...this.state.blogData} />
				</div>
			</div>
		);
	}
}

export default BlogPage;