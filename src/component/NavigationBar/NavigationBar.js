import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from "react-router-dom";
import default_img from "../../defaultProfileImage.jpg";
import Cookies from 'js-cookie';

function NavigationBar(props) {
	let userData = Cookies.get('userdata');
	const isLoggedIn = !!userData;
	let controlElement = null;
	const navigate = useNavigate();
	const logOut = () => {
		Cookies.remove('userdata');
		navigate('/');
	};
	if (isLoggedIn) {
		userData = JSON.parse(userData);
		const profileImage = userData.profilePicUrl ? userData.profilePicUrl : default_img;
		controlElement = <>
			<Link className="nav-link" to="/compose">Compose</Link>
			<Link className="nav-link" to="/myblogs">My Blogs</Link>
			<div style={{ display: "flex", marginLeft: "10px", alignItems: "center" }}>
				<img src={profileImage} alt="profile" style={{ width: 30, height: 30, borderRadius: "50%" }} />
				<span className="nav-link" style={{ cursor: "pointer" }} onClick={logOut}>Logout</span>
			</div>
		</>;
	} else {
		controlElement = <Link className="nav-link" to="/login">Login</Link>
	}

	return (
		<Navbar expand="lg" bg="dark" variant="dark">
			<Container>
				<Link className="navbar-brand" to="/">Blogger</Link>
				<Nav>
					{controlElement}
				</Nav>
			</Container>
		</Navbar>
	);
}

export default NavigationBar;