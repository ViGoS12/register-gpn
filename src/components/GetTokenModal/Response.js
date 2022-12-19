import { CAlert, CButton } from "@coreui/react";
import React from "react";
import { useTranslation } from "react-i18next";

function Response({ response, setResponse }) {
  const { t } = useTranslation();

  return (
    <>
      <div>
        <CAlert color={response.error ? "danger" : "success"}>
          {response.error ? t("errorResponseText") : t("successResponseText")}
        </CAlert>

        {response.responseText && response.responseText}

        <div className="d-flex m-2 ">
          <CButton
            className="w-100"
            onClick={() => {
              setResponse({
                setResponse : false,
                error: false,
                responseText: "",
              });
            }}
          >
            {t("goBackText")}
          </CButton>
        </div>
      </div>
    </>
  );
}

export default Response;
