import React, { Component } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "../../AxiosInstance";
import BlogView from "../BlogView/BlogView";
import editorStyles from "./BlogEditor.module.css";

class BlogEditor extends Component {
	constructor(props) {
		super(props);
		this.editor = null;
		this.state = { profilePicUrl: "", username: "", email: "", keywords: "", title: "", subTitle: "", content: "" }
	}

	onUserNameChange = event => {
		this.setState({ username: event.target.value });
	}

	onEmailChange = event => {
		this.setState({ email: event.target.value });
	}

	onProfilePicUrlChange = event => {
		this.setState({ profilePicUrl: event.target.value });
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

	onPublish = async () => {
		console.log("called")
		const data = { ...this.state }
		const result = await axios.post("/publish", data);
		console.log(result);
	}

	render() {
		return (
			<Container style={{ width: "1080px" }}>
				<Row>
					<Col>
						<Form>
							<Row className="mb-3">
								<Form.Group as={Col} controlId="UserName">
									<Form.Label>User Name</Form.Label>
									<Form.Control type="text" placeholder="Enter Name" value={this.state.userName} onChange={this.onUserNameChange} />
								</Form.Group>
								<Form.Group as={Col} controlId="email">
									<Form.Label>Email</Form.Label>
									<Form.Control type="email" placeholder="Enter Email" value={this.state.email} onChange={this.onEmailChange} />
								</Form.Group>
								<Form.Group as={Col} controlId="profilePicURL">
									<Form.Label>Image URL</Form.Label>
									<Form.Control type="text" placeholder="Enter URL" value={this.state.profilePicUrl} onChange={this.onProfilePicUrlChange} />
								</Form.Group>
							</Row>
							<Form.Group className="mb-3" controlId="Title">
								<Form.Label>Title</Form.Label>
								<Form.Control type="text" placeholder="Enter Title" value={this.state.title} onChange={this.onTitleChange} />
							</Form.Group>
							<Form.Group className="mb-3" controlId="Sub-Title">
								<Form.Label>Sub-Title</Form.Label>
								<Form.Control type="text" placeholder="Enter Sub-Title" value={this.state.subTitle} onChange={this.onSubTitleChange} />
							</Form.Group>
							<Form.Group className="mb-3" controlId="keywords">
								<Form.Label>Keywords</Form.Label>
								<Form.Control type="text" placeholder="Enter keywords" value={this.state.keywords} onChange={this.onKeywordsChange} />
							</Form.Group>
							<Form.Group className="mb-3" controlId="Content">
								<Form.Label>Content</Form.Label>
								<CKEditor
									editor={ClassicEditor}
									config={{ placeholder: "Type your content here..." }}
									onChange={this.onContentChange}
								/>
							</Form.Group>
						</Form>
					</Col>
				</Row>
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
											<Button variant="primary" onClick={this.onPublish}>Publish</Button>
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
			</Container >
		);
	}
}

export default BlogEditor;