import React, { Component } from "react";
//import FeedbackForm from "./feedbackform";
import RegForm from "./_regform";
import Backend from "./backend";
import ProgressIndicator from "./progressindicator";

class RegisterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headtext: props.i18n.headText,
      status: undefined,
      progress: undefined,
      httpError: undefined
    };
  }

  componentDidMount() {
    let ie = require("ie-version");
    if (ie.version && ie.version <= 9) {
      this.setState({ status: "oldbrowser" });
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
        headtext: oResponse.response.exceptionMessage
      });
    } else {
      console.log("success", oResponse.response.requestCategory);
      this.setState({
        status: "success",
        headtext: this.props.i18n.success[oResponse.response.requestCategory]
      });
    }
  };

  handleProgress = event => {
    console.log("progressEvent", event);
    if (event.lengthComputable) {
      let percentage = Math.round((event.loaded * 100) / event.total);

      this.setState({
        status: "progress",
        progress: percentage,
        headtext: this.props.i18n.progressIndicator.caption
      });
    }
  };

  handleError = httpError => {
    this.setState({
      status: "error",
      httpError: httpError,
      headtext: this.props.i18n.errors[httpError]
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
  }

  render() {
    const i18n = this.props.i18n;
    let content = undefined;

    switch (this.state.status) {
      case "error":
      case "success":
        break;
      case "oldbrowser":
        content = this.oldBrowser();
        break;
      case "progress":
        content = <ProgressIndicator value={this.state.progress} />;
        break;
      default:
        content = <RegForm i18n={i18n} onSubmit={this.handleSubmit} />;
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
        </div>
        {content}
      </div>
    );
  }
}

export default RegisterPage;
