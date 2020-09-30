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

  getFile(url) {
    const xhr = this.createXHR();
    xhr.open("GET", url, true);
    xhr.send();
    var that = this;

    xhr.onreadystatechange = () => {
      if (xhr.readyState !== 4) {
        return false;
      }

      if (xhr.status !== 200) {
        console.log(xhr.status + ": " + xhr.statusText);
      } else {
        //callbackI18n(JSON.parse(xhr.responseText));
        that.downloadFile(xhr.responseText);
      }
    };
  }

  downloadFile(data) {

    var link = document.createElement('a');
    link.download = data.fileName;
    
    //=====
    //  var blob = new Blob([data.FileBody], {
    //  type: data.fileType
    //  });

    //var encode = window.atob(data.FileBody);
    //  var _blob = new Blob([that._createUint8Array(encode)], {
    //  type: data.fileType
    //});

    //var blob = this.b64toBlob(b64data, "application/msword");
    //=====

    link.href = URL.createObjectURL(data.fileBody);
    link.click();
    URL.revokeObjectURL(link.href);
  }

  // b64toBlob(b64Data, contentType) {
  //   var sliceSize = 512;
  //   var byteCharacters = atob(b64Data);
  //   var byteArrays = [];

  //   for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
  //     var slice = byteCharacters.slice(offset, offset + sliceSize);
  //     var byteNumbers = new Array(slice.length);
  //     for (var i = 0; i < slice.length; i++) {
  //       byteNumbers[i] = slice.charCodeAt(i);
  //     }
  //     var byteArray = new Uint8Array(byteNumbers);
  //     byteArrays.push(byteArray);
  //   }

  //   var blob = new Blob(byteArrays, {
  //     type: contentType
  //   });
  //   return blob;
  // }

  asyncSubmit(oForm, url, onResponse, onUpdateProgress, onError) {
    const xhr = this.createXHR();
    require("formdata-polyfill");
    let oData = new FormData(oForm);

    const fullNameEncoded = encodeURI(oData.get("fullName"));
    const emailEncoded = encodeURI(oData.get("email"));
    const categoryEncoded = encodeURI(oData.get("category") === 'on' ? 1 : 0 );
    const innEncoded = encodeURI(oData.get("inn"));
    const kppEncoded = encodeURI(oData.get("kpp"));
    //const egrulEncoded = encodeURI(oData.get("egrul"));
    //const ogrnEncoded = encodeURI(oData.get("ogrn"));
    //const oktmoEncoded = encodeURI(oData.get("oktmo"));
    const shortNameEncoded = encodeURI(oData.get("shortName"));
    const tokenEncoded = encodeURI(oData.get("token"));
    const userNameEncoded = encodeURI(oData.get("userName"));
    const userSecondNameEncoded = encodeURI(oData.get("userSecondName"));
    const userSurenameEncoded = encodeURI(oData.get("userSurname"));
    const regNameEncoded = encodeURI(oData.get("regNum")); //norezident
    const phoneOrgEncoded = encodeURI(oData.get("phoneOrg"));
    const emailOrgEncoded = encodeURI(oData.get("emailOrg"));
    const funcEncoded1 = encodeURI(oData.get("f1") === 'on' ? 1 : 0 );
    const funcEncoded2 = encodeURI(oData.get("f2") === 'on' ? 1 : 0 );
    const funcEncoded3 = encodeURI(oData.get("f3") === 'on' ? 1 : 0 );
    const funcEncoded4 = encodeURI(oData.get("f4") === 'on' ? 1 : 0 );
    const funcEncoded5 = encodeURI(oData.get("f5") === 'on' ? 1 : 0 );
    const funcEncoded6 = encodeURI(oData.get("f6") === 'on' ? 1 : 0 );
    const funcEncoded7 = encodeURI(oData.get("f7") === 'on' ? 1 : 0 );
    const funcEncoded8 = encodeURI(oData.get("f8") === 'on' ? 1 : 0 );
    const funcEncoded9 = encodeURI(oData.get("f9") === 'on' ? 1 : 0 );

    //const messageEncoded = encodeURI(oData.get("message"));
    //const adressEncoded = encodeURI(oData.get("adress"));
    //const adressEngEncoded = encodeURI(oData.get("adressEng"));
    //const nameEngEncoded = encodeURI(oData.get("nameEng"));

    oData.append("fullNameEncoded", fullNameEncoded);
    oData.append("emailEncoded", emailEncoded);
    oData.append("categoryEncoded", categoryEncoded);
    //oData.append("egrulEncoded", egrulEncoded);
    oData.append("innEncoded", innEncoded);
    oData.append("kppEncoded", kppEncoded);
    //oData.append("ogrnEncoded", ogrnEncoded);
    //oData.append("oktmoEncoded", oktmoEncoded);
    oData.append("shortNameEncoded", shortNameEncoded);
    oData.append("tokenEncoded", tokenEncoded);
    oData.append("userNameEncoded", userNameEncoded);
    oData.append("userSecondNameEncoded", userSecondNameEncoded);
    oData.append("userSurenameEncoded", userSurenameEncoded);
    oData.append("regNameEncoded", regNameEncoded);
    oData.append("phoneOrgEncoded", phoneOrgEncoded);
    oData.append("emailOrgEncoded", emailOrgEncoded);
    oData.append("functionEncodedF1", funcEncoded1);
    oData.append("functionEncodedF2", funcEncoded2);
    oData.append("functionEncodedF3", funcEncoded3);
    oData.append("functionEncodedF4", funcEncoded4);
    oData.append("functionEncodedF5", funcEncoded5);
    oData.append("functionEncodedF6", funcEncoded6);
    oData.append("functionEncodedF7", funcEncoded7);
    oData.append("functionEncodedF8", funcEncoded8);
    oData.append("functionEncodedF9", funcEncoded9);
    
    
    //oData.append("messageEncoded", messageEncoded);
    //oData.append("adressEncoded", adressEncoded);
    //oData.append("adressEngEncoded", adressEngEncoded);
    //oData.append("nameEngEncoded", nameEngEncoded);

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

  asyncSubmitVerifyToken(sToken, url, onResponse, onError) {
    const xhr = this.createXHR();
    
    //let oData = JSON.stringify({"token": sToken});
    // xhr.open("POST", url, true);
    // xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    // xhr.send(oData);

    var body = 'token=' + encodeURIComponent(sToken);
    xhr.open("POST", url, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(body);

    xhr.onreadystatechange = () => {
      console.log(xhr.status);
      if (xhr.readyState !== 4) {
        return false;
      }

      if (xhr.status !== 200) {
        onError(xhr.status);
      } else {
        //onResponse(xhr.responseText);
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
