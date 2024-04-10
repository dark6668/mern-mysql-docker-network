import React, { useEffect, useState } from "react";
import Utility from "../function/utility";
import Header from "../components/Header";
import UserTable from "../components/UsersTable"
import PopUpAdd from "./PopUpAdd"
import { useNavigate } from "react-router-dom";

export default function MyUsers() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  useEffect(() => {
    authorization();
  },[]);
  useEffect(() => {
    if (Object.keys(user).length > 0) {
      getUsers();
    }
  }, [user]);
  async function authorization() {
    if (!sessionStorage.getItem("accessToken")) {
      navigate("/");
      return;
    }
    try {
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
          setUser(data.user[0]);
        })
        .catch(() => {
          navigate("/");
        });
    } catch (error) {
      navigate("/");
    }
  }

  async function getUsers() {
    const request = {
      method: "GET",
      url: "api/users/getUsers",
      ContentType: "application/json; charset=UTF-8",
      Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
    };
    try {
      const tokenIsExpires = await Utility.CheckAccessTokenExpiresIn();
      if (tokenIsExpires === "Access token has expired") {
        await Utility.getNewAccessToken();
        request.Authorization = `Bearer ${sessionStorage.getItem("accessToken")}`;
      }
      Utility.FetchRequest(request)
        .then((usersData) => {
          setUsers(usersData);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
      Utility.UserUnauthorized();
    }
  }

  return (
    <div>
           {Object.keys(user).length > 0 && (
        <div>
 <Header user={user} /> 
      <UserTable user={user} getUsers={getUsers} users={users} />
      <PopUpAdd user={user} getUsers={getUsers} /> 
        </div>
      )}
    
    </div>
  );
}
