import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { categories } from './categories.reducer';
import { topics } from './topics.reducer';
import { posts } from './posts.reducer';
import { alert } from './alert.reducer';

const rootReducer = combineReducers({
    authentication,
    registration,
    users,
    categories,
    topics,
    posts,
    alert
});

export default rootReducer;