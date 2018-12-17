import React, { Component } from "react";
import NavBar from "./theme/NavBar";
import Routes from "./Routes";
import { Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <Route path="/" component={Routes} />
      </div>
    );
  }
}

export default App;
