import React, { Component } from "react";
import { Spinner, Alert, Button } from "reactstrap";
//import FeedbackForm from "./feedbackform";
import RegForm from "./_regform";
import Backend from "./backend";
import ProgressIndicator from "./progressindicator";
//import { useHistory } from "react-router-dom";

class RegisterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headtext: props.i18n.headText,
      status: undefined,
      progress: undefined,
      httpError: undefined,
      tokenVerified: undefined,
      alertText: undefined,
      alertColor: undefined,
      alertVisible: false,
      hasError: undefined
    }; 
  }

  componentDidMount() {
    // link with token from email
    let search = window.location.search;
    //let path = window.location.pathname;
    let params = new URLSearchParams(search);
    let token = params.get('token');
    console.log(token);

    // ie
    let ie = require("ie-version");
    if (ie.version && ie.version <= 9) {
      this.setState({ status: "oldbrowser" });
    } else if (token) {
      this.verifyToken(token);
      //test pages
      //this.setState({ status: "tokenFromEmailValid" });
      //this.setState({ status: "tokenFromEmailNotValid" });
    } else {
      this.setState({ status: "RegForm" });
    }
  }

  handleSubmit = oForm => {
    const backend = new Backend();
    const url =
      "/NDI_EPCOMMON_D~gzpn~regform~service~rs~gazprom-neft.ru/rs/regform/";
    backend.asyncSubmit(
      oForm,
      url,
      this.handleResponse,
      this.handleProgress,
      this.handleError
    );
  };

  handleResponse = oResponse => {
    console.log("handleResponse", oResponse);

    if (oResponse.response.exceptionMessage) {
      this.setState({
        status: "error",
        alertText: oResponse.response.exceptionMessage,
        alertColor: "danger",
        alertVisible: true
      });
    } else {
      console.log("success", oResponse.response.requestCategory);
      if (oResponse.response.hasError) {
        this.setState({
          status: "error",
          alertText: oResponse.response.requestCategory,
          alertColor: "danger",
          alertVisible: true,
          hasError: oResponse.response.hasError // 0 - 1
        });
      } else {
        this.setState({
          status: "success",
          headtext: oResponse.response.requestCategory,
          alertColor: "success",
          alertVisible: true,
          hasError: oResponse.response.hasError // 0 - 1
        });
      }
    }
  };

  handleProgress = event => {
    console.log("progressEvent", event);
    if (event.lengthComputable) {
      let percentage = Math.round((event.loaded * 100) / event.total);

      this.setState({
        status: "progress",
        progress: percentage,
        httpError: "",
        alertVisible: false
        //headtext: this.props.i18n.progressIndicator.caption
      });
    }
  };

  handleError = httpError => {
    this.setState({
      status: "error",
      httpError: httpError,
      alertText: this.props.i18n.errors[httpError],
      alertColor: "danger",
      alertVisible: true,
      //hasError: 1
    });
  };

  oldBrowser() {
    return (
      <React.Fragment>
        <p className="not-supported">
          Вам необходимо обновить Ваш браузер. Используйте последние версии
          Internet Explorer и Google Chrome.
        </p>
        <p className="not-supported">
          Your need to update your Browser. Use the latest versions of IE and
          Google Chrome.
        </p>
      </React.Fragment>
    );
  };

  verifyToken(sToken) {
    //http://localhost:3000/?token=123
    const backend = new Backend();
    const url =
      "/NDI_EPCOMMON_D~gzpn~regform~service~rs~gazprom-neft.ru/rs/regform/verify";
    backend.asyncSubmitVerifyToken(
      sToken,
      url,
      this.handleResponseTokenVerify,
      this.handleError
    );

    /// GET
    // const backend = new Backend();
    // this.setState({ 
    //     status: "progress"});
    // const xhr = backend.createXHR();

    // xhr.open(
    //   "GET",
    //   "/NDI_EPCOMMON_D~gzpn~regform~service~rs~gazprom-neft.ru/rs/regform/verify?token=" +
    //     sToken,
    //   true
    // );

    // xhr.send();
    // xhr.onreadystatechange = () => {
    //   //let result = false;
    //   console.log(xhr.status);
    //   if (xhr.readyState !== 4) {
    //     return false;
    //   }
    //   if (xhr.status !== 200) {
    //     const oResult = JSON.parse(xhr.responseText);
    //     console.log(oResult);
    //       /// добавить состояние - ошибка
    //       this.setState({ status: "error" });
    //       ////
    //   } else {
    //     const oResult = JSON.parse(xhr.responseText);
    //     console.log(oResult);
    //     console.log("tokenValid= ", oResult.response.tokenValid);

    //     if (oResult.response.tokenValid === true) {
    //       this.setState({ status: "tokenFromEmailValid" });
    //     } else {
    //       this.setState({ status: "tokenFromEmailNotValid" });
    //     }
    //   }
    // };
  };

  handleResponseTokenVerify = oResponse => {
    console.log("handleResponseVerify", oResponse);
    //JSON.parse(oResponse);

    if (oResponse === "NoVerified") {
      this.setState({ 
        status: "tokenFromEmailNotValid"
      });
    } else if (oResponse === "Verified"){
      this.setState({ 
        status: "tokenFromEmailValid"
      });
    } else {
      this.setState({ 
        status: "error",
        headtext: "Error in token verified, unknown response"
      });
    }
  };

  tokenFromEmailValidPage() {
    // let history = useHistory();

    function handleClick() {
      //history.push("/");
      window.location.assign("/NDI_EPCOMMON_D~gzpn~regform~service~rs~gazprom-neft.ru/rs/regform/");
    }
    return (
      <React.Fragment>
        <p className="LinkFromEmailPage">
          <Alert color="success">
            {this.props.i18n.tokenFromEmailValidPage.success}
          </Alert>
          <Button outline color="primary" onClick={handleClick}>Вернуться к форме регистрации</Button>
        </p>
        {/* <p className="LinkFromEmailPage">
          Your account has been succesfully validated.
        </p> */}
      </React.Fragment>
    );
  };

  tokenFromEmailNotValidPage() {
    // let history = useHistory();
    function handleClick() {
      //history.push("/");
      window.location.assign("/NDI_EPCOMMON_D~gzpn~regform~service~rs~gazprom-neft.ru/rs/regform/");
    }
    return (
      <React.Fragment>
        <p className="LinkFromEmailPage">
          <Alert color="danger">
            {this.props.i18n.tokenFromEmailValidPage.error}
          </Alert>
          <Button outline color="primary" onClick={handleClick}>Вернуться к форме регистрации</Button>
        </p>
        {/* <p className="LinkFromEmailPage">
          Your account has been not validated.
        </p> */}
      </React.Fragment>
    );
  };

  // alert dismiss
  onDismissAlert = () => {
    this.setState({
      alertVisible: !this.state.alertVisible
    });
  }

  render() {
    const i18n = this.props.i18n;
    let content = undefined;

    switch (this.state.status) {
      case "error":
        content = <RegForm i18n={i18n} onSubmit={this.handleSubmit}/>;
        break;
      case "success":
        //content = <RegForm i18n={i18n} onSubmit={this.handleSubmit}/>;
        break;
      case "oldbrowser":
        content = this.oldBrowser();
        break;
      case "progress":
        content = <ProgressIndicator value={this.state.progress} />;
        break;
      case "tokenFromEmailValid":
        // переход по ссылке проверки токена - вывод страницы с сообщением
        content = this.tokenFromEmailValidPage();
        break;
      case "tokenFromEmailNotValid":
        // переход по ссылке проверки токена - вывод страницы с сообщением
        content = this.tokenFromEmailNotValidPage();
        break;

      case "RegForm":
        content = <RegForm i18n={i18n} onSubmit={this.handleSubmit} />;
        break;

      default:
        content = <Spinner color="dark" className="spinner" />;
    }

    return (
      <div className="container">
        <div className="pt-5">
          <img
            className="d-block ml-auto mr-0 mb-4"
            src="/NDI_EPCOMMON_D~gzpn~regform~service~rs~gazprom-neft.ru/regform/logo.png"
            //src="../logo.png"
            alt=""
          />
          <h2>{i18n.caption}</h2>
          <p className="lead">{this.state.headtext}</p>
          <Alert color={this.state.alertColor} isOpen={this.state.alertVisible} toggle={this.onDismissAlert}>
              <h4 className={this.state.httpError ? 'alert-heading' : 'alert-heading hidden'} >Ошибка {this.state.httpError}</h4>
              <div dangerouslySetInnerHTML={{ __html: this.state.alertText }} />
          </Alert>
        </div>
        {content}

      </div>
    );
  }
}

export default RegisterPage;
