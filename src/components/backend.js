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
    const adressEncoded = encodeURI(oData.get("adress"));
    const adressEngEncoded = encodeURI(oData.get("adressEng"));
    const categoryEncoded = encodeURI(oData.get("category"));
    const egrulEncoded = encodeURI(oData.get("egrul"));
    const innEncoded = encodeURI(oData.get("inn"));
    const kppEncoded = encodeURI(oData.get("kpp"));
    const nameEngEncoded = encodeURI(oData.get("nameEng"));
    const ogrnEncoded = encodeURI(oData.get("ogrn"));
    const oktmoEncoded = encodeURI(oData.get("oktmo"));
    const shortNameEncoded = encodeURI(oData.get("shortName"));
    const tokenEncoded = encodeURI(oData.get("token"));

    oData.append("fullNameEncoded", fullNameEncoded);
    oData.append("emailEncoded", emailEncoded);
    oData.append("messageEncoded", messageEncoded);
    oData.append("adressEncoded", adressEncoded);
    oData.append("adressEngEncoded", adressEngEncoded);
    oData.append("categoryEncoded", categoryEncoded);
    oData.append("egrulEncoded", egrulEncoded);
    oData.append("innEncoded", innEncoded);
    oData.append("kppEncoded", kppEncoded);
    oData.append("nameEngEncoded", nameEngEncoded);
    oData.append("ogrnEncoded", ogrnEncoded);
    oData.append("oktmoEncoded", oktmoEncoded);
    oData.append("shortNameEncoded", shortNameEncoded);
    oData.append("tokenEncoded", tokenEncoded);

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
