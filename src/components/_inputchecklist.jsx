import React from "react";
import InputComponent from "./inputcomponent";

class InputCheckList extends InputComponent {
  handleChange = e => {
    // fire the form change event
    this.props.onChange(e);
    //this.validateValue();
  };

  validateValue = () => {
    this.props.onValidate(true);
  };

  render() {
    return (
      <React.Fragment>
        <div className="d-block my-3">
          <label>{this.props.label}</label>
          {this.props.items.map(item => (
            <div key={item.id} className="custom-control custom-switch">
              {/* checked={item.checked} */}
              <input
                id={item.id}
                name={item.id}
                type="checkbox"
                title="function"
                checked={this.props.checkedItems.get(item.id) ? this.props.checkedItems.get(item.id) : false }

                className="form-control custom-control-input"
                onChange={this.handleChange}
                
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
          {/* <div className="text-muted">
            {this.props.infoMessage}
          </div> */}
        </div>
      </React.Fragment>
    );
  }
}

export default InputCheckList;
