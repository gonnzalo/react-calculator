import React, { Component } from "react";
import Display from "./Display";
import Keypad from "./Keypad";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Display />
        <Keypad />
      </div>
    );
  }
}

export default App;
