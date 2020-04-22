class Backend {
  XMLHttpFactories = [
    () => {
      return new XMLHttpRequest();
    },
    () => {
      return new window.ActiveXObject("Msxml2.XMLHTTP");
    },
    () => {
      return new window.ActiveXObject("Msxml3.XMLHTTP");
    },
    () => {
      return new window.ActiveXObject("Microsoft.XMLHTTP");
    }
  ];

  getI18n(url, callbackI18n) {
    const xhr = this.createXHR();
    xhr.open("GET", url, true);
    xhr.send();

    xhr.onreadystatechange = () => {
      if (xhr.readyState !== 4) {
        return false;
      }

      if (xhr.status !== 200) {
        console.log(xhr.status + ": " + xhr.statusText);
      } else {
        callbackI18n(JSON.parse(xhr.responseText));
      }
    };
  }

  asyncSubmit(oForm, url, onResponse, onUpdateProgress, onError) {
    const xhr = this.createXHR();
    require("formdata-polyfill");
    let oData = new FormData(oForm);

    const fullNameEncoded = encodeURI(oData.get("fullName"));
    const emailEncoded = encodeURI(oData.get("email"));
    const messageEncoded = encodeURI(oData.get("message"));

    oData.append("fullNameEncoded", fullNameEncoded);
    oData.append("emailEncoded", emailEncoded);
    oData.append("messageEncoded", messageEncoded);

    xhr.open("POST", url, true);
    xhr.upload.addEventListener("progress", onUpdateProgress, false);

    xhr.send(oData);
    xhr.onreadystatechange = () => {
      console.log(xhr.status);
      if (xhr.readyState !== 4) {
        return false;
      }

      if (xhr.status !== 200) {
        onError(xhr.status);
      } else {
        onResponse(JSON.parse(xhr.responseText));
      }
    };
  }

  createXHR() {
    let xmlhttp = false;
    for (let i = 0; i < this.XMLHttpFactories.length; i++) {
      try {
        xmlhttp = this.XMLHttpFactories[i]();
      } catch (e) {
        continue;
      }
      break;
    }
    return xmlhttp;
  }
}
export default Backend;
