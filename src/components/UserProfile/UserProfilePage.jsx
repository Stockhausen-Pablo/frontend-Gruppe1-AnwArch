import React from "react";
import {userActions} from "../../actions";
import {connect} from "react-redux";
import NavBar from "../NavBar/NavBar";

class UserProfilePage extends React.Component {

    componentDidMount() {
        this.props.getUsers();
    }

    render() {

        const { user, users } = this.props;

        return(
            <div className="container" style={{paddingBottom: 20}}>
                <NavBar loggedinAs={user.user_name}/>
                <h1>Gruppe 1 - Webforum</h1>
                <h2>User Profile</h2>
                <h3>Username : </h3>
                <p>{user.user_name}</p>
                <h3>Level : </h3>
                <p>{user.user_level}</p>

            </div>

        )
    }

}

function mapState(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return { user, users };
}

const actionCreators = {
    getUsers: userActions.getAll
}

const connectedUserProfilePage = connect(mapState, actionCreators)(UserProfilePage);
export { connectedUserProfilePage as UserProfilePage };