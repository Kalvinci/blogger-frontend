import React, { Component } from 'react';
import Stack from 'react-bootstrap/Stack';
import BlogListItem from './BlogListItem/BlogListItem';
import axios from "../../AxiosInstance";
import { Link } from "react-router-dom";

class BlogList extends Component {
	constructor(props) {
		super(props);
		this.state = { blogs: [] }
	}

	componentDidMount() {
		this.getBlogList();
	}

	getBlogList = async () => {
		const { data } = await axios.get(`/blogs`);
		this.setState({ blogs: [...data] })
	};

	render() {
		const blogsList = []
		for (const blogData of this.state.blogs) {
			blogsList.push(<Link to={`/blogs/${blogData.id}`} key={blogData.id} style={{ textDecoration: "none", color: "black" }}><BlogListItem {...blogData} /></Link>)
		}
		return (
			<Stack gap={3} className="mx-auto">
				{blogsList}
			</Stack>
		);
	}
}

export default BlogList;