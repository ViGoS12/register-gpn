import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

class MessageWindow extends Component {
  state = {};
  render() {
    return (
      <Modal
        isOpen={this.state.modal}
        toggle={this.toggle}
        className={this.props.className}
        backdrop={this.state.backdrop}
      >
        <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
        <ModalBody>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.toggle}>
            Do Something
          </Button>{" "}
          <Button color="secondary" onClick={this.toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default MessageWindow;
