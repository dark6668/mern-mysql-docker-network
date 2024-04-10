import React, { useState } from "react";
import Form from "./Form";
import Utility from "../function/utility";
export default function SignUp({ handleAuthentication, changePage }) {
  const [errorMessages, setErrorMessages] = useState([]);
  const inputField = [{ name: "name" }, { name: "password" }];
  function handleLogin(inputValue) {
    setErrorMessages([]);
    Utility.validInput(inputValue)
      .then(() => {
        handleAuthentication({ inputValue, action: "signup" });
      })
      .catch((errors) => {
        setErrorMessages(errors);
      });
  }

  return (
    <div>
      <Form
        inputField={inputField}
        submit={handleLogin}
        buttonText={"Sign Up"}
        errorMessages={errorMessages}
        toggleText={"Login"}
        toggleTextFunction={changePage}
      />
    </div>
  );
}
