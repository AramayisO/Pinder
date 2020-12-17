import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Image from 'react-bootstrap/Image';
import { Link } from 'react-router-dom';
import './NavigationMenu.css';

function NavPage(props) {
    return (
        <Navbar collapseOnSelect expand="lg">
            <Navbar.Brand>
                <Link to="/"><Image src={`${process.env.PUBLIC_URL}/logo.png`} alt="Pinder Logo" /></Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Link to="/">Dashboard</Link>
                    <Link to="/find">Find a Furry Friend</Link>
                    <Link to="/create">Find a Human</Link>
                    <Link to="/logout">Logout</Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
       
    );
}

export default NavPage;