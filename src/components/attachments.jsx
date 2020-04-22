import React, { Component } from "react";
import { Row, Col, Button, Badge } from "reactstrap";

class Attachments extends Component {
  fileRef = React.createRef();

  state = {
    files: [],
    validationMessage: undefined,
    isValid: true
  };

  handleChange = e => {
    const MAX_TOTAL_SIZE = this.props.maxTotalFileSizeMb * 1000 * 1000;
    const MAX_FILES = this.props.maxFiles;
    const fileElem = e.target;
    const fileArray = [];

    let result = true;
    let validationMessage = undefined;

    let totalSize = 0;
    for (let i = 0; i < fileElem.files.length; i++) {
      totalSize += fileElem.files[i].size;
      fileArray.push(fileElem.files[i]);
    }

    if (fileElem.files.length > MAX_FILES) {
      validationMessage = this.props.invalidFilesCount;
      result = false;
    } else if (totalSize > MAX_TOTAL_SIZE) {
      validationMessage = this.props.invalidTotalFileSize;
      result = false;
    }

    this.setState({
      files: fileArray,
      validationMessage: validationMessage,
      isValid: result
    });
  };

  isValid() {
    return this.state.isValid;
  }
  getMessage() {
    return this.state.validationMessage;
  }

  formatFileSize(file) {
    let s = file.size / 1000000;
    return s.toFixed(3);
  }

  contentSize = () => {
    const files = this.state.files;
    let result = 0;

    if (files.length > 1) {
      result = files
        .map(item => item.size)
        .reduce((total, current) => total + current);
    } else if (files.length === 1) {
      result = files[0].size;
    }

    return result;
  };

  formatTotalSize = () => {
    const size = this.contentSize();
    if (size === 0) return "0 Mb";
    else return (this.contentSize() / 1000000).toFixed(2) + " Mb";
  };

  render() {
    return (
      <div className="col-md-4 order-md-2 mb-4">
        <h4 className="d-flex justify-content-between align-items-center mb-3">
          <span className="text-muted">{this.props.caption}</span>
          <Badge color="secondary" pill>
            {this.state.files.length}
          </Badge>
        </h4>
        {this.fileList()}
        {this.btnAttachment()}
      </div>
    );
  }

  fileList() {
    const message = this.state.validationMessage;
    return (
      <React.Fragment>
        <ul className="list-group mb-3">
          {this.state.files.map(file => (
            <li
              key={file.name}
              className={
                message
                  ? "list-group-item list-group-item-danger d-flex justify-content-between lh-condensed"
                  : "list-group-item d-flex justify-content-between lh-condensed"
              }
            >
              <div>
                <h6 className="my-0">{file.name}</h6>
                <small className="text-muted">{file.type}</small>
              </div>
              <div className="text-muted">
                <img
                  width="35px"
                  src={window.URL.createObjectURL(file)}
                  alt="file"
                />
                <span className="mx-3">{this.formatFileSize(file)}</span>
              </div>
            </li>
          ))}
          <li
            className={
              message === this.props.invalidTotalFileSize
                ? "list-group-item d-flex list-group-item-danger justify-content-between"
                : "list-group-item d-flex justify-content-between"
            }
          >
            <span>{this.props.totalLabel}</span>
            <strong>{this.formatTotalSize()}</strong>
          </li>
        </ul>
        {this.showValidationMessage(message)}
      </React.Fragment>
    );
  }

  showValidationMessage(message) {
    if (message !== "")
      return (
        <div className="row">
          <div className="col mb-3">
            <div className="float-right">
              <div className="invalid-attachments" stylename="width: 100%">
                {message}
              </div>
            </div>
          </div>
        </div>
      );
  }

  btnAttachment() {
    return (
      <Row>
        <input
          type="file"
          name="file"
          id="inputfile"
          accept="image/*"
          multiple
          style={{ display: "none" }}
          ref={this.fileRef}
          onChange={this.handleChange}
        />
        <Col className="float-right">
          <Button
            color="secondary"
            onClick={e => {
              this.fileRef.current.click();
            }}
          >
            {this.props.btnlabel}
          </Button>
        </Col>
      </Row>
    );
  }
}

export default Attachments;
