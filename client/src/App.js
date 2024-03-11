import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import Utility from "./function/utility";

export default function App() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    checkToken();
  }, []);
  const checkToken = async () => {
    try {
      if (sessionStorage.getItem("accessToken")) {
        const tokenIsExpires = await Utility.CheckAccessTokenExpiresIn();
        if (tokenIsExpires === "Access token has expired") {
          console.log("Access token has expired");
          return;
        }
        const request = {
          method: "POST",
          url: "api/auth/validate-token-before-login",
          ContentType: "application/json; charset=UTF-8",
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        };

        Utility.FetchRequest(request)
          .then((data) => {
            setUser(data.user[0]);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getUserInfo = (userdata) => {
    setUser(userdata);
  };

  return (
    <div>
      {user.length === 0 ? (
        <div>
          <LoginPage getUserInfo={getUserInfo} />
        </div>
      ) : (
        <div>
          <HomePage user={user} />
        </div>
      )}
    </div>
  );
}
