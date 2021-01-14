import React, {useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import queryString from 'query-string';

import Paper from '@material-ui/core/Paper';
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import {postActions, topicActions, userActions} from '../../actions';
import { DataGrid } from '@material-ui/data-grid';

import NavBar from '../NavBar/NavBar';
import TopicCard from "../ContentCard/TopicCard/TopicCard";
import TableCell from "@material-ui/core/TableCell";
import makeStyles from "@material-ui/core/styles/makeStyles";



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
        this.props.getPosts();
    }

    handleLastPost(posts, topic, users){
        let filteredpost = posts.items.filter(post => post.post_topic === topic.topic_id)
                                        .filter(
                                            post => {
                                                var d = new Date (post.post_date);
                                                return d.getTime() === new Date(Math.max.apply(null, posts.items.map(post => {
                                                    return new Date(post.post_date)
                                                }))).getTime()})
        if (filteredpost.length === 0){
            let last_user = users.items.filter(user => user.user_id === topic.topic_by)[0].user_name;
            let last_post = topic.topic_date;
            return {user: last_user, post: last_post};
        }else{
            let last_user = users.items.filter(user => user.user_id === filteredpost[0].post_by)[0].user_name;
            let last_post = filteredpost[0].post_date;
            return {user: last_user, post: last_post};
        }
    }

    formatDate(date){
        var d = new Date(date);
        d = d.toISOString().split('T')[0];
        return d;
    }

    formatTime(date){
        var d = new Date(date);
        var time = d.toLocaleTimeString();
        return time;
    }

    handleIncrementViews(id){
        return (e) => this.props.incrementViews(id);
    }

    render() {

        const { topics } = this.props;
        const { user, users} = this.props;
        const { posts } = this.props;

        console.log(topics);

        return (
            <div className="container" style={{paddingBottom: 20}}>
                <NavBar loggedinAs={user.user_name}/>
                <h1>Gruppe 1 - Webforum</h1>
                <h3>Topics :
                    <a>
                        <Button variant="danger" style={{float: 'right'}} onClick={() => {this.props.history.push('/create-Topic?cat_id='+this.cT_cat_id)}}>
                            Create Topic
                        </Button>
                    </a>
                </h3>
                <p></p>
                {topics.loading && <em>Loading topics...</em>}
                {topics.error && <span className="text-danger">ERROR: {topics.error}</span>}
                {topics.items && users.items && posts.items &&
                <TableContainer component={Paper}>
                    <Table size="medium" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell style={{width: 400}}>Title</TableCell>
                                <TableCell align="right" style={{width: 150}}>Replies</TableCell>
                                <TableCell align="right" style={{width: 150}}>Views</TableCell>
                                <TableCell align="right">Last post</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {topics.items.sort((a,b) => {
                            return new Date(a.topic_date).getTime() - new Date(b.topic_date).getTime()}).reverse().map((topic, index) =>
                            <TableRow key={topic.topic_id} border-spacing={0}>
                                <TableCell component="th" scope="row">
                                    <a  href={"/topics?cat_id=" + this.cT_cat_id + "&topic_id=" + topic.topic_id} onClick={this.handleIncrementViews(topic.topic_id)}>
                                    <b>{topic.topic_subject}</b>
                                    </a>
                                    <p>by: <a href={"/users?user_id=" + topic.topic_by}>{users.items.filter(user => user.user_id === topic.topic_by)[0].user_name}</a></p>
                                </TableCell>
                                <TableCell align="right">{posts.items.filter(post => post.post_topic === topic.topic_id).length}</TableCell>
                                <TableCell align="right">{topic.topic_views}</TableCell>
                                <TableCell align="right">
                                    by: {this.handleLastPost(posts,topic,users).user}
                                    <div>
                                        {this.formatDate(this.handleLastPost(posts,topic,users).post)}
                                        <p>
                                            {this.formatTime(this.handleLastPost(posts,topic,users).post)}
                                        </p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                        </TableBody>
                    </Table>
                </TableContainer>
                }

            </div>
        );
    }
}


function mapState(state) {
    const { topics } = state;
    const { posts } = state;
    const { users, authentication } = state;
    const { user, } = authentication;
    return { user, users, topics, posts};
}

const actionCreators = {
    getUsers: userActions.getAll,
    getTopics: topicActions.getAllbyID,
    getPosts: postActions.getAll,
    incrementViews: topicActions.increment
}

const connectedTopicPage = connect(mapState, actionCreators)(TopicPage);
export { connectedTopicPage as TopicPage };