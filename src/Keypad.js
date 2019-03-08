import React from "react";
import PropTypes from "prop-types";
import "./Keypad.css";

function Keypad(props) {
  const { handleClick } = props;
  return (
    <div className="keypad">
      <input
        type="button"
        className="btns reset"
        onClick={handleClick}
        value="c"
      />
      <input
        type="button"
        className="btns others"
        onClick={handleClick}
        value="←"
      />
      <input
        type="button"
        className="btns others"
        onClick={handleClick}
        value="("
      />
      <input
        type="button"
        className="btns others"
        onClick={handleClick}
        value=")"
      />

      <input type="button" className="btns" onClick={handleClick} value="7" />
      <input type="button" className="btns" onClick={handleClick} value="8" />
      <input type="button" className="btns" onClick={handleClick} value="9" />
      <input
        type="button"
        className="btns operators"
        onClick={handleClick}
        value="/"
      />

      <input type="button" className="btns" onClick={handleClick} value="4" />
      <input type="button" className="btns" onClick={handleClick} value="5" />
      <input type="button" className="btns" onClick={handleClick} value="6" />
      <input
        type="button"
        className="btns operators"
        onClick={handleClick}
        value="x"
      />

      <input type="button" className="btns" onClick={handleClick} value="1" />
      <input type="button" className="btns" onClick={handleClick} value="2" />
      <input type="button" className="btns" onClick={handleClick} value="3" />
      <input
        type="button"
        className="btns operators"
        onClick={handleClick}
        value="-"
      />

      <input
        type="button"
        className="btns border-left"
        onClick={handleClick}
        value="."
      />
      <input type="button" className="btns" onClick={handleClick} value="0" />
      <input
        type="button"
        className="btns equal"
        onClick={handleClick}
        value="="
      />
      <input
        type="button"
        className="btns operators border-rigth"
        onClick={handleClick}
        value="+"
      />
    </div>
  );
}

Keypad.propTypes = {
  handleClick: PropTypes.func.isRequired
};

export default Keypad;
