import React, { Component } from "react";
import { Spinner } from "reactstrap";
import "./App.css";
import Backend from "./components/backend";
//import FeedbackPage from "./components/feedbackpage";
import i18n_ru from "./i18n_ru.json";
import RegisterPage from "./components/_registerpage";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { i18n: null };
    this.backend = new Backend();
  }

  updateI18n() {
    this.setState({ i18n: i18n_ru });
    //this.setState({ i18n: null });
    // this.backend.getI18n(
    //   "/NDI_EPCOMMON_D~gzpn~feedback~services~rs~gazprom-neft.ru/rs/feedback/i18n",
    //   oI18n => {
    //     this.setState({ i18n: oI18n });
    //     document.title = oI18n.feedback.caption;
    //   }
    // );
  }

  componentDidMount() {
    this.updateI18n();
  }

  render() {
    return this.state.i18n ? (
      <RegisterPage i18n={this.state.i18n.register} />
    ) : (
      <Spinner color="dark" className="spinner" />
    );
  }
}

export default App;
