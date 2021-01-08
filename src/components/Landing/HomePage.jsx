import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../../actions';
import { categoryActions } from '../../actions';

import NavBar from '../NavBar/NavBar';
import CategoryCard from '../ContentCard/CategoryCard/CategoryCard';

class HomePage extends React.Component {

    componentDidMount() {
        this.props.getUsers();
        this.props.getCategories();
    }

    render() {
        const { categories } = this.props;
        const { user, users } = this.props;

        return (
            <div className="container">
                <NavBar loggedinAs={user.user_name}/>
                <h1>Gruppe 1 - Webforum</h1>
                <h3>Categories:</h3>
                {categories.loading && <em>Loading categories...</em>}
                {categories.error && <span className="text-danger">ERROR: {categories.error}</span>}
                {categories.items &&
                <ul type='none'>
                    {categories.items.map((category, index) =>
                        <li key={category.cat_id}>
                            <p/>
                            <a href={"/categories?cat_id=" + category.cat_id} style={{ textDecoration: 'none' }}>
                            <CategoryCard categoryName={category.cat_name} categoryDescription={category.cat_description}/>
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
    const {categories } = state;
    const { users, authentication } = state;
    const { user, } = authentication;
    return { user, users, categories};
}

const actionCreators = {
    getUsers: userActions.getAll,
    getCategories: categoryActions.getAll
}

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };