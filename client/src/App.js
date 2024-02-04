import React, { useState, useEffect } from "react";
import "./App.css";
import Utility from "./function/utility";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
export default function App() {
  const [user, setUser] = useState([]);

  const getUserInfo = (userdata) => {
    setUser(userdata);
  };
  const testFetch = async () => {
    const request = {
      method: "POST",
      url: "test",
      body: JSON.stringify({ test: "tere" }),
      ContentType: "application/json; charset=UTF-8",
      Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
    };
    try {
      const tokenIsExpires = await Utility.CheckAccessTokenExpiresIn();
      if (tokenIsExpires === "Access token has expired") {
        await Utility.getNewAccessToken();
        request.Authorization = `Bearer ${sessionStorage.getItem("accessToken")}`;
      }
      const result = await Utility.FetchRequest(request);
      console.log(result);
    } catch (err) {
      Utility.UserUnauthorized();
    }
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
