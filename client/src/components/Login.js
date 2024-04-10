import React, { useEffect, useState } from "react";
import Form from "./Form";
import Utility from "../function/utility";
export default function Login({
  handleAuthentication,
  errorMessage,
  changePage,
}) {
  const [errorMessages, setErrorMessages] = useState([]);
  const inputField = [{ name: "name" }, { name: "password" }];
  useEffect(() => {
    if (errorMessage?.length > 0) {
      setErrorMessages([{ general: errorMessage }]);
    }
  }, [errorMessage]);

  function handleLogin(inputValue) {
    setErrorMessages([]);
    Utility.validInput(inputValue)
      .then(() => {
        handleAuthentication({ inputValue, action: "login" });
      })
      .catch((errors) => {
        setErrorMessages(errors);
      });
  }

  function handlePageChange() {
    setErrorMessages([]);
    changePage();
  }

  return (
    <div>
      <Form
        inputField={inputField}
        submit={handleLogin}
        buttonText={"Login"}
        errorMessages={errorMessages}
        errMessage={errorMessage}
        toggleText={"Sign Up"}
        toggleTextFunction={handlePageChange}
      />
    </div>
  );
}
