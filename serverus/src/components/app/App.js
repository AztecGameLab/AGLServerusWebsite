import React, { Component } from "react";
import { Route, Router, Switch } from "react-router-dom";
import { history } from "../../features/API/History_API/historyFunctions";

//Components
import Home from "../home/Home";
import HeaderMenu from "../header/Header";
import Footer from "../footer/Footer";
import UserDirectory from "../userdirectory/UserDirectory";
import GameDirectory from "../gamedirectory/GameDirectory";

class App extends Component {
  render() {
    return (
      <div>
        <HeaderMenu />
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/users" component={UserDirectory} />
            <Route exact path="/games" component={GameDirectory} />
          </Switch>
        </Router>
        <Footer/>
      </div>
    );
  }
}

export default App;
