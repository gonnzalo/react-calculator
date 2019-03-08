import React, { Component } from "react";
import math from "mathjs";
import Display from "./Display";
import Keypad from "./Keypad";
import "./App.css";

class App extends Component {
  static sumas(result) {
    /* Prevent error if last character is not valid */
    try {
      const lastChar = result.slice(-2);
      if (
        lastChar === "+ " ||
        lastChar === "- " ||
        lastChar === "* " ||
        lastChar === "/ " ||
        lastChar === "( "
      ) {
        const newStr = result.substring(0, result.length - 3);
        return math.eval(newStr);
      }
      return math.eval(result);
    } catch (error) {
      return "ERROR";
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      total: "0",
      /* checks condition of operators, equal, bracket, period, to not repeat */
      equal: true,
      operators: false,
      period: true,
      brackets: true
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    const key = event.target.value;
    const { total, operators, period, brackets, equal } = this.state;
    const isNumber = new RegExp("^\\d+$");

    if (key === "AC") {
      this.setState({ total: "0", equal: true, brackets: true });
    } else if (key === "←") {
      this.setState(prevState => {
        return { total: prevState.total.slice(0, -1) };
      });
    } else if (isNumber.test(key)) {
      this.setState(prevState => {
        return equal
          ? { total: key, equal: false, operators: true, period: true }
          : { total: prevState.total + key, operators: true, period: true };
      });
    } else
      switch (key) {
        case "+":
        case "-":
        case "/":
        case "x":
          if (operators) {
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
            const result = App.sumas(prevState.total);
            return {
              total: `${result}`,
              equal: true,
              brackets: true
            };
          });
          break;
        case ".":
          if (period) {
            this.setState(prevState => {
              return !equal
                ? { total: `${prevState.total}.`, period: false }
                : { total: ".", equal: false, period: false };
            });
          }
          break;
        case "(":
          if (brackets) {
            this.setState(prevState => {
              return equal
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
        default:
          this.setState({
            total: "ERROR",
            equal: true,
            brackets: true
          });
      }
    return null;
  }

  render() {
    const { total } = this.state;
    return (
      <div className="calculator-container">
        <Display value={total} />
        <Keypad handleClick={this.handleClick} />
      </div>
    );
  }
}

export default App;
