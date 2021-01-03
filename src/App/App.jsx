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
                <div className="container">
                    <div>
                        {alert.message &&
                        <div className={`alert ${alert.type}`}>{alert.message}</div>
                        }
                        <Router history={history}>
                            <Switch>
                                <PrivateRoute exact path="/" component={HomePage} />
                                <PrivateRoute exact path="/overview" component={OverviewUsers} />
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