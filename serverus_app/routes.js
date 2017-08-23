import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import AboutPage from './components/about/AboutPage';
import GamesPage from './components/games/GamesPage';
import CompetitionsPage from './components/competitions/CompetitionsPage';
import UsersPage from './components/users/UsersPage';
import MarkdownCreate from './components/markdown/MarkdownCreate';
import MarkdownPage from './components/markdown/BlogPost';

export default (
    <Route path = "/" component = {App}>
        <IndexRoute component = {HomePage} />
        <Route path = "about" component = {AboutPage} />
        <Route path = "games" component = {GamesPage}/>
        <Route path = "competitions" component={CompetitionsPage} />
        <Route path = "users" component={UsersPage} />
        <Route path = "createpost" component = {MarkdownCreate}/>
        <Route path = "markdown" component = {MarkdownPage}/>
    </Route>
);
