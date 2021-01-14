import React from "react";
import {postActions, topicActions, userActions} from "../../actions";
import {connect} from "react-redux";
import queryString from "query-string";
import NavBar from "../NavBar/NavBar";
import Button from "react-bootstrap/Button";
import TopicContentCard from "../ContentCard/TopicContentCard/TopicContentCard";
import CategoryCard from "../ContentCard/CategoryCard/CategoryCard";
import PostCard from "../ContentCard/PostCard/PostCard";
import {CreatePostCard} from "../ContentCard/CreatePostCard/CreatePostCard";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";


class PostPage extends React.Component {

    constructor(props){

        super(props);

        let loggedin_user = JSON.parse(localStorage.getItem('user'));

        const value=queryString.parse(this.props.location.search);
        const topic_id=value.topic_id;


        this.state = {
            post: {
                post_content: '',
                post_date: new Date().toISOString().slice(0, 19).replace('T', ' '),
                post_topic: topic_id,
                post_by: loggedin_user.user_id
            },
            submitted: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const value=queryString.parse(this.props.location.search);
        const topic_id=value.topic_id;
        const cat_id = value.cat_id;

        this.cT_cat_id = cat_id;
        this.cT_topic_id = topic_id;

        this.props.getUsers();
        this.props.getPosts(topic_id);
        this.props.getTopic(topic_id);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { post } = this.state;
        this.setState({
            post: {
                ...post,
                [name]: value
            }
        });
        console.log(post);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({ submitted: true });
        const { post } = this.state;
        if (post.post_content) {
            this.props.register(post);
        }
    }

    formatTime(date){
        var d = new Date(date);
        var time = d.toLocaleTimeString();
        return time;
    }

    render() {

        const { registering  } = this.props;
        const { post, submitted } = this.state;

        const { user, users} = this.props;
        const { topics } = this.props;
        const { posts } = this.props;

        return (
            <div className="container" style={{paddingBottom: 20}}>
                <NavBar loggedinAs={user.user_name}/>
                <h1>Gruppe 1 - Webforum</h1>
                <h3>Posts :
                    <a>
                        <Button variant="danger" style={{float: 'right'}} >
                            Reply to Post
                        </Button>
                    </a>
                </h3>
                <p></p>
                {posts.loading && <em>Loading topics...</em>}
                {posts.error && <span className="text-danger">ERROR: {posts.error}</span>}
                {users.items && posts.items && topics.items &&
                <ul type='none'>
                    <TopicContentCard topicBy={users.items.filter(user => user.user_id === topics.items.topic_by)[0].user_name} topicDate={topics.items.topic_date} topicContent={topics.items.topic_content}></TopicContentCard>
                    {posts.items.map((post, index) =>
                        <li key={post.post_id}>
                             <p></p>
                             <PostCard postBy={users.items.filter(user => user.user_id === post.post_by)[0].user_name} topicId={this.cT_topic_id} postContent={post.post_content}/>
                        </li>
                    )}
                    <form name="form" onSubmit={this.handleSubmit}>
                        <div className={'form-group' + (submitted && !post.post_content ? ' has-error' : '')}>
                        <p></p>
                            <Card style={{minWidth: 275, border: `2px solid red`}}>
                                <CardContent>
                                    <TextField id="post_content" multiline rows={8} label="Quick Reply" variant="outlined" name="post_content" style ={{width: '100%'}} value={post.post_content} onChange={this.handleChange}></TextField>
                                    {submitted && !post.post_content &&
                                    <div className="help-block">post content is required</div>
                                    }
                                    <p></p>
                                    <button className="btn btn-primary" style={{float: 'right'}}>Submit</button>
                                    {registering &&
                                    <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                    }
                                </CardContent>
                            </Card>
                        </div>
                    </form>
                </ul>
                }

            </div>
        );
    }
}

function mapState(state) {
    const { topics } = state;
    const { posts} = state;
    const { registering } = state.registration;
    const { users, authentication } = state;
    const { user } = authentication;
    return { user, topics, users, posts, registering};
}

const actionCreators = {
    getUsers: userActions.getAll,
    getPosts: postActions.getAllbyID,
    getTopic: topicActions.getById,
    register: postActions.register
}

const connectedPostPage = connect(mapState, actionCreators)(PostPage);
export { connectedPostPage as PostPage };