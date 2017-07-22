import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import AboutPage from './components/about/AboutPage';
import GamesPage from './components/games/GamesPage';
import CompetitionsPage from './components/competitions/CompetitionsPage';
import UsersPage from './components/users/UsersPage';
import SignUpPage from './components/signup/SignUpPage';


export default (
    <Route path = "/" component = {App}>
        <IndexRoute component = {HomePage} />
        <Route path = "about" component = {AboutPage} />
        <Route path = "games" component = {GamesPage}/>
        <Route path = "competitions" component={CompetitionsPage} />
        <Route path = "users" component={UsersPage} />
        <Route path = "signin" component={SignUpPage} />
    </Route>
);
