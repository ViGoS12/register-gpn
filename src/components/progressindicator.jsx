import React, { Component } from "react";

class ProgressIndicator extends Component {
  render() {
    return (
      <div className="progress">
        <div
          className="progress-bar progress-bar-striped progress-bar-animated"
          role="progressbar"
          aria-valuenow={this.props.value}
          aria-valuemin="0"
          aria-valuemax="100"
          style={{ width: this.props.value + "%" }}
        />
      </div>
    );
  }
}

export default ProgressIndicator;
