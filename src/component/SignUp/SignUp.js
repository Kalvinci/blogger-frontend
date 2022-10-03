import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
import axios from "axios";

class SignUp extends Component {
	constructor(props) {
		super(props);
		this.state = { name: "", profilePicUrl: "", email: "", password: "" };
	}

	onNameChange = event => {
		this.setState({ name: event.target.value });
	}

	onProfilePicUrlChange = event => {
		this.setState({ profilePicUrl: event.target.value });
	}

	onEmailChange = event => {
		this.setState({ email: event.target.value });
	}

	onPasswordChange = event => {
		this.setState({ password: event.target.value });
	}

	onSignUp = async event => {
		event.preventDefault();
		const data = { ...this.state };
		await axios.post("/signup", data);
		this.props.navigate("/login");
	}

	render() {
		return (
			<div style={{ display: "flex", justifyContent: "center" }}>
				<div style={{ width: "500px", marginTop: "100px", border: "1px solid grey", padding: "20px", borderRadius: "5px", boxShadow: "10px 10px grey" }}>
					<Form onSubmit={this.onSignUp}>
						<Form.Group className="mb-3" controlId="Name">
							<Form.Label>Name</Form.Label>
							<Form.Control type="text" placeholder="Enter Name" value={this.state.name} onChange={this.onNameChange} autoComplete="off" required />
						</Form.Group>
						<Form.Group className="mb-3" controlId="ProfilePic">
							<Form.Label>Profile Image URL</Form.Label>
							<Form.Control type="text" placeholder="Enter URL" value={this.state.profilePicUrl} onChange={this.onProfilePicUrlChange} autoComplete="off" />
						</Form.Group>
						<Form.Group className="mb-3" controlId="Email">
							<Form.Label>Email</Form.Label>
							<Form.Control type="email" placeholder="Enter Email" value={this.state.email} onChange={this.onEmailChange} autoComplete="off" required />
						</Form.Group>
						<Form.Group className="mb-3" controlId="Password">
							<Form.Label>Password</Form.Label>
							<Form.Control type="password" placeholder="Enter Password" value={this.state.password} onChange={this.onPasswordChange} autoComplete="off" required />
						</Form.Group>
						<div style={{ display: "flex", justifyContent: "center", marginTop: "20px", textAlign: "center" }} className="d-grid gap-2">
							<Button variant="primary" type="submit">
								Sign-Up
							</Button>
						</div>
					</Form>
				</div>
			</div>
		);
	}
}

function SignUpWrapper(props) {
	const navigate = useNavigate();
	return <SignUp {...props} navigate={navigate} />;
};


export default SignUpWrapper;