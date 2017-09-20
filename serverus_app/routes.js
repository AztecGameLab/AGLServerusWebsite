import React from 'react';
import { Route, IndexRoute } from 'react-router';
import firebase from 'firebase';
import App from './components/App';
import AboutPage from './components/about/AboutPage';
import AdminDashboard from './components/admin/AdminDashboard';
import ArticlePage from './components/articles/ArticlePage';
import Calendar from './components/calendar/Calendar'
import CompetitionsPage from './components/competitions/CompetitionsPage';
import Error from './components/common/error/ErrorPage';
import Inbox from './components/inbox/Inbox';
import GameDirectory from './components/games/GameDirectory';
import HomePage from './components/home/HomePage';
import MarkdownCreate from './components/articles/MarkdownCreate';
import ProfilePageContainer from './components/profile/ProfilePageContainer';
import TempHome from './components/home/TempHomePage';
import UserDirectory from './components/users/UserDirectory';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={TempHome} />
        <Route path="admin" component={AdminDashboard}/>
        <Route path="about" component={AboutPage} />
        <Route path="games" component={GameDirectory} />
        <Route path="competitions" component={CompetitionsPage} />
        <Route path="create/:type" component={MarkdownCreate} />
        <Route path="a/:articleId" component={ArticlePage} />
        <Route path="calendar" component={Calendar} />
        <Route path="u" component={UserDirectory}/>
        <Route exact path='u/:username' component={ProfilePageContainer} />
        <Route exact path="inbox/:username" component={Inbox} />
        <Route path='*' component={Error}/>
    </Route>
);
