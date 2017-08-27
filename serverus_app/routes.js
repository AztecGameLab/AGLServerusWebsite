import React from 'react';
import { Route, IndexRoute } from 'react-router';
import firebase from 'firebase';
import App from './components/App';
import HomePage from './components/home/HomePage';
import AboutPage from './components/about/AboutPage';
import GamesPage from './components/games/GamesPage';
import CompetitionsPage from './components/competitions/CompetitionsPage';
import UsersPage from './components/users/UsersPage';
import MarkdownCreate from './components/markdown/MarkdownCreate';
import MarkdownPage from './components/markdown/BlogPost';
import ProfilePage from './components/profile/ProfilePage';



export default (
    <Route path="/" component={App}>
        <IndexRoute component={HomePage} />
        <Route path="about" component={AboutPage} />
        <Route path="games" component={GamesPage} />
        <Route path="competitions" component={CompetitionsPage} />
        <Route path="users" component={UsersPage} />
        <Route path="createpost" component={MarkdownCreate} />
        <Route path="articles" component={MarkdownPage} />
        <Route path='user/:username' component={ProfilePage} />
    </Route>
);
