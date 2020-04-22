import React, { Component } from "react";
import { Button } from "reactstrap";

class InputSendBtn extends Component {
  render() {
    return (
      <React.Fragment>
        <Button color="primary" size="lg" block>
          {this.props.caption}
        </Button>
      </React.Fragment>
    );
  }
}

export default InputSendBtn;
