import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import { Link } from 'react-router-dom';
import './NavigationMenu.css';

function NavPage(props) {
    return (
        <Navbar collapseOnSelect expand="lg">
            <Navbar.Brand>
                <Link to="/"><Image src='/logo.png' alt="Pinder Logo" roundedCircle /></Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Link to="/">Dashboard</Link>
                <Link to="/find">Find a Furry Friend</Link>
                <Link to="/create">Find a Human</Link>
                <Link to="/logout">Logout</Link>
            </Navbar.Collapse>
        </Navbar>
       
    );
}

export default NavPage;