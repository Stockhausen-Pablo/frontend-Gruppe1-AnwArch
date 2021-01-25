import React from "react";
import {userActions} from "../../../actions";
import {connect} from "react-redux";
import NavBar from "../../NavBar/NavBar";
import queryString from "query-string";
import Button from "react-bootstrap/Button";

class StrangerProfilePage extends React.Component {

    componentDidMount() {
        const value=queryString.parse(this.props.location.search);
        const user_id=value.user_id;
        this.props.getUser(user_id);
    }

    render() {

        const { users } = this.props;

        console.log(users);

        return(
            <div className="container" style={{paddingBottom: 20}}>
                {users.loading && <em>Loading user...</em>}
                {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                {users.item &&
                <div>
                <NavBar loggedinAs={users.item.user_name}/>
                <h1>Gruppe 1 - Webforum</h1>
                <h2>User Profile
                    <a>
                        <Button variant="primary" style={{float: 'right'}} onClick={() => {this.props.history.goBack()}}>
                            Back
                        </Button>
                    </a>
                </h2>

                <h3>Username : </h3>
                    <p>{users.item.user_name}</p>
                <h3>Level : </h3>
                    <p>{users.item.user_level}</p>
                </div>
                }
            </div>

        )
    }

}

function mapState(state) {
    const { users } = state;
    return { users };
}

const actionCreators = {
    getUser: userActions.getById
}

const connectedStrangerProfilePage = connect(mapState, actionCreators)(StrangerProfilePage);
export { connectedStrangerProfilePage as StrangerProfilePage };