import React, { Component } from "react";
import { Route, Router, Switch } from "react-router-dom";
import { history } from "../../features/API/History_API/historyFunctions";
//Components
import Home from "../home/Home";
import HeaderMenu from "../header/Header";
import Footer from "../footer/Footer";
import Spacer from "../utility/Spacer";
import UserDirectory from "../userdirectory/UserDirectory";
import GameDirectory from "../gamedirectory/GameDirectory";
import ProfilePage from "../usercomponents/profilepage/ProfilePage";
import GamePage from "../gamecomponents/gamepage/GamePage";
import ForgotPassword from "../forgot/ForgotPassword";
import ChangePassword from "../forgot/ChangePassword";
import SponsorPage from "../sponsors/SponsorPage";
import About from "../about/About";

class App extends Component {
  render() {
    return (
      <div>
        <HeaderMenu />
        <Spacer lines={3} />
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/users" component={UserDirectory} />
            <Route exact path="/games" component={GameDirectory} />
            <Route exact path="/user/:username" component={ProfilePage} />
            <Route exact path="/game/:gameID" component={GamePage} />
            <Route exact path="/passwordreset/:resetID" component={ChangePassword} />
            <Route exact path="/forgot" component={ForgotPassword} />
            <Route exact path="/sponsors" component={SponsorPage} />
          <Route exact path="/aboutus" component={About} />
          </Switch>
        </Router>
        <Spacer lines={10} />
        <Footer />
      </div>
    );
  }
}

export default App;
