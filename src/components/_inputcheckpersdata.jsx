import React from "react";
import InputComponent from "./inputcomponent";

class Inputcheckpersdata extends InputComponent {

  handleChange = e => {
    // fire the form change event
    this.props.onChange(e);
    this.validateValue(e.target);
  };

  validateValue = input => {
    const checked = input.checked;
    if (checked ){
      this.props.onValidate(true);
    } else {
      this.props.onValidate(false);
    }
  };

  handleModalToggle = () => {
    this.props.handleModal();
  };

  render() {
    return (
      <React.Fragment>
        <div className="d-block my-3">
          {this.props.items.map(item => (
            <div key={item.id} className="custom-control custom-switch">
              {/* checked={item.checked} */}
              <input
                id={item.id}
                key={item.id}
                value={item.id}
                name="checkpersdata"
                type="checkbox"
                checked={this.props.value}
                className="form-control custom-control-input"
                onChange={this.handleChange}
                required
              />

              <label className="custom-control-label" htmlFor={item.id}>
                {item.text}
              </label>
              {". "}
              <a href="javascript:void(null);" onClick={this.handleModalToggle}>Подробнее</a>

              {this.props.items.length - 1 === Number.parseInt(item.id) && (
                <div className="invalid-feedback" stylename="width: 100%">
                  {this.props.invalidMessage}
                </div>
              )}
            </div>
          ))}
          {/* <div className="text-muted">
            {this.props.infoMessage}
          </div> */}
        </div>

      </React.Fragment>
    );
  }
}

export default Inputcheckpersdata;
