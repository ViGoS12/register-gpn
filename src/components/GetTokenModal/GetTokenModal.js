import {
  CButton,
  CForm,
  CFormCheck,
  CFormInput,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import Response from "./Response";
import Backend from "./Backend";

const inputType = {
  NONRESIDENT: 2,
  INDIVIDUAL: 3,
  COMPANY: 1,
};

function GetTokenModal({ visible, setVisible }) {
  const { t } = useTranslation();

  const [tokenFor, setTokenFor] = useState(inputType.COMPANY);

  const form = useRef(null);

  const [tokenResponse, setTokenResponse] = useState({
    showResponse: false,
    error: false,
    responseText: "",
  });

  const [fieldsInvalid, setFieldsInvalid] = useState({
    inn: {
      state: false,
      message: "",
    },
    kpp: {
      state: false,
      message: "",
    },
  });

  useEffect(() => {
    setFieldsInvalid({
      inn: {
        state: false,
        message: "",
      },
      kpp: {
        state: false,
        message: "",
      },
    });
  }, [visible, tokenFor]);

  useEffect(() => {
    if (form.current) {
      form.current.reset();
    }
  }, [tokenFor]);

  useEffect(() => {
    setTokenFor(inputType.COMPANY);
  }, [visible]);

  const checkValidFields = () => {
    // const fieldInvalid = {
    //   inn: {
    //     state: false,
    //     message: "",
    //   },
    //   kpp: {
    //     state: false,
    //     message: "",
    //   },
    // };

    // const inn = oData.get("inn");

    // if (inn) {
    //   if (!validateInn(inn, fieldInvalid.inn)) {
    //     fieldInvalid.inn.state = true;
    //   }
    // }

    // const kpp = oData.get("kpp");

    // if (kpp) {
    //   if (!validateKPP(kpp, fieldInvalid.kpp)) {
    //     fieldInvalid.kpp.state = true;
    //   }
    // }

    if (fieldsInvalid.inn.state || fieldsInvalid.kpp.state) {
      // setFieldsInvalid(fieldInvalid);
      return false;
    } else {
      return true;
    }
  };

  const validateKPP = (val, error) => {
    var result = false;
    if (typeof val === "number") {
      val = val.toString();
    } else if (typeof val !== "string") {
      val = "";
    }
    if (!val.length) {
      error.message = "КПП пуст";
    } else if (/[^0-9]/.test(val)) {
      error.message = "КПП может состоять только из цифр";
    } else if ([9].indexOf(val.length) === -1) {
      error.message = "КПП может состоять только из 9 цифр";
    } else {
      result = true;
    }
    return result;
  };

  const validateInn = (inn, error, length) => {
    var result = false;
    if (typeof inn === "number") {
      inn = inn.toString();
    } else if (typeof inn !== "string") {
      inn = "";
    }
    if (!inn.length) {
      error.message = "ИНН пуст";
    } else if (/[^0-9]/.test(inn)) {
      error.message = "ИНН может состоять только из цифр";
    } else if ([10, 12].indexOf(inn.length) === -1) {
      error.message = "ИНН может состоять только из 10 или 12 цифр";
    } else {
      var checkDigit = function (inn, coefficients) {
        var n = 0;
        for (var i in coefficients) {
          n += coefficients[i] * inn[i];
        }
        return parseInt((n % 11) % 10);
      };
      switch (inn.length) {
        case 10:
          if (inn.length !== length) {
            error.message = `ИНН может состоять только из ${length} цифр`;
            return;
          }
          var n10 = checkDigit(inn, [2, 4, 10, 3, 5, 9, 4, 6, 8]);
          if (n10 === parseInt(inn[9])) {
            result = true;
          }
          break;
        case 12:
          if (inn.length !== length) {
            error.message = `ИНН может состоять только из ${length} цифр`;
            return;
          }

          var n11 = checkDigit(inn, [7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
          var n12 = checkDigit(inn, [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
          if (n11 === parseInt(inn[10]) && n12 === parseInt(inn[11])) {
            result = true;
          }
          break;
        default:
          break;
      }
      if (!result) {
        error.message = "Неверный ИНН";
      }
    }
    return result;
  };

  const handleSubmit = async (form) => {
    form.preventDefault();

    const oData = new FormData(form.target);

    if (checkValidFields() === true) {
      // const code = oData.get("inputType");
      oData.delete("inputType");
      oData.append("code", tokenFor);

      const encodeValue = (name) => {
        const value = encodeURI(oData.get(name));
        oData.delete(name);
        oData.append(name, value === "null" ? "" : value);
      };

      encodeValue("code");
      encodeValue("email");
      encodeValue("inn");
      encodeValue("kpp");
      encodeValue("regNum");
      encodeValue("shortName");

      var formDataJSON = {};

      oData.forEach((value, key) => (formDataJSON[key] = value));

      const response = await new Backend().TokenRequest(
        JSON.stringify(formDataJSON)
      );

      console.log('GET RESPONSE:', response);

      if (!response.ok) {
        setTokenResponse({
          showResponse: true,
          error: !response.ok,
          responseText: response.statusText,
        });
      } else {
        const responseJSON = await response.json();

        console.log('RESPONSE DATA:', responseJSON);

        if (responseJSON.response.exceptionMessage) {
          setTokenResponse({
            showResponse: true,
            error: true,
            responseText: responseJSON.response.exceptionMessage,
          });
        } else {
          console.log(
            "Ответ сервреа получен ",
            responseJSON.response.requestCategory
          );
          if (responseJSON.response.hasError) {
            console.log(
              "Получено сообщение об ошибке с сервера ",
              responseJSON.response.hasError
            );
            setTokenResponse({
              showResponse: true,
              error: true,
              responseText: responseJSON.response.requestCategory,
            });
          } else {
            console.log(
              "Получено сообщение об успешной регистрации сервера ",
              responseJSON.response.requestCategory
            );
            setTokenResponse({
              showResponse: true,
              error: false,
              responseText: responseJSON.response.requestCategory,
            });
          }
        }

      }
    }
  };

  return (
    <CModal
      visible={visible}
      onClose={() => {
        setVisible(false);
      }}
      backdrop={"static"}
    >
      <CModalHeader>
        <CModalTitle>{t("title")}</CModalTitle>
      </CModalHeader>

      <CModalBody>
        <>
          {tokenResponse.showResponse ? (
            <Response setResponse={setTokenResponse} response={tokenResponse} />
          ) : (
            <CForm onSubmit={handleSubmit} on ref={form}>
              <CFormCheck
                id="company"
                type="radio"
                name="inputType"
                label={t("company")}
                defaultChecked={tokenFor === inputType.COMPANY ? true : false}
                onChange={() => {
                  setTokenFor(inputType.COMPANY);
                }}
              />

              <CFormCheck
                id="nonresident"
                type="radio"
                name="inputType"
                label={t("nonResident")}
                defaultChecked={
                  tokenFor === inputType.NONRESIDENT ? true : false
                }
                onChange={() => {
                  setTokenFor(inputType.NONRESIDENT);
                }}
              />

              <CFormCheck
                id="individual"
                type="radio"
                name="inputType"
                label={t("individual")}
                defaultChecked={
                  tokenFor === inputType.INDIVIDUAL ? true : false
                }
                onChange={() => {
                  setTokenFor(inputType.INDIVIDUAL);
                }}
              />

              {/* {tokenFor !== inputType.COMPANY && ( */}
              <>
                <CFormInput
                  id="email"
                  type="email"
                  name="email"
                  label={t("email")}
                  required
                />
              </>
              {/* // )} */}

              {(tokenFor === inputType.INDIVIDUAL ||
                tokenFor === inputType.COMPANY) && (
                  <>
                    <CFormInput
                      id="inn"
                      name="inn"
                      invalid={fieldsInvalid.inn.state}
                      feedbackInvalid={<div>{fieldsInvalid.inn.message}</div>}
                      type="text"
                      label={t("inn")}
                      onChange={(e) => {
                        const innState = {
                          state: false,
                          message: "",
                        };

                        if (
                          !validateInn(
                            e.target.value,
                            innState,
                            tokenFor === inputType.COMPANY ? 10 : 12
                          )
                        ) {
                          innState.state = true;
                        }

                        setFieldsInvalid((prev) => {
                          return {
                            ...prev,
                            inn: innState,
                          };
                        });
                      }}
                      required
                    />

                    {tokenFor === inputType.COMPANY && (
                      <CFormInput
                        id="kpp"
                        type="text"
                        name="kpp"
                        invalid={fieldsInvalid.kpp.state}
                        feedbackInvalid={<div>{fieldsInvalid.kpp.message}</div>}
                        label={t("kpp")}
                        onChange={(e) => {
                          const kppState = {
                            state: false,
                            message: "",
                          };

                          if (!validateKPP(e.target.value, kppState)) {
                            kppState.state = true;
                          }

                          setFieldsInvalid((prev) => {
                            return {
                              ...prev,
                              kpp: kppState,
                            };
                          });
                        }}
                        required
                      />
                    )}
                  </>
                )}

              {tokenFor === inputType.NONRESIDENT && (
                <>
                  <CFormInput
                    id="regNum"
                    name="regNum"
                    type="text"
                    label={t("regNumber")}
                    required
                  />
                </>
              )}

              {(tokenFor === inputType.NONRESIDENT ||
                tokenFor === inputType.COMPANY) && (
                  <>
                    <CFormInput
                      id="companyName"
                      name="shortName" //?
                      type="text"
                      label={t("companyName")}
                      required
                    />
                  </>
                )}

              <div className="d-flex justify-content-end m-2">
                <CButton color="primary" type="submit">
                  {t("send")}
                </CButton>
              </div>
            </CForm>
          )}
        </>
      </CModalBody>
    </CModal>
  );
}

export default GetTokenModal;
