import React from 'react'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from "redux-thunk";

import Header from './ForumHeader/Header';
import Footer from './ForumFooter/Footer';
import Main from './ForumMain';

import reducers from 'reducers';

const persistedState = {};
const store = createStore(
    // reducers,
    persistedState,
    applyMiddleware(reduxThunk))

const ForumApp = () => (
    <Provider store={store} className="ForumApp">
        <main>
            <Header />
            <Main />
            <Footer />
        </main>
    </Provider>
)
export default ForumApp;