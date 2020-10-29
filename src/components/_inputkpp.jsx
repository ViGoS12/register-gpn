import React from "react";
import InputComponent from "./inputcomponent";

class InputKpp extends InputComponent {
  error = {
    message: ''
  };

  handleChange = e => {
    // fire the form change event
    this.props.onChange(e);
    this.validateValue(e.target);
  };

  validateValue(input) {
    let result = false;
    //const minLen = this.props.minLen;
    const value = input.value;

    if (value && this.validateKPP(value, this.error)) {
      result = true;
      this.setValid(input);
    } else {
      this.setInvalid(input);
    }
    this.props.onValidate(result);
  }

  validateKPP (val, error) {
    var result = false;
    if (typeof val === 'number') {
      val = val.toString();
    } else if (typeof val !== 'string') {
      val = '';
    }
    if (!val.length) {
      error.code = 1;
      error.message = 'КПП пуст';
    } else if (/[^0-9]/.test(val)) {
      error.code = 2;
      error.message = 'КПП может состоять только из цифр';
    } else if ([9].indexOf(val.length) === -1) {
      error.code = 3;
      error.message = 'КПП может состоять только из 9 цифр';
    } else {
      result = true;
    }
    return result;
  }

  render() {
    return (
      <div className={this.props.shouldHide ? 'mb-3 hidden' : 'mb-3'} >
        {/* <label htmlFor="kpp">{this.props.label}</label> */}
        <div className="floating-label-group">
          <input
            type="text"
            className="form-control"
            id="kpp"
            name="kpp"
            required
            onChange={this.handleChange}
            value={this.props.value}
            maxLength={this.props.maxLen}
          />
          <span className="floating-label">{this.props.label}</span>
          <div className="invalid-feedback" stylename="width: 100%">
            {/* {this.props.invalidMessage} */}
            {this.error.message}
          </div>
        </div>
      </div>
    );
  }
}

export default InputKpp;
