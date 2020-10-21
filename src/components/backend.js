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
        
        //test
        // var res = {
        //   "response":{"captchaPassed":false,
        //     "content":"D0CF11E0A1B11AE1000000000000000000000000000000003E000300FEFF090006000000000000000000000014000000E00300000000000000100000E203000001000000FEFFFFFF00000000D8030000D9030000DA030000DB030000DC030000DD030000DE030000DF030000E4030000E5030000E6030000E7030000E8030000E9030000EA030000EB030000EC030000ED030000EE03000068090000FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFECA5C10069E019040000F812BF000000000000100000000000080000A02A01000E00626A626AFA73FA7300000000000000000000000000000000000019041600346A010098198D5C98198D5CF348000083000000C20000000000000000000000000000000000000000000000FFFF0F000000000000000000FFFF0F000000000000000000FFFF0F0000000000000000000000000000000000B70000000000C419000000000000C41900002B2700000A000000352700000C0000004127000000000000412700000000000041270000140000000000000000000000FFFFFFFF000000005527000000000000552700000000000055270000380000008D270000AC010000392900008C0100005527000000000000BDAF00009E020000C52A0000D4020000992D000016000000AF2D000000000000AF2D000000000000AF2D0000000000000F2F0000A4030000B3320000EC0000009F33000078000000C4AE000002000000C6AE000000000000C6AE000000000000C6AE000000000000C6AE000000000000C6AE000000000000C6AE0000240000005BB20000B602000011B500009E000000EAAE00008D0000000000000000000000000000000000000041270000000000001734000000000000000000000000000000000000000000000F2F0000000000000F2F00000000000017340000000000001734000000000000EAAE0000",
        //     "fileName":"Инструкция по регистрации участника процедуры.doc","mimeType":"application\/msword","hasError":false}}
       
        // var res = {
        //       "response":{"captchaPassed":false,
        //         "content":"RDBDRjExRTBBMUIxMUFFMTAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwM0UwMDAzMDBGRUZGMDkwMDA2MDAwMDAwMDAwMDAwMDAwMDAwMDAwMDE0MDAwMDAwRTAwMzAwMDAwMDAwMDAwMDAwMTAwMDAwRTIwMzAwMDAwMTAwMDAwMEZFRkZGRkZGMDAwMDAwMDBEODAzMDAwMEQ5MDMwMDAwREEwMzAwMDBEQjAzMDAwMERDMDMwMDAwREQwMzAwMDBERTAzMDAwMERGMDMwMDAwRTQwMzAwMDBFNTAzMDAwMEU2MDMwMDAwRTcwMzAwMDBFODAzMDAwMEU5MDMwMDAwRUEwMzAwMDBFQjAzMDAwMEVDMDMwMDAwRUQwMzAwMDBFRTAzMDAwMDY4MDkwMDAwRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkVDQTVDMTAwNjlFMDE5MDQwMDAwRjgxMkJGMDAwMDAwMDAwMDAwMTAwMDAwMDAwMDAwMDgwMDAwQTAyQTAxMDAwRTAwNjI2QTYyNkFGQTczRkE3MzAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDE5MDQxNjAwMzQ2QTAxMDA5ODE5OEQ1Qzk4MTk4RDVDRjM0ODAwMDA4MzAwMDAwMEMyMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMEZGRkYwRjAwMDAwMDAwMDAwMDAwMDAwMEZGRkYwRjAwMDAwMDAwMDAwMDAwMDAwMEZGRkYwRjAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDBCNzAwMDAwMDAwMDBDNDE5MDAwMDAwMDAwMDAwQzQxOTAwMDAyQjI3MDAwMDBBMDAwMDAwMzUyNzAwMDAwQzAwMDAwMDQxMjcwMDAwMDAwMDAwMDA0MTI3MDAwMDAwMDAwMDAwNDEyNzAwMDAxNDAwMDAwMDAwMDAwMDAwMDAwMDAwMDBGRkZGRkZGRjAwMDAwMDAwNTUyNzAwMDAwMDAwMDAwMDU1MjcwMDAwMDAwMDAwMDA1NTI3MDAwMDM4MDAwMDAwOEQyNzAwMDBBQzAxMDAwMDM5MjkwMDAwOEMwMTAwMDA1NTI3MDAwMDAwMDAwMDAwQkRBRjAwMDA5RTAyMDAwMEM1MkEwMDAwRDQwMjAwMDA5OTJEMDAwMDE2MDAwMDAwQUYyRDAwMDAwMDAwMDAwMEFGMkQwMDAwMDAwMDAwMDBBRjJEMDAwMDAwMDAwMDAwMEYyRjAwMDBBNDAzMDAwMEIzMzIwMDAwRUMwMDAwMDA5RjMzMDAwMDc4MDAwMDAwQzRBRTAwMDAwMjAwMDAwMEM2QUUwMDAwMDAwMDAwMDBDNkFFMDAwMDAwMDAwMDAwQzZBRTAwMDAwMDAwMDAwMEM2QUUwMDAwMDAwMDAwMDBDNkFFMDAwMDAwMDAwMDAwQzZBRTAwMDAyNDAwMDAwMDVCQjIwMDAwQjYwMjAwMDAxMUI1MDAwMDlFMDAwMDAwRUFBRTAwMDA4RDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwNDEyNzAwMDAwMDAwMDAwMDE3MzQwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDBGMkYwMDAwMDAwMDAwMDAwRjJGMDAwMDAwMDAwMDAwMTczNDAwMDAwMDAwMDAwMDE3MzQwMDAwMDAwMDAwMDBFQUFFMDAwMA==",
        //         "fileName":"Инструкция по регистрации участника процедуры.doc","mimeType":"application\/msword","hasError":false}}
            
        // var res = {
        // "response":{
        //   "captchaPassed":false,
        //   "content":"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",
        //   "fileName":"Инструкция по регистрации участника процедуры.docx",
        //   "mimeType":"vnd.openxmlformats-officedocument.wordprocessingml.document",
        //   "hasError":false}
        // }

        //test with backslash
        //var res = '{"response":{"captchaPassed":false,"content":"UEsDBBQACAgIAMVQQVEAAAAAAAAAAAAAAAASAAAAd29yZC9udW1iZXJpbmcueG1spZNNTsMwEIVPwB0i79skFSAUNe2CCjbsgAO4jpNYtT3W2Eno7XGbv1IklIZV5Izf98bj5\/X2S8mg5mgF6JTEy4gEXDPIhC5S8vnxsngigXVUZ1SC5ik5cku2m7t1k+hK7Tn6fYFHaJsolpLSOZOEoWUlV9QuwXDtizmgos4vsQgVxUNlFgyUoU7shRTuGK6i6JF0GEhJhTrpEAslGIKF3J0kCeS5YLz79Aqc4ttKdsAqxbU7O4bIpe8BtC2FsT1NzaX5YtlD6r8OUSvZ72vMFLcMaePnrGRr1ABmBoFxa\/3fXVsciHE0YYAnxKCY0sJPz74TRYUeMKd0XIEG76X37oZ2Ro0HGWdh5ZRG2tKb2CPF4+8u6Ix5XuqNmJTiK4JXuQqHQM5BsJKi6wFyDkECO\/DsmeqaDmHOiklxviJlghZI1RhSe9PNxtFVXN5LavhIK\/5He0WozBj3+zm0ixcYP9wGWPWAcPMNUEsHCEkTQ39oAQAAPQUAAFBLAwQUAAgICADFUEFRAAAAAAAAAAAAAAAAEQAAAHdvcmQvc2V0dGluZ3MueG1spZXNbtswDMefYO8Q6J74o0k2GHV6WLHtsJ7SPQAjybYQfUGS4+XtJ8eW1aRA4WanSH+SP9IMTT8+\/RV8caLGMiVLlK1StKASK8JkXaI\/rz+W39DCOpAEuJK0RGdq0dPuy2NXWOqc97ILT5C2ELhEjXO6SBKLGyrArpSm0hsrZQQ4fzV1IsAcW73ESmhw7MA4c+ckT9MtGjGqRK2RxYhYCoaNsqpyfUihqophOv6ECDMn7xDyrHArqHSXjImh3NegpG2YtoEm7qV5YxMgp48e4iR48Ov0nGzEQOcbLfiQqFOGaKMwtdarz4NxImbpjAb2iCliTgnXOUMlApicMP1w3ICm3Cufe2zaBRUfJPbC8jmFDKbf7GDAnN9XAXf08228ZrOm+Ibgo1xrpoG8B4EbMC4A+D0ErvCRku8gTzANM6lnjfMNiTCoDYg4pPZT\/2yW3ozLvgFNI63+P9pPo1odx319D+3NG5htPgfIA2DnVyChFbTcvcJh75RedMUJ\/BR\/zVOU9OZhy8XTftiYwS\/bIH+UIPybc7UQXxShvak1bH5xfcrkKic3+z6IvoDWQ9pDnZWIs7pxWc93\/kb8Qr5cDnU+2vKLLR9slwtg7Pec9x4PUcuD9sbvIWgPUVsHbR21TdA2UdsGbdtrzVlTw5k8+jaEY69XinPVUfIr2t9JYz\/CV2r3D1BLBwiOs8OkBQIAAOoGAABQSwMEFAAICAgAxVBBUQAAAAAAAAAAAAAAABIAAAB3b3JkL2ZvbnRUYWJsZS54bWyllE1OwzAQhU\/AHSLv26QIEIqaVAgEG3bAAQbHSazaHmvsNPT2uDQ\/UCSUhlWUjN\/3xuMXrzcfWkU7QU6iydhqmbBIGI6FNFXG3l4fF7csch5MAQqNyNheOLbJL9ZtWqLxLgpy41LNM1Z7b9M4drwWGtwSrTChWCJp8OGVqlgDbRu74KgtePkulfT7+DJJbliHwYw1ZNIOsdCSEzos\/UGSYllKLrpHr6ApvkfJA\/JGC+O\/HGMSKvSAxtXSup6m59JCse4hu782sdOqX9faKW4FQRvOQqujUYtUWEIunAtfH47FgbhKJgzwgBgUU1r46dl3okGaAXNIxglo8F4G725oX6hxI+MsnJrSyLH0LN8JaP+7C5gxz+96Kyel+IQQVL6hIZBzELwG8j1AzSEo5FtR3IPZwRDmopoU5xNSIaEi0GNI3Vknu0pO4vJSgxUjrfof7YmwsWPcr+bQvv2Bq+vzAJc9IO\/uv6hNDegQ\/juSoFicr+PuYsw\/AVBLBwith20AeQEAAFoFAABQSwMEFAAICAgAxVBBUQAAAAAAAAAAAAAAAA8AAAB3b3JkL3N0eWxlcy54bWzVlu1u2jAUhq9g94Dyv01IAkNRaVW16jap6qa1u4CDY4hVx7ZsB8qufs43JKFKAxId\/AAf+7zHfvw6ztXNW0xHaywV4WxujS8da4QZ4iFhq7n15+XhYmaNlAYWAuUMz60tVtbN9ZerTaD0lmI1MvlMBTGaW5HWIrBthSIcg7rkAjPTueQyBm2acmXHIF8TcYF4LECTBaFEb23XcaZWIcPnViJZUEhcxARJrvhSpykBXy4JwsVPmSH71M1T7jlKYsx0VtGWmJo5cKYiIlSpFg9VM51RKbJ+bxHrmJbjNqJPtVDCxmxGTPNCGy5DITnCSpnofd5ZKY6dHgBTiSqjzxT2a5YziYGwSia1RkOoqn1pahfQMql6ITULRftMJO96JAsJctueBQzguZsvSC8XNxRMlk5kZcghEigCqUsBOkSBcvSKwztga6jMHK562bmhFBJYSYhrk6oP7ezYadjlOQKBa7XVcWrfJE9EbXd\/iNrOCRxPPibglgLX5gEYcnSPl5BQrdKm\/CWLZtHKfh4402q0CUAhQubWrSRgym8CpHYaGJS+VQR2QtEtU9V4O5VSf014DeaguG4ZuVPNGAW2KmMySWN2MRm7OUXRbGWaAhDJJChJD7X7dWoVjd8JNQFINC9kRSG7K2S3uGT3hJHQW2HSBcjUXyJKVbOuH+Hcekr9mK07zDPNVZQxZhDjcjksH5TXzlLb8hoWFO9Jv6SRXvrZyNFTjyrdi\/iOIb0228JR3jEa51u0AIXDn6zsrQuaLPymu+LF5rxiLJ52hhSCafjRbJBqxOu9hKXG5qYcu0464wU2598sw3ec9\/e2snHtPd9pey+P7fhsCDb3IDb3k2Hzpn2xLUplp3mEvY4jnMeOxOgdxOidG+Nsn6I7lCLilMvKe176bT0hZx1PyNkJ8PoH8fqfC68764t3D+c0+7Rw+h04\/RPgnBzEOflkOP1T4jx4fx+Jc3oQ5\/R\/xUkawmfB+0K0eatovS9k0TNzne5x\/fh9PumANTkK1nOy0J28qo4zI\/PcQcxO+CpfmbrrRus2tdfx3uUdeO8q\/6nrf1BLBwgXna4LHQMAAN8RAABQSwMEFAAICAgAxVBBUQAAAAAAAAAAAAAAABEAAAB3b3JkL2RvY3VtZW50LnhtbKWVzY7TMBDHn4B3qHxvk5Sy7EZN90AFQgJU7S4P4CZOYq0dW2OnpdxYjrwNYg8g4BnSN8LOZz9Wq2zpoe7MZH7\/GWdqTy8\/cTZYEVBUZAHyRi4akCwUEc2SAH28eT08RwOlcRZhJjISoA1R6HL2bLr2IxHmnGR6YAiZ8nkYoFRr6TuOClPCsRoJSTITjAVwrI0JicMx3OZyGAousaZLyqjeOGPXPUM1RgQoh8yvEUNOQxBKxNqm+CKOaUjqpcmAPrpVyrwuuVR0gDBTg8hUSqVqaPxUmgmmDWT1WBMrzprn1rKPWgR4bV4HZ5XQWkAkQYREKeOdV8GW6Lk9NtAi2ow+JexrNpVwTLMWY4fjANRqj4x2vWklqmuk2wvF+hRShd7RJWDYHFeBT9jP3XxJe03xAcFk6RzagTwFEaYYdANgpxCYCG9J9ApnK9wOc5T0GucDUkRxAph3Q6qe9GY992BcrlMsSUdL\/o\/2BkQuu3GfnELb+Qd6L54GGDeAmTkClyLa2FUO1r45QaOrALn1B9WuOWHHzsWx62pOYpwz\/UBkAXtOb+JLDPht1Hq9shi5ALvAApzZ1Onsxwp5oOB9uZpYLpqZR1bYYlAlUUfKK8BXEofmDJBAFIEVQbPtXXG\/\/WK+\/xbft9+Kn4Pih\/n5a\/u1+F3cF3+2dxahK1BVsYUpEuoKK5Prz0YxNdfS2fnziS3QHFaed+FeWH37wHts21sKrYWZdG8yKdvQQnYGI7HuLKBJumOmBEfE9PtyXJqxELoxa4UPOb\/ZSGKC5hYEm1r33tTpNGPgdFfi7B9QSwcIAHgaz1wCAABXBwAAUEsDBBQACAgIAMVQQVEAAAAAAAAAAAAAAAAcAAAAd29yZC9fcmVscy9kb2N1bWVudC54bWwucmVsc62STWrDMBCFT9A7iNnXstMfSomcTQhkW9wDKPL4h1ojIU1KffuKlCQOBNOFl++JefPNjNabHzuIbwyxd6SgyHIQSMbVPbUKPqvd4xuIyJpqPThCBSNG2JQP6w8cNKea2PU+ihRCUUHH7N+ljKZDq2PmPFJ6aVywmpMMrfTafOkW5SrPX2WYZkB5kyn2tYKwrwsQ1ejxP9muaXqDW2eOFonvtJCcajEF6tAiKzjJP7PIUhjI+wyrJRkiMqflxivG2ZlDeFoSoXHElT4Mk1VcrDmI5yUh6GgPGNLcV4iLNQfxsugxeBxweoqTPreXN5+8\/AVQSwcIkACr6\/EAAAAsAwAAUEsDBBQACAgIAMVQQVEAAAAAAAAAAAAAAAALAAAAX3JlbHMvLnJlbHONzzsOwjAMBuATcIfIO03LgBBq0gUhdUXlAFHiphHNQ0l49PZkYADEwGj792e57R52JjeMyXjHoKlqIOikV8ZpBufhuN4BSVk4JWbvkMGCCTq+ak84i1x20mRCIgVxicGUc9hTmuSEVqTKB3RlMvpoRS5l1DQIeREa6aautzS+G8A\/TNIrBrFXDZBhCfiP7cfRSDx4ebXo8o8TX4kii6gxM7j7qKh6tavCAuUt\/XiRPwFQSwcILWjPIrEAAAAqAQAAUEsDBBQACAgIAMVQQVEAAAAAAAAAAAAAAAAVAAAAd29yZC90aGVtZS90aGVtZTEueG1s7VlLb9s2HL8P2HcgdG9l2VbqBHWK2LHbrU0bJG6HHmmJlthQokDSSXwb2uOAAcO6YYcV2G2HYVuBFtil+zTZOmwd0K+wvx6WKZvOo023Dq0PNkn9\/u8HSfnylcOIoX0iJOVx23Iu1ixEYo\/7NA7a1u1B\/0LLQlLh2MeMx6RtTYi0rqx\/+MFlvKZCEhEE9LFcw20rVCpZs23pwTKWF3lCYng24iLCCqYisH2BD4BvxOx6rbZiR5jGFopxBGxvjUbUI2iQsrTWp8x7DL5iJdMFj4ldL5OoU2RYf89Jf+REdplA+5i1LZDj84MBOVQWYlgqeNC2atnHstcv2yURU0toNbp+9inoCgJ\/r57RiWBYEjr95uqlzZJ\/Pee\/iOv1et2eU\/LLANjzwFJnAdvst5zOlKcGyoeLvLs1t9as4jX+jQX8aqfTcVcr+MYM31zAt2orzY16Bd+c4d1F\/Tsb3e5KBe\/O8CsL+P6l1ZVmFZ+BQkbjvQV0Gs8yMiVkxNk1I7wF8NY0AWYoW8uunD5Wy3Itwve46AMgCy5WNEZqkpAR9gDXxYwOBU0F4DWCtSf5kicXllJZSHqCJqptfZxgqIgZ5OWzH18+e4KO7j89uv\/L0YMHR\/d\/NlBdw3GgU734\/ou\/H32K\/nry3YuHX5nxUsf\/\/tNnv\/36pRmodODzrx\/\/8fTx828+\/\/OHhwb4hsBDHT6gEZHoJjlAOzwCwwwCyFCcjWIQYqpTbMSBxDFOaQzongor6JsTzLAB1yFVD94R0AJMwKvjexWFd0MxVtQAvB5GFeAW56zDhdGm66ks3QvjODALF2Mdt4Pxvkl2dy6+vXECuUxNLLshqai5zSDkOCAxUSh9xvcIMZDdpbTi1y3qCS75SKG7FHUwNbpkQIfKTHSNRhCXiUlBiHfFN1t3UIczE\/tNsl9FQlVgZmJJWMWNV\/FY4cioMY6YjryBVWhScncivIrDpYJIB4Rx1POJlCaaW2JSUfc6tA5z2LfYJKoihaJ7JuQNzLmO3OR73RBHiVFnGoc69iO5BymK0TZXRiV4tULSOcQBx0vDfYcSdbbavk2D0Jwg6ZOxMJUE4dV6nLARJnHR4Su9OqLxcY07gr6Nz7txQ6t8\/u2j\/1HL3gAnmGpmvlEvw8235y4XPn37u\/MmHsfbBArifXN+35zfxea8rJ7PvyXPurCtH7QzNtHSU\/eIMrarJozckFn\/lmCe34fFbJIRlYf8JIRhIa6CCwTOxkhw9QlV4W6IExDjZBICWbAOJEq4hKuFtZR3dj+lYHO25k4vlYDGaov7+XJDv2yWbLJZIHVBjZTBaYU1Lr2eMCcHnlKa45qlucdKszVvQt0gnL5KcFbquWhIFMyIn\/o9ZzANyxsMkVPTYhRinxiWNfucxhvxpnsmJc7HybUFJ9uL1cTi6gwdtK1Vt+5ayMNJ2xrBaQmGUQL8ZNppMAvituWp3MCTa3HO4lVzVjk1d5nBFRGJkGoTyzCnyh5NX6XEM\/3rbjP1w\/kYYGgmp9Oi0XL+Qy3s+dCS0Yh4asnKbFo842NFxG7oH6AhG4sdDHo38+zyqYROX59OBOR2s0i8auEWtTH\/yqaoGcySEBfZ3tJin8OzcalDNtPUs5fo\/oqmNM7RFPfdNSXNXDifNvzs0gS7uMAozdG2xYUKOXShJKReX8C+n8kCvRCURaoSYukL6FRXsj\/rWzmPvMkFodqhARIUOp0KBSHbqrDzBGZOXd8ep4yKPlOqK5P8d0j2CRuk1buS2m+hcNpNCkdkuPmg2abqGgb9t\/jg0nyljWcmqHmWza+pNX1tK1h9PRVOswFr4upmi+vu0p1nfqtN4JaB0i9o3FR4bHY8HfAdiD4q93kEiXihVZRfuTgEnVuacSmrf+sU1FoS7\/M8O2rObixx9vHiXt3ZrsHX7vGuthdL1NbuIdls4Y8oPrwHsjfhejNm+YpMYJYPtkVm8JD7k2LIZN4SckdMWzqLd8gIUf9wGtY5jxb\/9JSb+U4uILW9JGycTFjgZ5tISVw\/mbikmN7xSuLsFmdiwGaSc3we5bJFlp5i8eu47BTKm11mzN7TuuwUgXoFl6nD411WeMo2JR45VAJ3p39dQf7as5Rd\/wdQSwcIIVqihCwGAADbHQAAUEsDBBQACAgIAMVQQVEAAAAAAAAAAAAAAAATAAAAW0NvbnRlbnRfVHlwZXNdLnhtbLWTTW7CMBCFT9A7RN5WxNBFVVUEFv1Ztl3QAwzOBKz6T56Bwu07CZAFAqmVmo1l+82893kkT+c774otZrIxVGpSjlWBwcTahlWlPhevowdVEEOowcWAldojqfnsZrrYJ6RCmgNVas2cHrUms0YPVMaEQZQmZg8sx7zSCcwXrFDfjcf32sTAGHjErYeaTZ+xgY3j4ulw31pXClJy1gALlxYzVbzsRDxgtmf9i75tqM9gRkeQMqPramhtE92eB4hKbcK7TCbbGv8UEZvGGqyj2XhpKb9jrlOOBolkqN6VhMyyO6Z+QOY38GKr20p9UsvjI4dB4L3DawCdNmh8I14LWDq8TNDLg0KEjV9ilv1liF4eFKJXPNhwGaQv+UcOlo96ZfiddFgnp0jd\/fbZD1BLBwgzrw+3LAEAAC0EAABQSwECFAAUAAgICADFUEFRSRNDf2gBAAA9BQAAEgAAAAAAAAAAAAAAAAAAAAAAd29yZC9udW1iZXJpbmcueG1sUEsBAhQAFAAICAgAxVBBUY6zw6QFAgAA6gYAABEAAAAAAAAAAAAAAAAAqAEAAHdvcmQvc2V0dGluZ3MueG1sUEsBAhQAFAAICAgAxVBBUa2HbQB5AQAAWgUAABIAAAAAAAAAAAAAAAAA7AMAAHdvcmQvZm9udFRhYmxlLnhtbFBLAQIUABQACAgIAMVQQVEXna4LHQMAAN8RAAAPAAAAAAAAAAAAAAAAAKUFAAB3b3JkL3N0eWxlcy54bWxQSwECFAAUAAgICADFUEFRAHgaz1wCAABXBwAAEQAAAAAAAAAAAAAAAAD\/CAAAd29yZC9kb2N1bWVudC54bWxQSwECFAAUAAgICADFUEFRkACr6\/EAAAAsAwAAHAAAAAAAAAAAAAAAAACaCwAAd29yZC9fcmVscy9kb2N1bWVudC54bWwucmVsc1BLAQIUABQACAgIAMVQQVEtaM8isQAAACoBAAALAAAAAAAAAAAAAAAAANUMAABfcmVscy8ucmVsc1BLAQIUABQACAgIAMVQQVEhWqKELAYAANsdAAAVAAAAAAAAAAAAAAAAAL8NAAB3b3JkL3RoZW1lL3RoZW1lMS54bWxQSwECFAAUAAgICADFUEFRM68PtywBAAAtBAAAEwAAAAAAAAAAAAAAAAAuFAAAW0NvbnRlbnRfVHlwZXNdLnhtbFBLBQYAAAAACQAJAEICAACbFQAAAAA=","fileName":"dfsfsdf.docx","mimeType":"vnd.openxmlformats-officedocument.wordprocessingml.document","hasError":false}}'
        //that.downloadFile(JSON.parse(res));
        
        //prod
        that.downloadFile(JSON.parse(xhr.responseText));
      }
    };
  }

  clearData(str) {
    return str.replace(/\\/, "");
  }

  downloadFile(data) {

    var sampleArr = this.base64ToArrayBuffer(this.clearData(data.response.content));

    var blob = new Blob([sampleArr], {type: data.response.mimeType});
    //var blob = data.content;

    var link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = data.response.fileName;
    link.click();
    window.URL.revokeObjectURL(link.href);
  }

  base64ToArrayBuffer(base64) {
    var binaryString = window.atob(base64);
    var binaryLen = binaryString.length;
    var bytes = new Uint8Array(binaryLen);
    for (var i = 0; i < binaryLen; i++) {
       var ascii = binaryString.charCodeAt(i);
       bytes[i] = ascii;
    }
    return bytes;
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
    const smspEncoded = encodeURI(oData.get("smsp") === 'on' ? 1 : 0 );

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
    oData.append("smspEncoded", smspEncoded);
    
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
