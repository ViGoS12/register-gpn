import React from "react";
import InputComponent from "./inputcomponent";

class InputEgrul extends InputComponent {
  handleChange = e => {
    // fire the form change event
    this.props.onChange(e);
    this.validateValue(e.target);
  };

  validateValue(input) {
    let result = false;
    const minLen = this.props.minLen;
    const value = input.value;

    if (value && value.length >= minLen) {
      result = true;
      this.setValid(input);
    } else {
      this.setInvalid(input);
    }
    this.props.onValidate(result);
  }

  render() {
    return (
      <div className={this.props.shouldHide ? 'mb-3 hidden' : 'mb-3'} >
        {/* <label htmlFor="egrul">{this.props.label}</label> */}
        <div className="floating-label-group">
          <input
            type="text"
            className="form-control"
            id="egrul"
            name="egrul"
            required
            onChange={this.handleChange}
            value={this.props.value}
            maxLength={this.props.maxLen}
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

export default InputEgrul;
