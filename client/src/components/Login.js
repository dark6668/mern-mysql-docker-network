import React, { useState, useEffect } from "react";
import Form from "./Form";
import ValidLogin from "./ValidLogin";
export default function Login(props) {
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
        props.handleAuthentication({ inputValue, action: "login" });
      })
      .catch((error) => {
        setErrorMessages(error);
      });
  }
  function handlePageChange(params) {
    setErrorMessages([]);
    props.changePage();
  }
  return (
    <div>
      <Form
        inputField={inputField}
        submit={handleLogin}
        buttonText={"Login"}
        errorMessages={errorMessages}
        notFoundPermissionsMessage={props.notFoundPermissionsMessage}
        toggleText={"Sign Up"}
        toggleTextFunction={handlePageChange}
      />
    </div>
  );
}
