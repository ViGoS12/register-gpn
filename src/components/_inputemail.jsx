import React from "react";
import InputComponent from "./inputcomponent";

class InputEmail extends InputComponent {
  handleChange = e => {
    // fire the form change event
    this.props.onChange(e);
    this.validateValue(e.target);
  };

  validateValue(input) {
    const re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    const email = input.value;
    let result = false;

    if (re.test(String(email).toLowerCase())) {
      result = true;
      this.setValid(input);
    } else {
      this.setInvalid(input);
    }
    console.log("validateEmail:" + result);
    this.props.onValidate(result);
  }

  render() {
    return (
      <div className="mb-3">
        {/* <label htmlFor="email">{this.props.label}</label> */}
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">@</span>
          </div>
          <input
            type="text"
            className="form-control"
            id="email"
            name="email"
            placeholder={this.props.placeholder}
            onChange={this.handleChange}
            value={this.props.value}
            required
          />
          <div className="invalid-feedback" stylename="width: 100%">
            {this.props.invalidMessage}
          </div>
        </div>
      </div>
    );
  }
}

export default InputEmail;
