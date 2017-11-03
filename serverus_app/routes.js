import React from 'react';
import { Route, Switch } from 'react-router-dom';
import App from './components/App';
import AboutPage from './components/about/AboutPage';
import AdminDashboard from './components/admin/AdminDashboard';
import ArticlePage from './components/articles/ArticlePage';
import ArticlePost from './components/articles/ArticlePost';
import Calendar from './components/Calendar/Calendar'
import CompetitionsPage from './components/competitions/CompetitionsPage';
import Error from './components/common/error/ErrorPage';
import GameCard from './components/common/cards/GameCard';
import GamePost from './components/games/GamePost';
import Inbox from './components/inbox/Inbox';
import GameDirectory from './components/games/GameDirectory';
import TempHomePage from './components/home/TempHomePage';
import ProfilePageContainer from './components/profile/ProfilePageContainer';
import SearchDirectory from './components/search/SearchDirectory';
import TempHome from './components/home/TempHomePage';
import UserDirectory from './components/users/UserDirectory';
import PasswordReset from './components/password/PasswordReset';
import RequestReset from './components/password/RequestReset';
import MessageTest from './components/message/MessageTest';
import PatchNodes from './components/patchnotes/PatchNotes';
import GamePageDynam from './components/games/GamePageDynam';

const Routes = (appProps) => {
    return (
        <Switch>
            <Route exact path="/" render={(props) => <TempHomePage showModal={appProps.showModal} {...props} />} />
            <Route exact path="/admin" component={AdminDashboard} />
            <Route exact path="/about" component={AboutPage} />
            <Route exact path="/a/:articleId" component={ArticlePage} />
            <Route exact path="/calendar" component={Calendar} />
            <Route exact path="/competitions" component={CompetitionsPage} />
            <Route exact path="/create/announcement" component={ArticlePost} />
            <Route exact path="/create/tutorial" component={ArticlePost} />
            <Route exact path="/create/game" component={GamePost} />
            <Route exact path="/g/" component={GameDirectory} />
            <Route exact path="/g/:gameId" component={GamePageDynam} />
            {/* <Route exact path="/create/game" component={MessageTest} /> */}
            <Route exact path="/games" component={GameDirectory} />
            <Route exact path="/patchnotes" component={PatchNodes} />
            <Route exact path="/inbox/:username" component={Inbox} />
            <Route exact path="/search/:searchQuery" component={SearchDirectory} />
            <Route exact path="/u" component={UserDirectory} />
            <Route exact path='/u/:username' component={ProfilePageContainer} />
            <Route exact path="/forgotpassword" component={RequestReset} />
            <Route exact path="/passwordreset/:hash" component={PasswordReset} />
            <Route exact path="/messageTest" component={MessageTest} />
            <Route path='*' component={Error} />
        </Switch>
    )
}
export default Routes;