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
      equal: false
      /* do a boolean for dont press operators two times */
    };

    this.handleClick = this.handleClick.bind(this);
    this.sumas = this.sumas.bind(this);
  }

  handleClick(event) {
    const key = event.target.value;
    const { total } = this.state;
    const isNumber = new RegExp("^\\d+$");
    if (this.state.total === "0") {
      return !(
        key === "+" ||
        key === "/" ||
        key === ")" ||
        key === "x" ||
        key === "="
      )
        ? this.setState({ total: key })
        : {};
    }
    if (key === "AC") {
      this.setState({ total: "0", temporal: "0" });
    } else if (key === "←") {
      this.setState(prevState => {
        return { total: prevState.total.slice(0, -1) };
      });
    } else if (isNumber.test(key)) {
      this.setState(prevState => {
        return prevState.equal
          ? { total: key, equal: false }
          : { total: prevState.total + key };
      });
    } else
      switch (key) {
        case "+":
          this.setState(prevState => {
            return {
              total: `${prevState.total} + `,
              equal: false
            };
          });
          break;
        case "-":
          this.setState(prevState => {
            return { total: `${prevState.total} - `, equal: false };
          });
          break;
        case "x":
          this.setState(prevState => {
            return { total: `${prevState.total} * `, equal: false };
          });
          break;
        case "/":
          this.setState(prevState => {
            return { total: `${prevState.total} / `, equal: false };
          });
          break;
        case "=":
          this.setState(prevState => {
            const result = this.sumas(prevState.total);
            return {
              total: `${result}`,
              equal: true
            };
          });
          break;
        case ".":
          this.setState(prevState => {
            return !prevState.equal
              ? { total: `${prevState.total}.` }
              : { total: "." };
          });
          break;
        case "(":
          this.setState(prevState => {
            return { total: `${prevState.total} ( ` };
          });
          break;
        case ")":
          if (total.includes("(") && !total.endsWith(") "))
            return this.setState(prevState => {
              return { total: `${prevState.total} ) ` };
            });
          break;
      }
  }

  sumas(fn) {
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
