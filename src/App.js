import React, { Component, Suspense } from "react";
import { Spinner } from "reactstrap";
import "./App.css";
import Backend from "./components/backend";
import i18n_ru from "./i18n_ru.json";
import funcData_ru from "./funcData_ru.json";
import RegisterPage from "./components/_registerpage";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      i18n: null,
      lang: "ru",
      funcData: null,
    };
    this.backend = new Backend();
  }

  getFunctionsInputData() {
    if (
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1"
    ) {
      //LOCAL
      this.setState({ funcData: funcData_ru });
    } else {
      //SERVER (getI18n подходит для людого запроса на сервер)
      this.backend.getI18n(
        "/NDI_EPCOMMON_D~gzpn~regform~service~rs~gazprom-neft.ru/rs/regform/function?lang=" +
          this.state.lang,
        (ofunctionData) => {
          this.setState({ funcData: ofunctionData });
        }
      );
    }
  }

  updateI18n() {
    if (
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1"
    ) {
      //LOCAL
      this.setState({ i18n: i18n_ru });
    } else {
      //SERVER
      this.setState({ i18n: null });
      this.backend.getI18n(
        "/NDI_EPCOMMON_D~gzpn~regform~service~rs~gazprom-neft.ru/rs/regform/i18n?lang=" +
          this.state.lang,
        (oI18n) => {
          this.setState({ i18n: oI18n });
          document.title = oI18n.register.caption;
        }
      );
    }
  }

  componentDidMount() {
    this.updateI18n();
    this.getFunctionsInputData();
  }

  render() {
    return (
      <Suspense fallback="loading">
        {this.state.i18n && this.state.funcData ? (
          <RegisterPage
            i18n={this.state.i18n.register}
            funcData={this.state.funcData.functionData}
            lang={this.state.lang}
          />
        ) : (
          <Spinner color="dark" className="spinner" />
        )}
        ;
      </Suspense>
    );
  }
}

export default App;
