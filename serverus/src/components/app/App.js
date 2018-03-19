import React, { Component } from "react";
import { Route, Router } from "react-router-dom";
import { history } from "../../features/API/History_API/historyFunctions";

//Components
import Home from "../home/Home";
import HeaderMenu from "../header/Header";
import Footer from "../footer/Footer";
class App extends Component {
  render() {
    return (
      <div>
        <HeaderMenu />
        <Router history={history}>
          <Route exact path="/" component={Home} />
        </Router>
        <Footer/>
      </div>
    );
  }
}

export default App;
