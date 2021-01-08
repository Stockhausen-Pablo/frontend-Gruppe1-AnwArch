import React, {useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';

import {topicActions, userActions} from '../../actions';

import NavBar from '../NavBar/NavBar';
import TopicCard from "../ContentCard/TopicCard/TopicCard";

import queryString from 'query-string';


class TopicPage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            creator: ''
        }
    }

    componentDidMount() {
        const value=queryString.parse(this.props.location.search);
        const cat_id=value.cat_id;
        this.cT_cat_id = cat_id;
        this.props.getUsers();
        this.props.getTopics(cat_id);
    }


    render() {

        const { topics } = this.props;
        const { user, users} = this.props;

        return (
            <div className="container">
                <NavBar loggedinAs={user.user_name}/>
                <h1>Gruppe 1 - Webforum</h1>
                <h3>Topics :
                    <a>
                        <Button variant="danger" style={{float: 'right'}} onClick={() => {this.props.history.push('/create-Topic?cat_id='+this.cT_cat_id)}}>
                            Create Topic
                        </Button>
                    </a>
                </h3>
                {topics.loading && <em>Loading topics...</em>}
                {topics.error && <span className="text-danger">ERROR: {topics.error}</span>}
                {topics.items && users.items &&
                <ul type='none' >
                    {topics.items.map((topic, index) =>
                        <li key={topic.topic_id}>
                            <p/>
                            <a href={"/categories/" + topic.topic_id} style={{ textDecoration: 'none' }}>
                                <TopicCard topicSubject={topic.topic_subject} topicDate={topic.topic_date} topicBy={users.items.filter(user => user.user_id === topic.topic_by)[0].user_name}/>
                            </a>
                        </li>
                    )}
                </ul>
                }

            </div>
        );
    }
}


function mapState(state) {
    const {topics } = state;
    const { users, authentication } = state;
    const { user, } = authentication;
    return { user, users, topics};
}

const actionCreators = {
    getUsers: userActions.getAll,
    getTopics: topicActions.getAllbyID
}

const connectedTopicPage = connect(mapState, actionCreators)(TopicPage);
export { connectedTopicPage as TopicPage };