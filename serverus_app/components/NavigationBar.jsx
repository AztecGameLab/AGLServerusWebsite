import React from 'react'
import style from '../style/style.css'
import Home from '../containers/Home.jsx'
import About from '../containers/About.jsx'
import Games from '../containers/Games.jsx'
import Competitions from '../containers/Competitions.jsx'
import Users from '../containers/Users.jsx'
import Profile from '../containers/Profile.jsx'
import SignIn from '../containers/SignIn.jsx'
import SignUp from '../containers/SignUp.jsx'
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'

const NavigationBar = (props) => {
    let user;
    switch (props.loggedIn) {
        case true:
            user = <Link to = "/profile"><i className="fa fa-user-circle"></i></Link>;
            break;
        case false:
            user = <Link to="/signin"><i className="fa fa-sign-in"></i></Link>;
            break;
    }
    return (
        <Router>
            <div>
                <div className="icon-bar">
                    <Link to="/" className="home-icon"><i className="fa fa-flask"></i></Link>
                    {user}
                    <Link to="/games"><i className="fa fa-gamepad"></i></Link>
                    <Link to="/competitions"><i className="fa fa-trophy"></i></Link>
                    <Link to="/users"><i className="fa fa-users"></i></Link>
                    <Link to = "/about"><i className="fa fa-info-circle"></i></Link>
                    <a className = "DEBUG-LOGIN" onClick = {props.loginAuth}><i className="fa fa-mail-reply-all"></i></a>
                </div>
                    <div className="current-page">
                        <Route exact path="/" component={Home} />
                        <Route path="/signin" component={SignIn} />
                        <Route path="/profile" component={Profile} />
                        <Route path="/games" component={Games} />
                        <Route path="/competitions" component={Competitions} />
                        <Route path="/users" component={Users} />
                        <Route path="/about" component={About} />
                    </div>
                </div>
        </Router>

            );
};

export default NavigationBar