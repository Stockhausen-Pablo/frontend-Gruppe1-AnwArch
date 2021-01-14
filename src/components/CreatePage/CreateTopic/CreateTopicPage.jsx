import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import {topicActions, postActions} from '../../../actions';

import queryString from "query-string";
import {topicService} from "../../../services";
import Button from "@material-ui/core/Button";

class CreateTopicPage extends React.Component {

    constructor(props) {

        super(props);

        let loggedin_user = JSON.parse(localStorage.getItem('user'));

        const value=queryString.parse(this.props.location.search);
        const cat_id=value.cat_id;

        //this.cT_cat_id = cat_id;

        this.state = {
            topic: {
                topic_subject: '',
                topic_date: new Date().toISOString().slice(0, 19).replace('T', ' '),
                topic_cat: cat_id,
                topic_by: loggedin_user.user_id,
                topic_content: '',
                topic_views: 0
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
            this.props.register(topic);
        }
    }

    render() {

        const { registering  } = this.props;
        const { topic, submitted } = this.state;

        return (
            <div className="col-md-6 col-md-offset-3" style={{paddingBottom: 20}}>
                <h2>Create Topic</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !topic.topic_subject ? ' has-error' : '')}>
                        <label htmlFor="topic_subject">Topic Subject</label>
                        <input type="text" className="form-control" name="topic_subject" value={topic.topic_subject} onChange={this.handleChange} />
                        {submitted && !topic.topic_subject &&
                        <div className="help-block">topic subject is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !topic.topic_content ? ' has-error' : '')}>
                        <label htmlFor="topic_content">Topic Content</label>
                        <TextField id="topic_content" multiline rows={10} variant="filled" name="topic_content" value={topic.topic_content} onChange={this.handleChange} style ={{width: '100%'}}
                                   />
                        {submitted && !topic.topic_content &&
                        <div className="help-block">topic content is required</div>
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
    return { registering};
}

const actionCreators = {
    register: topicActions.register
}

const connectedCreateTopicPage = connect(mapState, actionCreators)(CreateTopicPage);
export { connectedCreateTopicPage as CreateTopicPage };