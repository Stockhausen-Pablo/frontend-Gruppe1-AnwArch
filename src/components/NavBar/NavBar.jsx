import React from 'react';
import { Navbar} from 'react-bootstrap';

import { userActions } from '../../actions';

import HomeIcon from '@material-ui/icons/Home';
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(0.5),
        width: 45,
        height: 45,
        alignItems: "center"
    },
}));


const NavBar = (props) => {
    const classes = useStyles();

    return(
        <Navbar collapseOnSelect bg="dark" expand="lg">
            <Navbar.Brand href="/">
                <HomeIcon className={classes.icon}/>
            </Navbar.Brand>
            <Navbar.Brand className="ml-auto">Signed in as: <a href="/profile">{props.loggedinAs}</a></Navbar.Brand>
            <Navbar.Brand>
                <Navbar.Text className="ml-auto">
                    <a href="/login">Logout</a>
                </Navbar.Text>
            </Navbar.Brand>
        </Navbar>

    );
}

export default NavBar;