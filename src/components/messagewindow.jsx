import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

class MessageWindow extends Component {
  state = {
    //modal: this.props.modal,
    backdrop: true,
    size: "lg"
  };

  // toggle = () => this.setState({
  //   modal: !this.props.modal
  // });

  handleModalToggle = () => {
    this.props.handleModal();
  };

  render() {
    return (
      <div>
        {/* <a href="#" onClick={this.toggle}>подробнее</a> */}
        <Modal
          //isOpen={this.state.modal}
          isOpen={this.props.modal}
          toggle={this.handleModalToggle}
          className={this.props.className}
          backdrop={this.state.backdrop}
          size={this.state.size}
        >
          <ModalHeader toggle={this.handleModalToggle}>{this.props.title}</ModalHeader>
          <ModalBody>
            {/* {this.props.textPD} */}
            <div dangerouslySetInnerHTML={{ __html: this.props.text }} />
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.handleModalToggle}>
              Закрыть
          </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default MessageWindow;
