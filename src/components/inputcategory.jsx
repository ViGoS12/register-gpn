import React from "react";
import InputComponent from "./inputcomponent";

class InputCategory extends InputComponent {
  handleChange = e => {
    // fire the form change event
    this.props.onChange(e);
    this.validateValue();
  };

  validateValue = () => {
    this.props.onValidate(true);
  };

  render() {
    return (
      <React.Fragment>
        <hr className="mt-4" />
        <h4 className="mb-3">{this.props.label}</h4>
        <div className="d-block my-3">
          {this.props.items.map(item => (
            <div key={item.id} className="custom-control custom-switch">
              <input
                id={item.id}
                key={item.id}
                value={item.id}
                name="category"
                type="radio"
                className="form-control custom-control-input"
                onChange={this.handleChange}
                required
              />

              <label className="custom-control-label" htmlFor={item.id}>
                {item.text}
              </label>

              {this.props.items.length - 1 === Number.parseInt(item.id) && (
                <div className="invalid-feedback" stylename="width: 100%">
                  {this.props.invalidMessage}
                </div>
              )}
            </div>
          ))}
        </div>
        <hr className="mb-4" />
      </React.Fragment>
    );
  }
}

export default InputCategory;
