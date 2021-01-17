import React from "react";
import Breadcrumb from 'react-bootstrap/Breadcrumb'

import HomeIcon from '@material-ui/icons/Home';
import ClassIcon from '@material-ui/icons/Class';
import DescriptionIcon from '@material-ui/icons/Description';

import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
    link: {
        display: 'flex',
    },
    icon: {
        marginRight: theme.spacing(0.5),
        width: 25,
        height: 25,
        alignItems: "center"
    },
}));


const BreadcrumbNav = (props) => {
    const classes = useStyles();

    const cat_icon = props.cat_name ? <ClassIcon className={classes.icon}/> : '';
    const topic_icon = props.topic_subject ? <DescriptionIcon className={classes.icon}/> : '';

    return(
        <Breadcrumb>
            <Breadcrumb.Item href="/" className={classes.link}><HomeIcon className={classes.icon} />Home</Breadcrumb.Item>
            <Breadcrumb.Item href={"/categories?cat_id=" + props.cat_id}>
                {cat_icon} {props.cat_name}
            </Breadcrumb.Item>
            <Breadcrumb.Item href={"/categories?cat_id=" + props.cat_id + "&topic_id=" + props.topic_id}>{topic_icon}{props.topic_subject}</Breadcrumb.Item>
        </Breadcrumb>
    );
}

export default BreadcrumbNav;