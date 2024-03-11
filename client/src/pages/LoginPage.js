import React, { useEffect, useState } from "react";
import Form from "../components/Form";
import ValidLogin from "../components/ValidLogin";
import Utility from "../function/utility";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
export default function LoginPage(props) {
  const [notFoundPermissionsMessage, setNotFoundPermissionsMessage] =
    useState("");
  const [inLoginPage, setInLoginPage] = useState(true);

  async function handleAuthentication(UserData) {
    const request = {
      method: "POST",
      url: `api/auth/${UserData.action}`,
      body: JSON.stringify({ UserData: UserData.inputValue }),
      ContentType: "application/json; charset=UTF-8",
    };

    Utility.FetchRequest(request)
      .then((userInfo) => {
        if (UserData.action === "login") {
          sessionStorage.setItem("accessToken", userInfo[0].accessToken);
          sessionStorage.setItem("refreshToken", userInfo[0].refreshToken);
          props.getUserInfo(userInfo[0]);
          return;
        }
        setInLoginPage((prev) => !prev);
      })
      .catch((errorData) => {
        setNotFoundPermissionsMessage(errorData.err);
      });
  }

  function changePage() {
    setNotFoundPermissionsMessage("");
    setInLoginPage((prev) => !prev);
  }

  return (
    <div>
      {inLoginPage ? (
        <Login
          handleAuthentication={handleAuthentication}
          notFoundPermissionsMessage={notFoundPermissionsMessage}
          changePage={changePage}
        />
      ) : (
        <SignUp
          handleAuthentication={handleAuthentication}
          changePage={changePage}
        />
      )}
    </div>
  );
}
