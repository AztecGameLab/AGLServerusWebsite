import React from 'react';
import { Route, IndexRoute } from 'react-router';
import firebase from 'firebase';
import App from './components/App';
import HomePage from './components/home/HomePage';
import AboutPage from './components/about/AboutPage';
import GamesPage from './components/games/GamesPage';
import CompetitionsPage from './components/competitions/CompetitionsPage';
import MarkdownCreate from './components/markdown/MarkdownCreate';
import MarkdownPage from './components/markdown/BlogPost';
import UserDirectory from './components/users/UserDirectory';
import ProfilePageContainer from './components/profile/ProfilePageContainer';
import Calendar from './components/Calendar/Calendar'


export default (
    <Route path="/" component={App}>
        <IndexRoute component={HomePage} />
        <Route path="about" component={AboutPage} />
        <Route path="games" component={GamesPage} />
        <Route path="competitions" component={CompetitionsPage} />
        <Route path="createpost" component={MarkdownCreate} />
        <Route path="articles" component={MarkdownPage} />
        <Route path="calendar" component={Calendar} />
        <Route path="u" component={UserDirectory}/>
        <Route path='u/:username' component={ProfilePageContainer} />
    </Route>
);
