import React, { useEffect, useState, useRef } from "react";
import NewTable from "../../components/Tables";
import Utility from "../../function/utility";
import Header from "../../components/Header";
import { Button } from "@mui/material";
import PopUpAddUser from "../PopUpAdd";
import UserTable from "../../components/UsersTable";
import PopUpEdit from "../PopUpEdit";
import PopUpAdd from "../PopUpAdd";

export default function AdminPage({ user }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

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

  async function modifyUserData(user, action) {
    let request = {
      method: "PUT",
      url: `api/users/${action}User`,
      body: JSON.stringify({ user }),
      ContentType: "application/json; charset=UTF-8",
      Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
    };
    if (action === "delete") {
      request.url = `api/users/${action}User/${user.id}`;
      request.method = "DELETE";
      request.body = null;
    }
    try {
      const tokenIsExpires = await Utility.CheckAccessTokenExpiresIn();
      if (tokenIsExpires === "Access token has expired") {
        await Utility.getNewAccessToken();
        request.Authorization = `Bearer ${sessionStorage.getItem("accessToken")}`;
      }
      await Utility.FetchRequest(request);
      getUsers();
    } catch (err) {
      Utility.UserUnauthorized();
    }
  }

  return (
    <div>
      <Header user={user} />
      <UserTable user={user} getUsers={getUsers} users={users} />
      <PopUpAdd user={user} getUsers={getUsers} />
    </div>
  );
}
