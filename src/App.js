import React, { Component } from "react";
import Display from "./Display";
import Keypad from "./Keypad";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      total: "0",
      temporal: "0",
      equal: true,
      operators: false,
      period: true,
      brackets: true
      /* do a boolean for dont press operators two times */
    };

    this.handleClick = this.handleClick.bind(this);
    this.sumas = this.sumas.bind(this);
  }

  handleClick(event) {
    const key = event.target.value;
    const { total } = this.state;
    const isNumber = new RegExp("^\\d+$");

    if (key === "AC") {
      this.setState({ total: "0", temporal: "0", equal: true, brackets: true });
    } else if (key === "←") {
      this.setState(prevState => {
        return { total: prevState.total.slice(0, -1) };
      });
    } else if (isNumber.test(key)) {
      this.setState(prevState => {
        return prevState.equal
          ? { total: key, equal: false, operators: true, period: true }
          : { total: prevState.total + key, operators: true, period: true };
      });
    } else
      switch (key) {
        case "+":
        case "-":
        case "/":
        case "x":
          if (this.state.operators) {
            this.setState(prevState => {
              return {
                total: `${prevState.total} ${key === "x" ? "*" : key} `,
                equal: false,
                operators: false
              };
            });
          }
          break;
        case "=":
          this.setState(prevState => {
            const result = this.sumas(prevState.total);
            return {
              total: `${result}`,
              equal: true,
              brackets: true
            };
          });
          break;
        case ".":
          if (this.state.period) {
            this.setState(prevState => {
              return !prevState.equal
                ? { total: `${prevState.total}.`, period: false }
                : { total: ".", equal: false, period: false };
            });
          }
          break;
        case "(":
          if (this.state.brackets) {
            this.setState(prevState => {
              return prevState.equal
                ? { total: `( `, equal: false, brackets: false }
                : { total: `${prevState.total} ( `, brackets: false };
            });
          }
          break;
        case ")":
          if (total.includes("(") && !total.endsWith(") "))
            return this.setState(prevState => {
              return { total: `${prevState.total} ) `, brackets: true };
            });
          break;
      }
  }

  sumas(fn) {
    const lastChar = fn.slice(-2);
    if (
      lastChar === "+ " ||
      lastChar === "- " ||
      lastChar === "* " ||
      lastChar === "/ " ||
      lastChar === "( "
    ) {
      const newStr = fn.substring(0, fn.length - 3);
      return new Function(`return ${newStr}`)();
    }
    return new Function(`return ${fn}`)();
  }

  render() {
    const { total, temporal } = this.state;

    return (
      <div className="calculator-container">
        <Display value={temporal} />
        <Display value={total} />
        <Keypad handleClick={this.handleClick} />
      </div>
    );
  }
}

export default App;
