import React, { Component } from 'react';
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios";
import Cookies from 'js-cookie';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = { email: "", password: "" };
	}

	onEmailChange = event => {
		this.setState({ email: event.target.value });
	}

	onPasswordChange = event => {
		this.setState({ password: event.target.value });
	}

	onLogin = async event => {
		event.preventDefault();
		const loginData = { ...this.state };
		const { data } = await axios.post("/login", loginData);
		Cookies.set('userdata', JSON.stringify(data));
		this.props.navigate("/");
	}

	signUp = () => {
		this.props.navigate("/signup");
	}

	render() {
		return (
			<div style={{ display: "flex", justifyContent: "center" }}>
				<div style={{ width: "500px", marginTop: "100px", border: "1px solid grey", padding: "20px", borderRadius: "5px", boxShadow: "10px 10px grey" }}>
					<Form onSubmit={this.onLogin}>
						<Form.Group className="mb-3" controlId="Email">
							<Form.Label>Email</Form.Label>
							<Form.Control type="email" placeholder="Enter Email" value={this.state.email} onChange={this.onEmailChange} required />
						</Form.Group>
						<Form.Group className="mb-3" controlId="Password">
							<Form.Label>Password</Form.Label>
							<Form.Control type="password" placeholder="Enter Password" value={this.state.password} onChange={this.onPasswordChange} required />
						</Form.Group>
						<div style={{ display: "flex", justifyContent: "center", marginTop: "20px", textAlign: "center" }} className="d-grid gap-2">
							<Button variant="primary" type="submit">
								Login
							</Button>
							<span>Or</span>
							<Button variant="secondary" onClick={this.signUp}>
								Sign-Up
							</Button>
						</div>
					</Form>
				</div>
			</div>
		);
	}
}

function LoginWrapper(props) {
	const navigate = useNavigate();
	return <Login {...props} navigate={navigate} />;
};

export default LoginWrapper;