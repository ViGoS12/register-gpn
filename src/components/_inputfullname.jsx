import React from "react";
import InputComponent from "./inputcomponent";

class InputFullname extends InputComponent {
  handleChange = e => {
    // fire the form change event
    this.props.onChange(e);
    this.validateValue(e.target);
  };

  validateValue(input) {
    let result = false;
    const minLen = this.props.minLen;
    const value = input.value;

    if (value && this.validateSymbols(input) && value.length >= minLen ) {
      result = true;
      this.setValid(input);
    } else {
      this.setInvalid(input);
    }
    this.props.onValidate(result);
  }

  validateSymbols(input){
    const re = /^[?!,'":@*—+«‎»()\\/\-_.а-яА-ЯёЁ0-9a-zA-Z\s]+$/;
    //const re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,5})+$/;
    const txt = input.value;
    let result = false;

    if (re.test(String(txt))) {
      result = true;
      this.setValid(input);
    } else {
      this.setInvalid(input);
    }
    console.log("validateInput:" + result);
    return result;
  }

  render() {
    return (
      <div className={this.props.shouldHide ? 'mb-3 hidden' : 'mb-3'} >
        {/* <label htmlFor="fullName">{this.props.label}</label> */}
        <div className="floating-label-group">
          <input
            type="text"
            className="form-control"
            id="fullName"
            name="fullName"
            required
            onChange={this.handleChange}
            value={this.props.value}
          />
          <span className="floating-label">{this.props.label}</span>
          <div className="invalid-feedback" stylename="width: 100%">
            {this.props.invalidMessage}
          </div>
        </div>
      </div>
    );
  }
}

export default InputFullname;
