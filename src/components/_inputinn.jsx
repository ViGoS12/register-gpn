import React from "react";
import InputComponent from "./inputcomponent";

class InputInn extends InputComponent {
  error = {};

  handleChange = e => {
    // fire the form change event
    this.props.onChange(e);
    this.validateValue(e.target);
  };

  validateValue(input) {
    let result = false;
    
    //const minLen = this.props.minLen;
    const value = input.value;

    if (value && value.length === this.props.maxLen && this.validateInn(value, this.error)) {
      result = true;
      this.setValid(input);
    } else {
      this.setInvalid(input);
    }
    this.props.onValidate(result);
  }

  validateInn(inn, error) {
    var result = false;
    if (typeof inn === 'number') {
      inn = inn.toString();
    } else if (typeof inn !== 'string') {
      inn = '';
    }
    if (!inn.length) {
      error.code = 1;
      error.message = 'ИНН пуст';
    } else if (/[^0-9]/.test(inn)) {
      error.code = 2;
      error.message = 'ИНН может состоять только из цифр';
    } else if ([10, 12].indexOf(inn.length) === -1) {
      error.code = 3;
      error.message = 'ИНН может состоять только из 10 или 12 цифр';
    } else {
      var checkDigit = function (inn, coefficients) {
        var n = 0;
        for (var i in coefficients) {
          n += coefficients[i] * inn[i];
        }
        return parseInt(n % 11 % 10);
      };
      switch (inn.length) {
        case 10:
          var n10 = checkDigit(inn, [2, 4, 10, 3, 5, 9, 4, 6, 8]);
          if (n10 === parseInt(inn[9])) {
            result = true;
          }
          break;
        case 12:
          var n11 = checkDigit(inn, [7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
          var n12 = checkDigit(inn, [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
          if ((n11 === parseInt(inn[10])) && (n12 === parseInt(inn[11]))) {
            result = true;
          }
          break;
      }
      if (!result) {
        error.code = 4;
        error.message = 'Неверный ИНН';
      }
    }
    return result;
  }

  render() {
    return (
      <div className={this.props.shouldHide ? 'mb-3 hidden' : 'mb-3'} >
        {/* <label htmlFor="inn">{this.props.label}</label> */}
        <div className="floating-label-group">
          <input
            type="text"
            className="form-control"
            id="inn"
            name="inn"
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

export default InputInn;
