import React, { useState } from "react";
import Form from "./Form";
import ValidLogin from "./ValidLogin";
export default function SignUp(props) {
  const [errorMessages, setErrorMessages] = useState([]);

  const inputField = [
    {
      name: "name",
      label: "name",
      placeholder: "name",
      type: "name",
    },
    {
      name: "password",
      label: "Password",
      placeholder: "••••••••",
      type: "password",
    },
  ];

  function handleLogin(inputValue) {
    setErrorMessages([]);
    ValidLogin(inputValue)
      .then(() => {
        props.handleAuthentication({ inputValue, action: "signup" });
      })
      .catch((error) => {
        setErrorMessages(error);
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
        toggleTextFunction={props.changePage}
      />
    </div>
  );
}
