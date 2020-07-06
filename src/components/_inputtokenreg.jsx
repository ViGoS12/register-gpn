import React from "react";
import InputComponent from "./inputcomponent";
//import { UncontrolledPopover, PopoverHeader, PopoverBody } from 'reactstrap';

class InputTokenRegCheckbox extends InputComponent {
  handleChange = e => {
    // fire the form change event
    this.props.onChange(e);
    //this.validateValue();
  };

  // validateValue = () => {
  //   this.props.onValidate(true);
  // };

  handleModalToggle = () => {
    this.props.handleModal(this.props.modalTitle,this.props.modalText);
  };

  render() {
    return (
      <React.Fragment>
        <div className="d-block my-3">
            <div className="custom-control custom-switch">
              <input
                id="tokenReg"
                name="tokenReg"
                type="checkbox"
                checked={this.props.value}
                className="form-control custom-control-input"
                onChange={this.handleChange}
              />

              <label className="custom-control-label" htmlFor="tokenReg">
                {this.props.label}
              </label>

              {". "}
              <a href="javascript:void(null);" onClick={this.handleModalToggle}>{this.props.aboutLink}</a>
    
            </div>
          
          {/* <div className="text-muted">
            {this.props.infoMessage}
          </div> */}
        </div>
      </React.Fragment>
    );
  }
}

export default InputTokenRegCheckbox;
