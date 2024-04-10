import React, { useState } from "react";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";

export default function App() {
  const [user, setUser] = useState([]);
  useState("");
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
