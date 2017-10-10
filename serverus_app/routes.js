import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import AboutPage from './components/about/AboutPage';
import AdminDashboard from './components/admin/AdminDashboard';
import ArticlePage from './components/articles/ArticlePage';
import Calendar from './components/Calendar/Calendar'
import CompetitionsPage from './components/competitions/CompetitionsPage';
import Error from './components/common/error/ErrorPage';
import Inbox from './components/inbox/Inbox';
import GameDirectory from './components/games/GameDirectory';
import TempHomePage from './components/home/TempHomePage';
import MarkdownCreate from './components/articles/MarkdownCreate';
import ProfilePageContainer from './components/profile/ProfilePageContainer';
import SearchDirectory from './components/search/SearchDirectory';
import TempHome from './components/home/TempHomePage';
import UserDirectory from './components/users/UserDirectory';
import PasswordReset from './components/password/PasswordReset';
import RequestReset from './components/password/RequestReset';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={TempHomePage} />
        <Route path="admin" component={AdminDashboard}/>
        <Route path="about" component={AboutPage} />
        <Route path="a/:articleId" component={ArticlePage} />
        <Route path="calendar" component={Calendar} />
        <Route path="competitions" component={CompetitionsPage} />
        <Route path="create/:type" component={MarkdownCreate} />
        <Route path="games" component={GameDirectory} />
        <Route exact path="inbox/:username" component={Inbox} />
        <Route path="search/:searchQuery" component={SearchDirectory} />
        <Route path="u" component={UserDirectory}/>
        <Route exact path='u/:username' component={ProfilePageContainer} />
        <Route path = "forgotpassword" component = {RequestReset}/>
        <Route exact path = "passwordreset/:hash" component = {PasswordReset}/>
        <Route path='*' component={Error}/>
    </Route>
);
