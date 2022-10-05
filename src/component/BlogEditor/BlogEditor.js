import React, { Component } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useNavigate, useParams } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios";
import BlogView from "../BlogView/BlogView";
import editorStyles from "./BlogEditor.module.css";
import "./CKEditorConfig.css";
import Cookies from 'js-cookie';

class BlogEditor extends Component {
	constructor(props) {
		super(props);
		this.editor = null;
		this.state = { keywords: "", title: "", subTitle: "", content: "" };
		this.editMode = false;
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
		if (this.props.blogId) {
			this.getBlogData();
			this.editMode = true;
		}
		if (this.isLoggedIn) {
			this.setState({ profilePicUrl: this.userData.profilePicUrl, username: this.userData.name, email: this.userData.email });
		} else {
			this.props.navigate("/login");
		}
	}

	getBlogData = async () => {
		const { data } = await axios.get(`/blogs/${this.props.blogId}`);
		this.setState({ ...data });
	}

	onKeywordsChange = event => {
		this.setState({ keywords: event.target.value });
	}

	onTitleChange = event => {
		this.setState({ title: event.target.value });
	}

	onSubTitleChange = event => {
		this.setState({ subTitle: event.target.value });
	}

	onContentChange = (event, editor) => {
		this.setState({ content: editor.getData() });
	}

	getCurrentDateString = () => {
		const currentDateTime = new Date();
		return currentDateTime.toLocaleString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
	}

	getCurrentTimeString = () => {
		const currentDateTime = new Date();
		return currentDateTime.toLocaleTimeString();
	}

	onPublish = async (event) => {
		event.preventDefault();
		const blogId = this.props.blogId;
		const blogData = { ...this.state, blogId, userId: this.userData.id }
		if (this.editMode) {
			await axios.patch("/blogs", blogData);
			this.props.navigate(`/blogs/${blogId}`);
		} else {
			const { data } = await axios.post("/blogs", blogData);
			this.props.navigate(`/blogs/${data.blogId}`);
		}
	}

	render() {
		return (
			<Container style={{ width: "1080px", marginBottom: "20px" }}>
				<Row>
					<Col>
						<Form onSubmit={this.onPublish}>
							<Form.Group className="mb-3" controlId="Title">
								<Form.Label>Title</Form.Label>
								<Form.Control type="text" placeholder="Enter Title" value={this.state.title} onChange={this.onTitleChange} required />
							</Form.Group>
							<Form.Group className="mb-3" controlId="Sub-Title">
								<Form.Label>Sub-Title</Form.Label>
								<Form.Control type="text" placeholder="Enter Sub-Title" value={this.state.subTitle} onChange={this.onSubTitleChange} required />
							</Form.Group>
							<Form.Group className="mb-3" controlId="keywords">
								<Form.Label>Keywords</Form.Label>
								<Form.Control type="text" placeholder="Enter keywords" value={this.state.keywords} onChange={this.onKeywordsChange} required />
							</Form.Group>
							<Form.Group className="mb-3" controlId="Content">
								<Form.Label>Content</Form.Label>
								<CKEditor
									editor={ClassicEditor}
									data={this.state.content}
									config={{ placeholder: "Type your content here...", removePlugins: ["EasyImage"] }}
									onChange={this.onContentChange}
								/>
							</Form.Group>
							<Row>
								<Col>
									<Card className={editorStyles.previewCard}>
										<Card.Header>
											<Container>
												<Row className="align-items-center">
													<Col>
														<h5>Live Preview</h5>
													</Col>
													<Col style={{ textAlign: "right" }}>
														<Button variant="primary" type="submit">Publish</Button>
													</Col>
												</Row>
											</Container>
										</Card.Header>
										<Card.Body>
											<BlogView {...this.state} date={this.getCurrentDateString()} time={this.getCurrentTimeString()} />
										</Card.Body>
									</Card>
								</Col>
							</Row>
						</Form>
					</Col>
				</Row>
			</Container >
		);
	}
}

function BlogEditorwrapper(props) {
	const { blogId } = useParams();
	const navigate = useNavigate();
	return <BlogEditor {...props} navigate={navigate} blogId={blogId} />;
};

export default BlogEditorwrapper;