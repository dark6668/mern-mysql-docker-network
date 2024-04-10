import React, { useEffect, useState } from "react";
import Utility from "../function/utility";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
export default function LoginPage(props) {
  useEffect(() => {
    checkToken();
  },);

  const [errorMessage, setErrorMessage] = useState("");
  const [inLoginPage, setInLoginPage] = useState(true);
  const checkToken = async () => {
    try {
      if (sessionStorage.getItem("accessToken")) {
        let request = {
          method: "POST",
          url: "api/auth/validate-token",
          ContentType: "application/json; charset=UTF-8",
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        };
        const tokenIsExpires = await Utility.CheckAccessTokenExpiresIn();
        if (tokenIsExpires === "Access token has expired") {
            await Utility.getNewAccessToken();
            request.Authorization = `Bearer ${sessionStorage.getItem("accessToken")}`;
        }
        Utility.FetchRequest(request)
          .then((data) => {
            props.getUserInfo(data.user[0]);
          })
          .catch(() => {
           Utility.UserUnauthorized()
            return
          });
      }
    } catch (error) {
      if (error !=="Failed to decode access token") {        
        setErrorMessage(error.message);
      }
    }
  };

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
      .catch((error) => {
        setErrorMessage(error);
      });
  }

  function changePage() {
    setErrorMessage("");
    setInLoginPage((prev) => !prev);
  }

  return (
    <div>
      {inLoginPage ? (
        <Login
          handleAuthentication={handleAuthentication}
          errorMessage={errorMessage}
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
