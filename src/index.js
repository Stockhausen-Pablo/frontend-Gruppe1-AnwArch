import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import ForumApp from './components/ForumApp';

render((
    <BrowserRouter>
        <ForumApp />
    </BrowserRouter>
), document.getElementById('root'));


