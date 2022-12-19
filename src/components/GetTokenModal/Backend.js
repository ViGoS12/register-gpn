class Backend {
  async TokenRequest(formData) {
    return this.sendRequest(
      "/NDI_EPCOMMON_D~gzpn~regform~service~rs~gazprom-neft.ru/rs/regform/",
      "POST",
      {},
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
