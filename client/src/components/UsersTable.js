import React, { useEffect, useState } from "react";

import Utility from "../function/utility";
import NewTable from "./Tables";
import PopUpEdit from "../pages/PopUpEdit";

export default function UserTable({ getUsers, users, user }) {
  const [selectedUser, setSelectedUser] = useState({});
  const [ispopUpOpen, setIspopUpOpen] = useState(false);
  const [tableColumn, setTableColumn] = useState([]);
  useEffect(() => {
    if (users.length > 0) {
      const filteredKeys = Object.keys(users[0]).filter((key) => {
        const value = users[key];
        return typeof value !== "object" || Array.isArray(value);
      });
      setTableColumn([...filteredKeys, "edit", "delete", "export"]);
    }
  }, [users]);

  function changePopUpValue(event, user) {
    setSelectedUser(user);
    setIspopUpOpen((prev) => !prev);
  }

  async function deleteUser(user) {
    let request = {
      method: "DELETE",
      url: `api/users/deleteUser/${user.id}`,
      Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
    };

    try {
      const tokenIsExpires = await Utility.CheckAccessTokenExpiresIn();
      if (tokenIsExpires === "Access token has expired") {
        await Utility.getNewAccessToken();
        request.Authorization = `Bearer ${sessionStorage.getItem("accessToken")}`;
      }
      await Utility.FetchRequest(request);
      getUsers();
      setIspopUpOpen(false);
    } catch (err) {
      Utility.UserUnauthorized();
    }
  }

  return (
    <div>
      <NewTable
        rows={users}
        column={tableColumn}
        permissions={user.permissions}
        deleteFunction={deleteUser}
        editFunction={changePopUpValue}
        user={user}
      />
      <PopUpEdit
        ispopUpOpen={ispopUpOpen}
        changePopUpValue={changePopUpValue}
        selectedUser={selectedUser}
        getUsers={getUsers}
      />
    </div>
  );
}
