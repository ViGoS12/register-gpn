import React from "react";
import InputComponent from "./inputcomponent";

class InputUserSecondName extends InputComponent {
  handleChange = e => {
    // fire the form change event
    this.props.onChange(e);
    this.validateValue(e.target);
  };

  validateValue(input) {
    let result = false;
    const minLen = this.props.minLen;
    const value = input.value;

    if (value && this.validateSymbols(input) && value.length > minLen ) {
      result = true;
      this.setValid(input);
    } else {
      this.setInvalid(input);
    }
    this.props.onValidate(result);
  }

  validateSymbols(input){
    const reSpace = /^((?!\s{1}).)*$/;
    const txt = input.value;
    let result = false;
    if (reSpace.test(String(txt))) {
      //const re = /^[?!,'":@*—+«‎»()\\/\-_.а-яА-ЯёЁ0-9a-zA-Z\s]+$/;
      const re = /^[?!,'"—«‎»\-_.а-яА-ЯёЁ0-9a-zA-Z\s]+$/;
      if (re.test(String(txt))) {
        result = true;
      } else {
        result = false;
      }
      console.log("validateInput:" + result);
    } else {
      result = false;
    }
    return result;
  }

  render() {
    return (
      <div className={this.props.shouldHide ? 'mb-3 hidden' : 'mb-3'} >
        {/* <label htmlFor="userSecondName">{this.props.label}</label> */}
        <div className="floating-label-group">
          <input
            type="text"
            className="form-control"
            id="userSecondName"
            name="userSecondName"
            onChange={this.handleChange}
            value={this.props.value}
            required
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

export default InputUserSecondName;
