import React, { Component } from "react";
import InputEmail from "./inputemail";
import InputSendBtn from "./inputsendbtn";
import InputFullname from "./inputfullname";
import { Form, Col, Row } from "reactstrap";
import InputCategory from "./inputcategory";
import InputCaptcha from "./inputcaptcha";
import TextareaMessage from "./textareamessage";
import AttachmentList from "./attachments";

class FeedbackForm extends Component {
  form = React.createRef();
  attachList = React.createRef();

  state = {
    fullName: "",
    email: "",
    category: "",
    message: "",
    checkCode: "",
    validate: {
      fullname: false,
      email: false,
      category: false,
      message: false,
      checkCode: false
    }
  };

  handleChanges = e => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
    // remove form's top validated style
    this.form.current.classList.remove("was-validated");
  };

  handleSubmit = e => {
    e.preventDefault();
    const isValid =
      !Object.values(this.state.validate).includes(false) &&
      this.attachList.current.isValid();

    if (isValid) {
      this.props.onSubmit(e.target);
    } else {
      e.target.classList.add("was-validated");
    }
  };

  handleValidate = (param, isValid) => {
    let validate = { ...this.state.validate };
    validate[param] = isValid;
    this.setState({ validate: validate });
  };

  render() {
    const i18n = this.props.i18n;
    return (
      <Form noValidate onSubmit={this.handleSubmit} innerRef={this.form}>
        <Row>
          <AttachmentList
            ref={this.attachList}
            caption={i18n.attachmentList.caption}
            btnlabel={i18n.attachmentList.addAttachment.label}
            totalLabel={i18n.attachmentList.total}
            maxFiles={i18n.attachmentList.maxFiles}
            maxTotalFileSizeMb={i18n.attachmentList.maxTotalFileSizeMb}
            invalidTotalFileSize={
              i18n.attachmentList.validation.maxTotalFileSizeMb
            }
            invalidFilesCount={i18n.attachmentList.validation.maxFiles}
          />
          <Col md={{ size: 8, order: 1 }}>
            <h4 className="mb-3">{i18n.formCaption}</h4>
            <InputFullname
              value={this.state.fullname}
              onValidate={isValid => this.handleValidate("fullname", isValid)}
              onChange={this.handleChanges}
              label={i18n.formFields.fullName.label}
              placeholder={i18n.formFields.fullName.placeholder}
              invalidMessage={i18n.formFields.fullName.validation.emptyValue}
              minLen={i18n.formFields.fullName.validation.minLen}
            />
            <InputEmail
              value={this.state.email}
              onValidate={isValid => this.handleValidate("email", isValid)}
              onChange={this.handleChanges}
              label={i18n.formFields.email.label}
              placeholder={i18n.formFields.email.placeholder}
              invalidMessage={i18n.formFields.email.validation.emptyValue}
            />
            <InputCategory
              onValidate={isValid => this.handleValidate("category", isValid)}
              onChange={this.handleChanges}
              items={i18n.formFields.category.items}
              label={i18n.formFields.category.label}
              invalidMessage={i18n.formFields.category.validation.emptyValue}
            />
            <TextareaMessage
              value={this.state.message}
              onChange={this.handleChanges}
              onValidate={isValid => this.handleValidate("message", isValid)}
              label={i18n.formFields.message.label}
              placeholder={i18n.formFields.message.placeholder}
              invalidMessage={i18n.formFields.message.validation.emptyValue}
              minLen={i18n.formFields.message.validation.minLen}
            />
            <InputCaptcha
              value={this.state.checkCode}
              onChange={this.handleChanges}
              onValidate={isValid => this.handleValidate("checkCode", isValid)}
              placeholder={i18n.formFields.captcha.label}
              invalidMessage={
                i18n.formFields.captcha.validation.emptyOrIncorrect
              }
            />
            <InputSendBtn caption={i18n.formFields.btnSend.caption} />
          </Col>
        </Row>
      </Form>
    );
  }
}
export default FeedbackForm;
