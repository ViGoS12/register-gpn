import React from "react";
import InputComponent from "./inputcomponent";
import Backend from "./backend";

class InputCaptcha extends InputComponent {
  state = {};
  backend = new Backend();

  handleChange = e => {
    // fire the form change event
    this.props.onChange(e);
    this.validateValue(e.target);
  };

  validateValue(inputField) {
    const xhr = this.backend.createXHR();

    xhr.open(
      "GET",
      "/NDI_EPCOMMON_D~gzpn~feedback~services~rs~gazprom-neft.ru/rs/feedback/checkcaptcha/" +
        inputField.value,
      true
    );

    xhr.send();
    xhr.onreadystatechange = () => {
      let result = false;
      console.log(xhr.status);
      if (xhr.readyState !== 4) {
        return false;
      }
      if (xhr.status !== 200) {
        this.setInvalid(inputField);
      } else {
        const oResult = JSON.parse(xhr.responseText);
        console.log(oResult);
        console.log("oResult.captchaPassed", oResult.response.captchaPassed);
        if (oResult.response.captchaPassed === true) {
          this.setValid(inputField);
          result = true;
        } else {
          this.setInvalid(inputField);
        }
      }

      this.props.onValidate(result);
    };
  }

  handleImageClick(event) {
    let index = event.target.src.indexOf("?t=");
    let url = event.target.src;
    if (index > -1) {
      url = url.slice(0, index);
    }

    event.target.src = "";
    event.target.src = url + "?t=" + new Date().getTime();
  }

  render() {
    return (
      <React.Fragment>
        <hr className="mt-4" />

        <div className="mb-3">
          <div className="input-group">
            <div className="input-group-prepend">
              <img
                id="captchaid"
                alt=""
                src="/NDI_EPCOMMON_D~gzpn~feedback~services~rs~gazprom-neft.ru/rs/feedback/captcha"
                className="gzpn-captcha-img"
                onClick={this.handleImageClick}
              />
            </div>
            <input
              type="text"
              className="form-control"
              id="checkCode"
              name="checkCode"
              placeholder={this.props.placeholder}
              required
              value={this.props.value}
              onChange={this.handleChange}
            />
            <div className="invalid-feedback" stylename="width: 100%">
              {this.props.invalidMessage}
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3" />
      </React.Fragment>
    );
  }
}

export default InputCaptcha;
