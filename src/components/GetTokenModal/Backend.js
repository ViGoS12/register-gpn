class Backend {
  async TokenRequest(formData) {
    return this.sendRequest(
      "/NDI_EPCOMMON_D~gzpn~regform~service~rs~gazprom-neft.ru/rs/regform/token",
      "POST",
      {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      formData
    );
  }

  async sendRequest(url, method, headers, body) {
    return fetch(url, {
      method: method,
      headers: headers,
      body: body,
    });
  }
}

export default Backend;
