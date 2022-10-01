import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";

function NavigationBar(props) {
	return (
		<Navbar expand="lg" bg="dark" variant="dark">
			<Container>
				<Link className="navbar-brand" to="/">Blogger</Link>
				<Nav>
					<Link className="nav-link" to="/compose">Compose</Link>
				</Nav>
			</Container>
		</Navbar>
	);
}

export default NavigationBar;