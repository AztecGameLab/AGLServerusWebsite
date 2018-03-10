import React, { Component } from "react";
import { Route } from "react-router-dom";

//Components
import Home from "../home/Home";
import HeaderMenu from "../header/Header";
import SignUp from "../signup/SignUp";

class App extends Component {
  render() {
    return (
      <div>
        <HeaderMenu />
        <main className="App">
          <Route exact path="/" component={Home} />
          <Route exact path="/signup" component={SignUp} />
        </main>
      </div>
    );
  }
}

export default App;
