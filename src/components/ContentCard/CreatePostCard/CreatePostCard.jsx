import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import {postActions} from "../../../actions";
import {connect} from "react-redux";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        border: `2px solid red`,
        //background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
    },
    title: {
        fontSize: 7,
    },
    pos: {
        marginBottom: 12,
    },
    avatar: {
        backgroundColor: red[500],
    },
});

const submitted = false;

const handleSubmit = (event, props) => {
    event.preventDefault();
    this.submitted = true;
    const { topic } = props;
    if (topic.topic_subject) {
        this.props.post_register(post);
    }
}

function CreatePostCard(props) {

    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;

    return (
        <Card className={classes.root}>
            <CardContent>
                <TextField id="outlined-basic" multiline rows={8} label="Quick Reply" variant="outlined" style ={{width: '100%'}}>{props.postContent}</TextField>
                <p></p>
                <button className="btn btn-primary" style={{float: 'right'}}>Submit</button>
            </CardContent>
        </Card>
    );
}

function mapState(state) {
    const { registering } = state.registration;
    return { registering};
}

const actionCreators = {
    post_register: postActions.register
}

const connectedCreatePostCard = connect(mapState, actionCreators)(CreatePostCard);
export { connectedCreatePostCard as CreatePostCard };