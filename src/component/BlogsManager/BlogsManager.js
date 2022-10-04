import React, { Component } from 'react';
import Stack from 'react-bootstrap/Stack';
import BlogListItem from '../BlogList/BlogListItem/BlogListItem';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Cookies from 'js-cookie';

class BlogsManager extends Component {
	constructor(props) {
		super(props);
		this.state = { blogs: [] }
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
		this.getBlogList();
		if (this.isLoggedIn) {
			this.setState({ profilePicUrl: this.userData.profilePicUrl, username: this.userData.name, email: this.userData.email });
		} else {
			this.props.navigate("/login");
		}
	}

	getBlogList = async () => {
		const { data } = await axios.get(`/users/${this.userData.id}/blogs`);
		this.setState({ blogs: [...data] })
	};

	editBlog = blogId => {
		this.props.navigate(`/edit/${blogId}`);
	}

	deleteBlog = async blogId => {
		await axios.delete(`/blogs/${blogId}`);
		this.getBlogList();
	}

	render() {
		const blogsList = []
		for (const blogData of this.state.blogs) {
			blogsList.push(
				<div key={blogData.id} style={{ display: "flex", alignItems: "center" }}>
					<Link to={`/blogs/${blogData.id}`} style={{ textDecoration: "none", color: "black" }}><BlogListItem {...blogData} /></Link>
					<div className="d-grid gap-1" style={{ marginLeft: "10px" }}>
						<Button variant="warning" onClick={() => this.editBlog(blogData.id)}>Edit</Button>
						<Button variant="danger" onClick={() => this.deleteBlog(blogData.id)}>Delete</Button>
					</div>
				</div>)
		}

		if (blogsList.length === 0) {
			return <Alert className="mx-auto" variant="warning">No Blogs Found!</Alert>;
		}
		return (
			<Stack gap={3} className="mx-auto" style={{ marginBottom: "20px" }}>
				{blogsList}
			</Stack>
		);
	}
}

function BlogsManagerWrapper(props) {
	const navigate = useNavigate();
	return <BlogsManager {...props} navigate={navigate} />;
}

export default BlogsManagerWrapper;