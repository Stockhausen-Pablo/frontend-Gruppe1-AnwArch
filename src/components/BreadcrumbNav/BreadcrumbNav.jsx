import React from "react";
import Breadcrumb from 'react-bootstrap/Breadcrumb'

const BreadcrumbNav = (props) => {
    return(
        <Breadcrumb>
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item href={"/categories?cat_id=" + props.cat_id}>
                {props.cat_name}
            </Breadcrumb.Item>
            <Breadcrumb.Item href={"/categories?cat_id=" + props.cat_id + "&topic_id=" + props.topic_id}>{props.topic_subject}</Breadcrumb.Item>
        </Breadcrumb>
    );
}

export default BreadcrumbNav;