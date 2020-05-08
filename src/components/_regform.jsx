import React, { Component } from "react";
import InputEmail from "./_inputemail";
import InputSendBtn from "./inputsendbtn";
import InputFullname from "./_inputfullname";
import InputShortname from "./_inputshortname";
import InputKpp from "./_inputkpp";
import InputInn from "./_inputinn";
import InputOgrn from "./_inputogrn";
import InputOktmo from "./_inputoktmo";
import InputEgrul from "./_inputegrul";
import InputToken from "./_inputtoken";
import InputEngName from "./_inputnameeng";
import InputAdress from "./_inputadress";
import InputAdressEng from "./_inputadresseng";

import { Form, Col, Row, Card, CardBody } from "reactstrap";
import InputCategory from "./_inputcategory";
import InputCaptcha from "./inputcaptcha";
//import TextareaMessage from "./textareamessage";
//import AttachmentList from "./attachments";

class RegForm extends Component {
  form = React.createRef();
  //attachList = React.createRef();

  state = {
    email: "",
    category: "",
    //message: "",
    checkCode: "",
    token: "",

    fullName: "",
    shortName: "",
    kpp: "",
    inn: "",
    ogrn: "",
    oktmo: "",
    egrul: "",
    engName: "",
    adress: "",
    adressEng: "",
    
    validate: {
      category: false,
      email: false,
      //checkCode: false
      //message: false,
      
    },
    validateRez: {
      fullname: false,
      shortName: false,
      kpp: false,
      inn: false,
      ogrn: false,
      oktmo: false,
      egrul: false
    },
    validateNoRez: {
      engName: false,
      adress: false,
      adressEng: false
    },

    resident: true
  };

  handleChanges = e => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });

    //hide other fields
    if (name === "category") {
      if (value === "0") {
        this.setState({ resident: true })
      } else {
        this.setState({ resident: false })
      }
    }
    // remove form's top validated style
    this.form.current.classList.remove("was-validated");
  };

  handleSubmit = e => {
    e.preventDefault();
    // const isValid =
    //   !Object.values(this.state.validate).includes(false) &&
    //   this.attachList.current.isValid();
    console.log("handleSubmit validate ", this.state);

    let isValid;
    if (this.state.category === "0") {
      isValid = !Object.values(this.state.validate).includes(false) && !Object.values(this.state.validateRez).includes(false);
    } else if (this.state.category === "1") {
      isValid = !Object.values(this.state.validate).includes(false) && !Object.values(this.state.validateNoRez).includes(false);
    } else {
      isValid = false;
    }

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

  handleValidateRez = (param, isValid) => {
    let validate = { ...this.state.validateRez };
    validate[param] = isValid;
    this.setState({ validateRez: validate });
  };

  handleValidateNoRez = (param, isValid) => {
    let validate = { ...this.state.validateNoRez };
    validate[param] = isValid;
    this.setState({ validateNoRez: validate });
  };

  render() {
    const i18n = this.props.i18n;

    return (
      <Form noValidate onSubmit={this.handleSubmit} innerRef={this.form}>
        <Row>
          {/* <AttachmentList
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
          /> */}
          <Col md={{ size: 12, order: 1 }}>

            <Card body>

              <CardBody>

                <InputCategory
                  onValidate={isValid => this.handleValidate("category", isValid)}
                  onChange={this.handleChanges}
                  items={i18n.formFields.category.items}
                  label={i18n.formFields.category.label}
                  invalidMessage={i18n.formFields.category.validation.emptyValue}
                />

                <div id="resident-info" className={this.state.resident ? '' : 'hidden'}>
                  <InputFullname
                    value={this.state.fullname}
                    onValidate={isValid => this.handleValidateRez("fullname", isValid)}
                    onChange={this.handleChanges}
                    label={i18n.formFields.fullName.label}
                    placeholder={i18n.formFields.fullName.placeholder}
                    invalidMessage={i18n.formFields.fullName.validation.emptyValue}
                    minLen={i18n.formFields.fullName.validation.minLen}
                  />

                  <InputShortname
                    value={this.state.shortName}
                    onValidate={isValid => this.handleValidateRez("shortName", isValid)}
                    onChange={this.handleChanges}
                    label={i18n.formFields.shortName.label}
                    placeholder={i18n.formFields.shortName.placeholder}
                    invalidMessage={i18n.formFields.shortName.validation.emptyValue}
                    minLen={i18n.formFields.shortName.validation.minLen}
                  />

                  <InputKpp
                    value={this.state.kpp}
                    onValidate={isValid => this.handleValidateRez("kpp", isValid)}
                    onChange={this.handleChanges}
                    label={i18n.formFields.kpp.label}
                    placeholder={i18n.formFields.kpp.placeholder}
                    invalidMessage={i18n.formFields.kpp.validation.emptyValue}
                    minLen={i18n.formFields.kpp.validation.minLen}
                    maxLen={i18n.formFields.kpp.validation.maxLen}
                  />

                  <InputInn
                    value={this.state.inn}
                    onValidate={isValid => this.handleValidateRez("inn", isValid)}
                    onChange={this.handleChanges}
                    label={i18n.formFields.inn.label}
                    placeholder={i18n.formFields.inn.placeholder}
                    invalidMessage={i18n.formFields.inn.validation.emptyValue}
                    minLen={i18n.formFields.inn.validation.minLen}
                    maxLen={i18n.formFields.inn.validation.maxLen}
                  />

                  <InputOgrn
                    value={this.state.ogrn}
                    onValidate={isValid => this.handleValidateRez("ogrn", isValid)}
                    onChange={this.handleChanges}
                    label={i18n.formFields.ogrn.label}
                    placeholder={i18n.formFields.ogrn.placeholder}
                    invalidMessage={i18n.formFields.ogrn.validation.emptyValue}
                    minLen={i18n.formFields.ogrn.validation.minLen}
                    maxLen={i18n.formFields.ogrn.validation.maxLen}
                  />

                  <InputOktmo
                    value={this.state.oktmo}
                    onValidate={isValid => this.handleValidateRez("oktmo", isValid)}
                    onChange={this.handleChanges}
                    label={i18n.formFields.oktmo.label}
                    placeholder={i18n.formFields.oktmo.placeholder}
                    invalidMessage={i18n.formFields.oktmo.validation.emptyValue}
                    minLen={i18n.formFields.oktmo.validation.minLen}
                    maxLen={i18n.formFields.oktmo.validation.maxLen}
                  />

                  <InputEgrul
                    value={this.state.egrul}
                    onValidate={isValid => this.handleValidateRez("egrul", isValid)}
                    onChange={this.handleChanges}
                    label={i18n.formFields.egrul.label}
                    placeholder={i18n.formFields.egrul.placeholder}
                    invalidMessage={i18n.formFields.egrul.validation.emptyValue}
                    minLen={i18n.formFields.egrul.validation.minLen}
                    maxLen={i18n.formFields.egrul.validation.maxLen}
                  />

                </div>

                <div id="no-resident-info" className={this.state.resident ? 'hidden' : ''}>
                  <InputEngName
                    value={this.state.engName}
                    onValidate={isValid => this.handleValidateNoRez("engName", isValid)}
                    onChange={this.handleChanges}
                    label={i18n.formFields.engName.label}
                    placeholder={i18n.formFields.engName.placeholder}
                    invalidMessage={i18n.formFields.engName.validation.emptyValue}
                    minLen={i18n.formFields.engName.validation.minLen}
                  />

                  <InputAdress
                    value={this.state.adress}
                    onValidate={isValid => this.handleValidateNoRez("adress", isValid)}
                    onChange={this.handleChanges}
                    label={i18n.formFields.adress.label}
                    placeholder={i18n.formFields.adress.placeholder}
                    invalidMessage={i18n.formFields.adress.validation.emptyValue}
                    minLen={i18n.formFields.adress.validation.minLen}
                  />

                  <InputAdressEng
                    value={this.state.adressEng}
                    onValidate={isValid => this.handleValidateNoRez("adressEng", isValid)}
                    onChange={this.handleChanges}
                    label={i18n.formFields.adressEng.label}
                    placeholder={i18n.formFields.adressEng.placeholder}
                    invalidMessage={i18n.formFields.adressEng.validation.emptyValue}
                    minLen={i18n.formFields.adressEng.validation.minLen}
                  />
                </div>

                <InputToken
                    value={this.state.token}
                    onValidate={isValid => this.handleValidate("token", isValid)}
                    onChange={this.handleChanges}
                    label={i18n.formFields.token.label}
                    placeholder={i18n.formFields.token.placeholder}
                    invalidMessage={i18n.formFields.token.validation.emptyValue}
                    minLen={i18n.formFields.token.validation.minLen}
                    maxLen={i18n.formFields.token.validation.maxLen}
                  />

                <InputEmail
                  value={this.state.email}
                  onValidate={isValid => this.handleValidate("email", isValid)}
                  onChange={this.handleChanges}
                  label={i18n.formFields.email.label}
                  placeholder={i18n.formFields.email.placeholder}
                  invalidMessage={i18n.formFields.email.validation.emptyValue}
                />

                {/* <TextareaMessage
                            value={this.state.message}
                            onChange={this.handleChanges}
                            onValidate={isValid => this.handleValidate("message", isValid)}
                            label={i18n.formFields.message.label}
                            placeholder={i18n.formFields.message.placeholder}
                            invalidMessage={i18n.formFields.message.validation.emptyValue}
                            minLen={i18n.formFields.message.validation.minLen}
                          /> */}

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
              </CardBody>

              {/* <Button>Go somewhere</Button> */}
            </Card>

          </Col>
        </Row>
      </Form>
    );
  }
}
export default RegForm;
