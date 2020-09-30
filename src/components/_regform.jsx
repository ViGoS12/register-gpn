import React, { Component } from "react";

import { Form, Col, Row, Card, CardBody } from "reactstrap";
import InputEmail from "./_inputemail";
import InputSendBtn from "./inputsendbtn";
import InputFullname from "./_inputfullname";
import InputShortname from "./_inputshortname";
import InputKpp from "./_inputkpp";
import InputInn from "./_inputinn";
//import InputOgrn from "./_inputogrn";
//import InputOktmo from "./_inputoktmo";
//import InputEgrul from "./_inputegrul";
import InputTokenRegCheckbox from "./_inputtokenreg";
//import InputCheckList from "./_inputchecklist";
import InputToken from "./_inputtoken";
import InputEmailOrg from "./_inputemailorg";
import InputPhoneOrg from "./_inputphoneorg";
import InputRegNum from "./_inputregnum";
import InputUserName from "./_inputusername";
import InputSecondName from "./_inputusersecondname";
import InputUserSurname from "./_inputusershurname";
import InputCategory from "./_inputcategory";
import InputIP from "./_inputip";
import Inputcheckpersdata from "./_inputcheckpersdata";
import InputCaptcha from "./inputcaptcha";
import MessageWindow from "./messagewindow";
//import TextareaMessage from "./textareamessage";
//import AttachmentList from "./attachments";

class RegForm extends Component {
  form = React.createRef();
  //attachList = React.createRef();

  state = {
    category: false,
    ip: false,
    tokenReg: false,
    modal: false,
    token: "",
    checkedItems: new Map(),
    //user
    email: "",
    userName: "",
    userSecondName: "",
    userSurname: "",
    checkpersdata: "",
    //org
    fullName: "",
    shortName: "",
    kpp: "",
    inn: "",
    innMaxLen: 10,
    //ogrn: "",
    //oktmo: "",
    emailOrg: "",
    phoneOrg: "",
    regNum: "",
    //engName: "",
    //adress: "",
    //adressEng: "",
    // data
    checkCode: "",
    captchaUrl: "/NDI_EPCOMMON_D~gzpn~regform~service~rs~gazprom-neft.ru/rs/regform/captcha",
    //message: "",

    validate: {
      userName: false,
      userSecondName: false,
      userSurname: false,
      email: false,
      fullname: false,
      shortName: false,
      kpp: false,
      inn: false,
      //ogrn: false,
      //oktmo: false,
      //engName: false,
      //adress: false,
      //adressEng: false
      regNum: false,
      phoneOrg: false,
      emailOrg: false,

      token: false,
      checkpersdata: false,
      checkCode: true   //false чтоб вкл капчку
      //message: false,
    }
  };

  // handle input states
  handleChanges = e => {
    const target = e.target;
    const name = target.name;
    //const value = target.type === 'checkbox' ? target.checked : target.value;
    if (target.title === 'function') {
      const item = target.name;
      const isChecked = target.checked;
      this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(item, isChecked) }));
    } else {
      const value = target.type === 'checkbox' ? target.checked : target.value;
      // inn lenght
      if (target.name === 'ip') {
        if (target.checked) {
          this.setState({ innMaxLen: 12 });
        } else {
          this.setState({ innMaxLen: 10 });
        }
      }
      this.setState({
        [name]: value
      });
    }

    // remove form's top validated style
    this.form.current.classList.remove("was-validated");
  };

  //modal show-hide
  handleModal = (title, text) => {
    this.setState({
      modal: !this.state.modal,
      title: title,
      text: text
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    // const isValid =
    //   !Object.values(this.state.validate).includes(false) &&
    //   this.attachList.current.isValid();
    console.log("handleSubmit validate ", this.state);

    let isValid;
    // let UserValid = ["userName", "userSecondName", "userSurname", "email", "checkpersdata"];
    // let RezValid = ["fullname", "shortName", "kpp", "inn","ogrn","oktmo","phoneOrg","emailOrg"];
    // let NoRezValid = ["fullname", "shortName", "regNum", "phoneOrg","emailOrg"];

    if (
      this.state.validate.userName &&
      this.state.validate.userSecondName &&
      this.state.validate.userSurname &&
      this.state.validate.email &&
      this.state.validate.checkpersdata &&
      this.state.validate.checkCode
    ) {
      if (this.state.tokenReg) {
        if (this.state.validate.token) {
          isValid = true
        } else {
          isValid = false
        }
      } else {
        // check rezident or Noresident fields
        if (this.state.category) {
          if (
            this.state.validate.fullname &&
            this.state.validate.shortName &&
            this.state.validate.regNum &&
            this.state.validate.phoneOrg &&
            this.state.validate.emailOrg
          ) {
            isValid = true
          } else {
            isValid = false
          }
        } else {
          if (
            this.state.validate.fullname &&
            this.state.validate.shortName &&
            (this.state.ip || this.state.validate.kpp) &&
            this.state.validate.inn &&
            //this.state.validate.ogrn &&
            //this.state.validate.oktmo &&
            this.state.validate.phoneOrg &&
            this.state.validate.emailOrg
          ) {
            isValid = true
          } else {
            isValid = false
          }
        }
      }
    } else {
      isValid = false
    }

    // submit
    if (isValid) {
      this.props.onSubmit(e.target);
      // captha disable
      //this.setState({checkCode: ""});
      //this.handleValidate ("checkCode", false);
      this.setState({
        captchaUrl: this.state.captchaUrl + "?t=" + new Date().getTime()
      });
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
    let i18n = this.props.i18n;
    //let funcData = this.props.funcData;

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
          <Col md={{ size: 12, order: 1 }} className="mt-3">

            <Card body style={{ marginBottom: '1rem' }} >

              <CardBody>

                <h5 className="mb-3">{i18n.userHeader}</h5>

                <InputUserName
                  value={this.state.userName}
                  onValidate={isValid => this.handleValidate("userName", isValid)}
                  onChange={this.handleChanges}
                  label={i18n.formFields.userName.label}
                  placeholder={i18n.formFields.userName.placeholder}
                  invalidMessage={i18n.formFields.userName.validation.emptyValue}
                  minLen={i18n.formFields.userName.validation.minLen}
                />

                <InputSecondName
                  value={this.state.userSecondName}
                  onValidate={isValid => this.handleValidate("userSecondName", isValid)}
                  onChange={this.handleChanges}
                  label={i18n.formFields.userSecondName.label}
                  placeholder={i18n.formFields.userSecondName.placeholder}
                  invalidMessage={i18n.formFields.userSecondName.validation.emptyValue}
                  minLen={i18n.formFields.userSecondName.validation.minLen}
                />

                <InputUserSurname
                  value={this.state.userSurname}
                  onValidate={isValid => this.handleValidate("userSurname", isValid)}
                  onChange={this.handleChanges}
                  label={i18n.formFields.userSurname.label}
                  placeholder={i18n.formFields.userSurname.placeholder}
                  invalidMessage={i18n.formFields.userSurname.validation.emptyValue}
                  minLen={i18n.formFields.userSurname.validation.minLen}
                />

                <InputEmail
                  value={this.state.email}
                  onValidate={isValid => this.handleValidate("email", isValid)}
                  onChange={this.handleChanges}
                  label={i18n.formFields.email.label}
                  placeholder={i18n.formFields.email.placeholder}
                  invalidMessage={i18n.formFields.email.validation.emptyValue}
                />

                <h5 className="mb-3 mt-5" >{i18n.organizationHeader}</h5>

                <InputCategory
                  //onValidate={isValid => this.handleValidate("category", isValid)}
                  value={this.state.category}
                  onChange={this.handleChanges}
                  label={i18n.formFields.category.label}
                  invalidMessage={i18n.formFields.category.validation.emptyValue}
                  infoMessage={i18n.formFields.category.infoMessage}
                />

                <InputIP
                  value={this.state.ip}
                  onChange={this.handleChanges}
                  label={i18n.formFields.ip.label}
                  invalidMessage={i18n.formFields.ip.validation.emptyValue}
                  infoMessage={i18n.formFields.ip.infoMessage}
                />

                <InputTokenRegCheckbox
                  value={this.state.tokenReg}
                  onChange={this.handleChanges}
                  label={i18n.formFields.tokenReg.label}
                  handleModal={this.handleModal}
                  modalTitle={i18n.formFields.tokenReg.modal.title}
                  modalText={i18n.formFields.tokenReg.modal.text}
                  aboutLink={i18n.formFields.tokenReg.aboutLink}
                />

                {/* <InputCheckList
                  items={funcData.items}
                  checkedItems={this.state.checkedItems}
                  onChange={this.handleChanges}
                  label={funcData.label}
                  invalidMessage={funcData.validation.emptyValue}
                  infoMessage={funcData.infoMessage}
                /> */}

                <div id="if-no-token" className={this.state.tokenReg ? 'hidden' : ''}>

                  <InputFullname
                    value={this.state.fullname}
                    onValidate={isValid => this.handleValidate("fullname", isValid)}
                    onChange={this.handleChanges}
                    label={i18n.formFields.fullName.label}
                    placeholder={i18n.formFields.fullName.placeholder}
                    invalidMessage={i18n.formFields.fullName.validation.emptyValue}
                    minLen={i18n.formFields.fullName.validation.minLen}
                  />

                  <InputShortname
                    value={this.state.shortName}
                    onValidate={isValid => this.handleValidate("shortName", isValid)}
                    onChange={this.handleChanges}
                    label={i18n.formFields.shortName.label}
                    placeholder={i18n.formFields.shortName.placeholder}
                    invalidMessage={i18n.formFields.shortName.validation.emptyValue}
                    minLen={i18n.formFields.shortName.validation.minLen}
                  />

                  <div id="resident-info" className={this.state.category ? 'hidden' : ''}>

                    <InputInn
                      value={this.state.inn}
                      onValidate={isValid => this.handleValidate("inn", isValid)}
                      onChange={this.handleChanges}
                      label={i18n.formFields.inn.label}
                      placeholder={i18n.formFields.inn.placeholder}
                      invalidMessage={i18n.formFields.inn.validation.emptyValue}
                      minLen={i18n.formFields.inn.validation.minLen}
                      maxLen={this.state.innMaxLen}
                    />

                    <div className={this.state.ip ? 'hidden' : ''}>
                      <InputKpp
                        value={this.state.kpp}
                        onValidate={isValid => this.handleValidate("kpp", isValid)}
                        onChange={this.handleChanges}
                        label={i18n.formFields.kpp.label}
                        placeholder={i18n.formFields.kpp.placeholder}
                        invalidMessage={i18n.formFields.kpp.validation.emptyValue}
                        minLen={i18n.formFields.kpp.validation.minLen}
                        maxLen={i18n.formFields.kpp.validation.maxLen}
                      />
                    </div>

                    {/* <InputOktmo
                      value={this.state.oktmo}
                      onValidate={isValid => this.handleValidate("oktmo", isValid)}
                      onChange={this.handleChanges}
                      label={i18n.formFields.oktmo.label}
                      placeholder={i18n.formFields.oktmo.placeholder}
                      invalidMessage={i18n.formFields.oktmo.validation.emptyValue}
                      minLen={i18n.formFields.oktmo.validation.minLen}
                      maxLen={i18n.formFields.oktmo.validation.maxLen}
                    /> */}

                    {/* <InputOgrn
                      value={this.state.ogrn}
                      onValidate={isValid => this.handleValidate("ogrn", isValid)}
                      onChange={this.handleChanges}
                      label={i18n.formFields.ogrn.label}
                      placeholder={i18n.formFields.ogrn.placeholder}
                      invalidMessage={i18n.formFields.ogrn.validation.emptyValue}
                      minLen={i18n.formFields.ogrn.validation.minLen}
                      maxLen={i18n.formFields.ogrn.validation.maxLen}
                    /> */}

                  </div>
                  {/* resident-info */}

                  <div id="no-resident-info" className={this.state.category ? '' : 'hidden'}>
                    <InputRegNum
                      value={this.state.regNum}
                      onValidate={isValid => this.handleValidate("regNum", isValid)}
                      onChange={this.handleChanges}
                      label={i18n.formFields.regNum.label}
                      placeholder={i18n.formFields.regNum.placeholder}
                      invalidMessage={i18n.formFields.regNum.validation.emptyValue}
                      minLen={i18n.formFields.regNum.validation.minLen}
                    />
                  </div>

                  <InputPhoneOrg
                    value={this.state.phoneOrg}
                    onValidate={isValid => this.handleValidate("phoneOrg", isValid)}
                    onChange={this.handleChanges}
                    label={i18n.formFields.phoneOrg.label}
                    placeholder={i18n.formFields.phoneOrg.placeholder}
                    invalidMessage={i18n.formFields.phoneOrg.validation.emptyValue}
                    minLen={i18n.formFields.phoneOrg.validation.minLen}
                  />

                  <InputEmailOrg
                    value={this.state.emailOrg}
                    onValidate={isValid => this.handleValidate("emailOrg", isValid)}
                    onChange={this.handleChanges}
                    label={i18n.formFields.emailOrg.label}
                    placeholder={i18n.formFields.emailOrg.placeholder}
                    invalidMessage={i18n.formFields.emailOrg.validation.emptyValue}
                  />

                </div>
                {/* if-no-token */}

                <InputToken
                  value={this.state.token}
                  required={this.state.tokenReg}
                  shouldHide={!this.state.tokenReg}
                  onValidate={isValid => this.handleValidate("token", isValid)}
                  onChange={this.handleChanges}
                  label={i18n.formFields.token.label}
                  placeholder={i18n.formFields.token.placeholder}
                  invalidMessage={i18n.formFields.token.validation.emptyValue}
                  minLen={i18n.formFields.token.validation.minLen}
                  maxLen={i18n.formFields.token.validation.maxLen}
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

                <hr className="mt-4" />

                <Inputcheckpersdata
                  onValidate={isValid => this.handleValidate("checkpersdata", isValid)}
                  onChange={this.handleChanges}
                  items={i18n.formFields.checkpersdata.items}
                  label={i18n.formFields.checkpersdata.label}
                  invalidMessage={i18n.formFields.checkpersdata.validation.emptyValue}
                  infoMessage={i18n.formFields.checkpersdata.infoMessage}
                  handleModal={this.handleModal}
                  modalText={i18n.formFields.checkpersdata.textPD}
                  modalTitle={i18n.formFields.checkpersdata.placeholder}
                  aboutLink={i18n.formFields.checkpersdata.aboutLink}
                />

                <MessageWindow
                  className="classModal"
                  modal={this.state.modal}
                  handleModal={this.handleModal}
                  title={this.state.title}
                  text={this.state.text}
                />

                <InputCaptcha
                  value={this.state.checkCode}
                  onChange={this.handleChanges}
                  onValidate={isValid => this.handleValidate("checkCode", isValid)}
                  placeholder={i18n.formFields.captcha.label}
                  src={this.state.captchaUrl}
                  invalidMessage={
                    i18n.formFields.captcha.validation.emptyOrIncorrect
                  }
                />

                <InputSendBtn caption={i18n.formFields.btnSend.caption} />

              </CardBody>
            </Card>

            {/* <Card body>
            <CardTitle>Контактные данные</CardTitle>
            <CardBody>
            </CardBody>
            </Card> */}

          </Col>
        </Row>
      </Form>
    );
  }
}
export default RegForm;
