import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import {topicActions, userActions} from '../../../actions';

class CreateTopicPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            topic: {
                topic_subject: '',
                topic_date: new Date().toISOString().slice(0, 19).replace('T', ' '),
                topic_cat: '2', //nachtragen
                topic_by: '1'
            },
            user: {
                post_content: '',
                post_date: new Date().toISOString().slice(0, 19).replace('T', ' '),
                post_topic: '', //nachtragen
                post_by: '',
                post_first: true
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { topic } = this.state;
        this.setState({
            topic: {
                ...topic,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { topic } = this.state;
        if (topic.topic_subject) {
            console.log(topic);
            this.props.topic_register(topic);
        }
    }

    render() {
        const { registering  } = this.props;
        const { topic, user, submitted } = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Create Topic</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !topic.topic_subject ? ' has-error' : '')}>
                        <label htmlFor="topic_subject">Topic Subject</label>
                        <input type="text" className="form-control" name="topic_subject" value={topic.topic_subject} onChange={this.handleChange} />
                        {submitted && !topic.topic_subject &&
                        <div className="help-block">topic subject is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">Create</button>
                        {registering &&
                        <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                        <Link to="/" className="btn btn-link">Cancel</Link>
                    </div>
                </form>
            </div>
        );
    }
}

function mapState(state) {
    const { registering } = state.registration;
    return { registering };
}

const actionCreators = {
    topic_register: topicActions.register
}

const connectedCreateTopicPage = connect(mapState, actionCreators)(CreateTopicPage);
export { connectedCreateTopicPage as CreateTopicPage };