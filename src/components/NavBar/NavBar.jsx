import React from 'react';
import { Navbar} from 'react-bootstrap';

import { userActions } from '../../actions';

import home from './zuhause.svg';

const NavBar = (props) => {
    return(
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="/home">
                <img
                    src={home}
                    width="30"
                    height="30"
                />
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