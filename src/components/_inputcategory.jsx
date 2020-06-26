import React from "react";
import InputComponent from "./inputcomponent";

class InputCategory extends InputComponent {
  handleChange = e => {
    // fire the form change event
    this.props.onChange(e);
    //this.validateValue();
  };

  // validateValue = () => {
  //   this.props.onValidate(true);
  // };

  render() {
    return (
      <React.Fragment>
        <div className="d-block my-3">
          <div className="custom-control custom-switch">
            <input
              id="category"
              name="category"
              type="checkbox"
              checked={this.props.value}
              className="form-control custom-control-input"
              onChange={this.handleChange}
            />
            <label className="custom-control-label" htmlFor="category">
              {this.props.label}
            </label>
          </div>
          {/* <div className="text-muted">
            {this.props.infoMessage}
          </div> */}
        </div>
      </React.Fragment>
    );
  }
}

export default InputCategory;
