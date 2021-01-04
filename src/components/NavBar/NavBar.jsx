import React from 'react';
import { Navbar} from 'react-bootstrap';

import { userActions } from '../../actions';

import home from './zuhause.svg';

const NavBar = (props) => {
    return(
        <Navbar collapseOnSelect bg="dark" expand="lg">
            <Navbar.Brand href="/home">
                <img
                    src={home}
                    width="40"
                    height="40"
                    className="d-inline-block align-top"
                    alt="home logo"
                />HOME
            </Navbar.Brand>
            <Navbar.Brand href="/">Signed in as: <a href="">{props.loggedinAs}</a></Navbar.Brand>
            <Navbar.Collapse>
                <Navbar.Text className="ml-auto">
                    <a href="/login">Logout</a>
                </Navbar.Text>
            </Navbar.Collapse>
        </Navbar>

    );
}

export default NavBar;