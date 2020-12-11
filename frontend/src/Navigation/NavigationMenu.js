import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function NavPage(props) {
    return (
        <Navbar collapseOnSelect expand="lg">
            <Navbar.Brand>
                <Link to="/home">Pinder</Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Link to="/logout">Logout</Link>
            </Navbar.Collapse>
        </Navbar>
       
    );
}

export default NavPage;