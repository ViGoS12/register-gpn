import React, { Component } from "react";
import { Spinner, Alert, Button } from "reactstrap";
//import FeedbackForm from "./feedbackform";
import RegForm from "./_regform";
import Backend from "./backend";
import ProgressIndicator from "./progressindicator";
import i18n_en from "../i18n_en.json";
import i18n_ru from "../i18n_ru.json";

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
      hasError: undefined,

      lang: this.props.lang,
      i18n: this.props.i18n
    };

    this.alertRef = React.createRef();
    this.backend = new Backend();
  }

  scrollToMyRef = (myRef) => window.scrollTo(0, myRef.current.offsetTop)

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
        status: "RegForm",
        headtext: "",
        alertText: oResponse.response.exceptionMessage,
        alertColor: "danger",
        alertVisible: true
      });
      this.scrollToMyRef(this.alertRef);
    } else {
      console.log("Ответ сервреа получен ", oResponse.response.requestCategory);
      if (oResponse.response.hasError) {
        console.log("Получено сообщение об ошибке с сервера ", oResponse.response.hasError);
        this.setState({
          status: "RegForm",
          headtext: "",
          alertText: oResponse.response.requestCategory,
          alertColor: "danger",
          alertVisible: true,
          hasError: oResponse.response.hasError // 0 - 1
        });
        this.scrollToMyRef(this.alertRef);
      } else {
        console.log("Получено сообщение об успешной регистрации сервера ", oResponse.response.requestCategory);
        this.setState({
          status: "success",
          headtext: oResponse.response.requestCategory,
          alertText: "",
          alertColor: "success",
          alertVisible: false,
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
        status: "RegForm",
        progress: percentage,
        httpError: "",
        alertVisible: false
        //headtext: this.props.i18n.progressIndicator.caption
      });
    }
  };

  handleError = httpError => {
    this.setState({
      status: "RegForm",
      httpError: httpError,
      //headtext: "",
      alertText: this.props.i18n.errors[httpError],
      alertColor: "danger",
      alertVisible: true,
      //hasError: 1
    });
    this.scrollToMyRef(this.alertRef);
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

  };

  handleResponseTokenVerify = oResponse => {
    console.log("handleResponseVerify", oResponse);
    //JSON.parse(oResponse);
    // {"response":{
    //   "captchaPassed":true,
    //   "requestCategory":"<p>Ссылка для перехода недействительна. Необходимо выполнить повторную регистрацию на ЭТП «Газпромнефть»<\/p> \n ",
    //   "verify":"NoVerified",
    //   "hasError":true}}

    if (oResponse.response.verify === "NoVerified") {
      this.setState({
        status: "tokenFromEmailNotValid",
        alertText: oResponse.response.requestCategory,
        alertColor: "error",
        alertVisible: true,
        hasError: oResponse.response.hasError
      });
    } else if (oResponse.response.verify === "Verified") {
      this.setState({
        status: "tokenFromEmailValid",
        alertText: oResponse.response.requestCategory,
        alertColor: "success",
        alertVisible: true,
        hasError: oResponse.response.hasError
      });
    } else {
      this.setState({
        status: "error",
        alertText: "Error in token verified, unknown response",
        alertVisible: true,
      });
    }
  };

  handleClickBack() {
    window.location.assign("/NDI_EPCOMMON_D~gzpn~regform~service~rs~gazprom-neft.ru/rs/regform/");
  }

  // alert dismiss
  onDismissAlert = () => {
    this.setState({
      alertVisible: !this.state.alertVisible
    });
  }

  changeLang = () => {
    if (this.state.lang === "ru") {
      this.setState({ lang: "en" });
      this.updateI18n("en");
    } else {
      this.setState({ lang: "ru" });
      this.updateI18n("ru");
    }
  }

  updateI18n = (lang) => {
    if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
      //LOCAL
      if (lang === "en") {
        this.setState({ i18n: i18n_en.register });
      } else {
        this.setState({ i18n: i18n_ru.register });
      }
    } else {
      //SERVER
      this.backend.getI18n(
        "/NDI_EPCOMMON_D~gzpn~regform~service~rs~gazprom-neft.ru/rs/regform/i18n?lang=" + lang,
        oI18n => {
          this.setState({ i18n: oI18n.register });
        }
      );
    }
  }


  render() {
    let i18n = this.state.i18n;
    let content = undefined;

    switch (this.state.status) {
      case "error":
        //content = <RegForm i18n={i18n} onSubmit={this.handleSubmit}/>;
        content = <Button outline color="primary" onClick={this.handleClickBack}>Вернуться к форме регистрации</Button>;
        break;
      case "success":
        //content = <RegForm i18n={i18n} onSubmit={this.handleSubmit}/>;
        content = <Button outline color="primary" onClick={this.handleClickBack}>Вернуться к форме регистрации</Button>;
        break;
      case "oldbrowser":
        content = this.oldBrowser();
        break;
      // case "progress":
      //   content = <ProgressIndicator value={this.state.progress} />;
      //   break;
      case "tokenFromEmailValid":
        // переход по ссылке проверки токена - вывод страницы с сообщением
        content = <Button outline color="primary" onClick={this.handleClickBack}>Вернуться к форме регистрации</Button>;
        break;
      case "tokenFromEmailNotValid":
        // переход по ссылке проверки токена - вывод страницы с сообщением
        content = <Button outline color="primary" onClick={this.handleClickBack}>Вернуться к форме регистрации</Button>;
        break;

      case "RegForm":
        content = <RegForm i18n={i18n} onSubmit={this.handleSubmit} />;
        break;

      default:
        content = <Spinner color="dark" className="spinner" />;
    }

    return (
      <div className="container" ref={this.alertRef}>
        <div className="pt-3">
          <img
            className="d-block ml-auto mr-0 mb-4"
            src="/NDI_EPCOMMON_D~gzpn~regform~service~rs~gazprom-neft.ru/regform/logo.png"
            //src="../logo.png"
            alt=""
          />
          <div>
            <button className="langbutton" title={i18n.langTooltip} href="javascript:void(null);" onClick={this.changeLang}>{this.state.lang === "ru" ? 'Eng' : 'Rus'}</button>
          </div>
          <h2>{i18n.caption}</h2>
          <div className="lead pb-3" dangerouslySetInnerHTML={{ __html: this.state.headtext }} />
          <Alert color={this.state.alertColor} isOpen={this.state.alertVisible} toggle={this.onDismissAlert}>
            <h4 className={this.state.httpError ? 'alert-heading' : 'alert-heading hidden'} >{this.state.httpError}</h4>
            <div dangerouslySetInnerHTML={{ __html: this.state.alertText }} />
          </Alert>
          <div className={this.state.progress < 100 ? 'pt-3 pb-3' : 'pt-3 pb-3 hidden'}>
            <ProgressIndicator value={this.state.progress} />
          </div>
        </div>
        {content}
      </div>
    );
  }
}

export default RegisterPage;
