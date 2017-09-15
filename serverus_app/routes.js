import React from 'react';
import { Route, IndexRoute } from 'react-router';
import firebase from 'firebase';
import App from './components/App';
import AdminDashboard from './components/admin/AdminDashboard';
import HomePage from './components/home/HomePage';
import AboutPage from './components/about/AboutPage';
import GamesPage from './components/games/GamesPage';
import CompetitionsPage from './components/competitions/CompetitionsPage';
import MarkdownCreate from './components/markdown/MarkdownCreate';
import MarkdownPage from './components/markdown/BlogPost';
import UserDirectory from './components/users/UserDirectory';
import ProfilePageContainer from './components/profile/ProfilePageContainer';
import Calendar from './components/Calendar/Calendar'
import ArticlePage from './components/markdown/ArticlePage';
import TempHome from './components/home/TempHomePage';
import Error from './components/error/ErrorPage';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={TempHome} />
        <Route path="admin" component={AdminDashboard}/>
        <Route path="about" component={AboutPage} />
        <Route path="games" component={GamesPage} />
        <Route path="competitions" component={CompetitionsPage} />
        <Route path="create/:type" component={MarkdownCreate} />
        <Route path="articles" component={MarkdownPage} />
        <Route path="calendar" component={Calendar} />
        <Route path="u" component={UserDirectory}/>
        <Route path='u/:username' component={ProfilePageContainer} />
        <Route path='a/:articleId' component={ArticlePage} />
        <Route path='*' component={Error}/>
    </Route>
);
