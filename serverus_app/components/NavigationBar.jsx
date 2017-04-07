import React from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import style from '../style/style.css';
import Home from './Home.jsx';
// import SignUp from './SignUpForm.jsx';


export default class NavigationBar extends React.Component {
    render() {
        return (       
        <Router><div>
            <div className="navContainer">
                <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2"><NavLink to="/"><button className="btnNav">Aztec Game Labs</button></NavLink></div>
                <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2"><NavLink to="/signup"><button>Sign Up!</button></NavLink></div>
            </div>
            <Route path="/" component={Home}></Route>
            {/*<Route path="/" component={SignUp}></Route>*/}
        </div></Router>
        );
    }
}