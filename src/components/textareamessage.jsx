import React from "react";
import InputComponent from "./inputcomponent";

class TextareaMessage extends InputComponent {
  handleChange = e => {
    // fire the form change event
    this.props.onChange(e);
    this.validateValue(e.target);
  };

  validateValue = input => {
    let result = false;
    const value = input.value;

    if (value && value.length >= this.props.minLen) {
      result = true;
      this.setValid(input);
    } else {
      this.setInvalid(input);
    }

    this.props.onValidate(result);
  };

  render() {
    return (
      <div className="mb-3">
        <label htmlFor="message">{this.props.label}</label>
        <div className="input-group">
          <textarea
            className="form-control"
            id="message"
            name="message"
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

export default TextareaMessage;
