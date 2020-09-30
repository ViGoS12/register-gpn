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

        that.downloadFile(xhr.response);
        //test
        //var res = {"response":{"captchaPassed":false,"content":"D0CF11E0A1B11AE1000000000000000000000000000000003E000300FEFF090006000000000000000000000014000000E00300000000000000100000E203000001000000FEFFFFFF00000000D8030000D9030000DA030000DB030000DC030000DD030000DE030000DF030000E4030000E5030000E6030000E7030000E8030000E9030000EA030000EB030000EC030000ED030000EE03000068090000FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFECA5C10069E019040000F812BF000000000000100000000000080000A02A01000E00626A626AFA73FA7300000000000000000000000000000000000019041600346A010098198D5C98198D5CF348000083000000C20000000000000000000000000000000000000000000000FFFF0F000000000000000000FFFF0F000000000000000000FFFF0F0000000000000000000000000000000000B70000000000C419000000000000C41900002B2700000A000000352700000C0000004127000000000000412700000000000041270000140000000000000000000000FFFFFFFF000000005527000000000000552700000000000055270000380000008D270000AC010000392900008C0100005527000000000000BDAF00009E020000C52A0000D4020000992D000016000000AF2D000000000000AF2D000000000000AF2D0000000000000F2F0000A4030000B3320000EC0000009F33000078000000C4AE000002000000C6AE000000000000C6AE000000000000C6AE000000000000C6AE000000000000C6AE000000000000C6AE0000240000005BB20000B602000011B500009E000000EAAE00008D0000000000000000000000000000000000000041270000000000001734000000000000000000000000000000000000000000000F2F0000000000000F2F00000000000017340000000000001734000000000000EAAE0000","fileName":"Инструкция по регистрации участника процедуры.doc","mimeType":"application\/msword","hasError":false}}
        //that.downloadFile(res.response);
      }
    };
  }

  downloadFile(data) {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    var blob = new Blob(data.content, {type: data.mimeType}),
        url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = data.fileName;
    a.click();
    window.URL.revokeObjectURL(url);
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
