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

const OuterFrame = (props) => {
    let user;
    switch (props.loggedIn) {
        case true:
            user = <Link to="/profile"><i className="fa fa-user-circle"></i><span>Profile</span></Link>;
            break;
        case false:
            user = <Link to="/signin"><i className="fa fa-sign-in"></i><span>Log In!</span></Link>;
            break;
    }
    return (
        <Router>
            <div>
                <div className = "top-bar">
                    <ul className = "top-bar">
                        {user}
                    </ul>
                </div>
                <div className="icon-bar">
                    <Link to="/" className="home-icon"><i className="fa fa-flask"></i></Link>
                    {user}
                    <Link to="/signup"><i className="fa fa-user-plus"></i><span>Sign Up!</span></Link>
                    <Link to="/games"><i className="fa fa-gamepad"></i><span>Browse Games</span></Link>
                    <Link to="/competitions"><i className="fa fa-trophy"></i><span>Game Jams</span></Link>
                    <Link to="/users"><i className="fa fa-users"></i><span>User Directory</span></Link>
                    <Link to="/about"><i className="fa fa-info-circle"></i><span>About Us</span></Link>
                    <a className="DEBUG-LOGIN" onClick={props.loginAuth}><i className="fa fa-mail-reply-all"></i><span>TEST LOGIN/OUT</span></a>
                </div>
                <div className="current-page">
                    <Route exact path="/" component={Home} />
                    <Route path="/signin" component={SignIn} />
                    <Route path="/signup" component={SignUp} />
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

export default OuterFrame;