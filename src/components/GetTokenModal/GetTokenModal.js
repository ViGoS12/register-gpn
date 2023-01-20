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
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import Response from "./Response";
import Backend from "./Backend";

const inputType = {
  NONRESIDENT: "non-resident",
  INDIVIDUAL: "individual",
  COMPANY: "company",
};

function GetTokenModal({ visible, setVisible }) {
  const { t } = useTranslation();

  const [tokenFor, setTokenFor] = useState(inputType.COMPANY);

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

          if (inn.length !== length){
            error.message = `ИНН может состоять только из ${length} цифр`;
            return;
          }
          var n10 = checkDigit(inn, [2, 4, 10, 3, 5, 9, 4, 6, 8]);
          if (n10 === parseInt(inn[9])) {
            result = true;
          }
          break;
        case 12:

        if (inn.length !== length){
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
      const encodeValue = (name) => {
        const value = encodeURI(oData.get(name));
        oData.delete(name);
        oData.append(name + "Encoded", value);
      };

      encodeValue("email");
      encodeValue("inn");
      encodeValue("kpp");
      encodeValue("regNum");
      encodeValue("shortName");

      const tokenResp = await new Backend().TokenRequest(oData);

      tokenResp.json().then((req) => {
        console.log("JSON RESPONSE:", req);
      });

      // console.log(tokenResponse);

      if (!tokenResp.ok) {
        setTokenResponse({
          showResponse: true,
          error: !tokenResp.ok,
          responseText: tokenResp.statusText,
        });
      } else {
        tokenResp.json().then((jsonResponse) => {
          if (jsonResponse.response.exceptionMessage) {
            setTokenResponse({
              showResponse: true,
              error: true,
              responseText: jsonResponse.response.exceptionMessage,
            });
          } else {
            console.log(
              "Ответ сервреа получен ",
              jsonResponse.response.requestCategory
            );
            if (jsonResponse.response.hasError) {
              console.log(
                "Получено сообщение об ошибке с сервера ",
                jsonResponse.response.hasError
              );
              setTokenResponse({
                showResponse: true,
                error: true,
                responseText: jsonResponse.response.requestCategory,
              });
            } else {
              console.log(
                "Получено сообщение об успешной регистрации сервера ",
                jsonResponse.response.requestCategory
              );
              setTokenResponse({
                showResponse: true,
                error: false,
                responseText: jsonResponse.response.requestCategory,
              });
            }
          }
        });
      }
    }
  };

  return (
    <CModal
      visible={visible}
      onClose={() => {
        setVisible(false);
      }}
    >
      <CModalHeader>
        <CModalTitle>{t("title")}</CModalTitle>
      </CModalHeader>

      <CModalBody>
        <>
          {tokenResponse.showResponse ? (
            <Response setResponse={setTokenResponse} response={tokenResponse} />
          ) : (
            <CForm onSubmit={handleSubmit} on>
              <CFormCheck
                id="company"
                type="radio"
                name="inputType"
                label={t("company")}
                defaultChecked
                onChange={() => {
                  setTokenFor(inputType.COMPANY);
                }}
              />

              <CFormCheck
                id="nonresident"
                type="radio"
                name="inputType"
                label={t("nonResident")}
                onChange={() => {
                  setTokenFor(inputType.NONRESIDENT);
                }}
              />

              <CFormCheck
                id="individual"
                type="radio"
                name="inputType"
                label={t("individual")}
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

                      if (!validateInn(e.target.value, innState, tokenFor === inputType.COMPANY ? 10 : 12)) {
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
