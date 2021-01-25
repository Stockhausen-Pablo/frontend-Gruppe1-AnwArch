import React from 'react';
import { Router, Route, Switch, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';

import css from './App.css';

import { history } from '../helpers';
import { alertActions } from '../actions';
import { PrivateRoute } from '../components/Routes';
import { HomePage } from '../components/Landing/HomePage';
import {OverviewUsers} from "../components/OverviewUsers/OverviewUsers";
import { LoginPage } from '../components/UserIdentity/LoginPage';
import { RegisterPage } from '../components/UserIdentity/RegisterPage';
import { TopicPage } from '../components/Topics/TopicPage';
import {CreateTopicPage} from "../components/CreatePage/CreateTopic";
import {PostPage} from "../components/Posts";
import {UserProfilePage} from "../components/UserProfile/UserProfilePage";
import {StrangerProfilePage} from "../components/UserProfile/StrangerProfilePage";

class App extends React.Component {
    constructor(props) {
        super(props);

        history.listen((location, action) => {
            // clear alert on location change

            this.props.clearAlerts();
        });
    }

    render() {
        const { alert } = this.props;
        return (
            <div>
                <div className="container" style={{paddingBottom: 20}}>
                    <div>
                        {alert.message &&
                        <div className={`alert ${alert.type}`}>{alert.message}</div>
                        }
                        <Router history={history}>
                            <Switch>
                                <PrivateRoute exact path="/" component={HomePage} />
                                <PrivateRoute exact path="/overview" component={OverviewUsers} />
                                <PrivateRoute exact path="/categories" component={TopicPage} />
                                <PrivateRoute exact path="/create-Topic" component={CreateTopicPage} />
                                <PrivateRoute exact path="/topics" component={PostPage} />
                                <PrivateRoute exact path="/profile" component={UserProfilePage} />
                                <PrivateRoute exact path="/users" component={StrangerProfilePage} />
                                <Route path="/login" component={LoginPage} />
                                <Route path="/register" component={RegisterPage} />
                                <Redirect from="*" to="/" />
                            </Switch>
                        </Router>
                    </div>
                </div>
            </div>
        );
    }
}

function mapState(state) {
    const { alert } = state;
    return { alert };
}

const actionCreators = {
    clearAlerts: alertActions.clear
};

const connectedApp = connect(mapState, actionCreators)(App);
export { connectedApp as App};